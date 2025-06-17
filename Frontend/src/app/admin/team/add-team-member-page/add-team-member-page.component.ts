import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FeedbackPopupComponent } from '../../../shared/components/feedback-popup/feedback-popup.component';
import { ITeam } from '../../../shared/interfaces/team.interface';
import { AdmPageComponent } from '../../../shared/layout/admin-page/adm-page.component';

@Component({
  selector: 'add-team-member-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    AdmPageComponent,
    FeedbackPopupComponent,
    MatIconModule,
  ],
  templateUrl: './add-team-member-page.component.html',
  styleUrls: ['./add-team-member-page.component.css'],
})
export class AddTeamMemberPageComponent {
  memberForm: FormGroup;
  private apiUrl = environment.apiUrl;
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      ra: ['', Validators.required],
      image: [null],
      linkedin_url: ['', [Validators.required]],
      role_name: ['', Validators.required],
    });
  }

  private mostrarFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }

  private clearFeedback(): void {
    this.feedbackMessage = '';
    this.feedbackType = '';
  }

  onFileSelected(event: Event | DragEvent): void {
    this.clearFeedback();
    let file: File | null = null;

    if (event instanceof DragEvent && event.dataTransfer?.files?.length) {
      file = event.dataTransfer.files[0];
      event.preventDefault();
      event.stopPropagation();
    } else if (
      event.target instanceof HTMLInputElement &&
      event.target.files?.length
    ) {
      file = event.target.files[0];
    }

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.mostrarFeedback(
          'Formato de arquivo inválido. Por favor, use .jpg, .jpeg ou .png.',
          'error'
        );
        this.resetImage();
        return;
      }

      this.selectedFile = file;
      this.memberForm.patchValue({ image: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  resetImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.memberForm.patchValue({ image: null });
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onSubmit(): void {
    this.clearFeedback();

    if (this.memberForm.valid) {
      const formData = new FormData();
      Object.keys(this.memberForm.value).forEach((key) => {
        formData.append(key, this.memberForm.value[key]);
      });

      this.http
        .post<ITeam>(`${this.apiUrl}/teammember`, formData, {
          withCredentials: true,
        })
        .subscribe({
          next: (response) => {
            console.log('Novo membro adicionado:', response);
            this.router.navigate(['/adm-team'], {
              queryParams: { newMemberName: response.name, status: 'success' },
            });
          },
          error: (err) => {
            console.error('Erro ao adicionar membro:', err);
            let errorMessage = 'Erro ao adicionar membro. Tente novamente.';
            if (err.status === 0) {
              errorMessage =
                'Erro de rede ou API indisponível. Verifique sua conexão e a URL da API.';
            } else if (err.error && err.error.message) {
              errorMessage = `Erro do servidor: ${err.error.message}`;
            } else if (err.status === 400) {
              errorMessage =
                'Dados inválidos. Por favor, verifique os campos preenchidos.';
            }
            this.mostrarFeedback(errorMessage, 'error');
          },
        });
    } else {
      this.memberForm.markAllAsTouched();
      this.mostrarFeedback(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        'error'
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/adm-team']);
  }
}
