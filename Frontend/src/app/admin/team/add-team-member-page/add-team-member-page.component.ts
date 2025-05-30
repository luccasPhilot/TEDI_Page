import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ITeam } from '../../../shared/interfaces/team.interface';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AdmPageComponent } from '../../../shared/layout/admin-page/adm-page.component';
import { FeedbackPopupComponent } from '../../../shared/components/feedback-popup/feedback-popup.component';

@Component({
  selector: 'app-add-team-member-page',
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
  ],
  templateUrl: './add-team-member-page.component.html',
  styleUrls: ['./add-team-member-page.component.css'],
})
export class AddTeamMemberPageComponent implements OnInit {
  memberForm: FormGroup;
  private apiUrl = environment.apiUrl;
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      ra: ['', Validators.required],
      image_url: ['', [Validators.required]],
      linkedin_url: ['', [Validators.required]],
      role_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  private mostrarFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }

  private clearFeedback(): void {
    this.feedbackMessage = '';
    this.feedbackType = '';
  }

  onSubmit(): void {
    this.clearFeedback();
    if (this.memberForm.valid) {
      const newMemberData = this.memberForm.value;
      this.http
        .post<ITeam>(`${this.apiUrl}/teammember`, newMemberData, {
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
