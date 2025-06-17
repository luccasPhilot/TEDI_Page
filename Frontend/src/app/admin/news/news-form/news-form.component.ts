import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FeedbackPopupComponent } from '../../../shared/components/feedback-popup/feedback-popup.component';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { INews } from '../../../shared/interfaces/news.interface';
import { AdmPageComponent } from '../../../shared/layout/admin-page/adm-page.component';

@Component({
  selector: 'news-form',
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
    MatSelectModule,
    TextFieldModule,
  ],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.css',
})
export class NewsFormComponent implements OnInit {
  form: FormGroup;
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  id: string | null = null;
  isNew: boolean = false;

  categories: ICategory[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      content: ['', Validators.required],
      category_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isNew = !this.id;

    this.getCategories();

    if (!this.isNew) {
      this.getNews();
    }
  }

  getNews(): void {
    if (this.id) {
      this.http.get<INews>(`${environment.apiUrl}/news/${this.id}`).subscribe({
        next: (result) => {
          this.form.patchValue({
            title: result.title,
            subtitle: result.subtitle,
            content: result.content,
            category_id: result.category_id,
          });
          this.imagePreview = result.image
            ? `${environment.apiUrl}/news/${this.id}/image`
            : null;
          this.selectedFile = null;
        },
        error: (error) => {
          console.error('Erro ao buscar notícia:', error);
          this.mostrarFeedback(
            'Erro ao carregar notícia. Tente novamente.',
            'error'
          );
        },
      });
    } else {
      this.form.reset();
      this.imagePreview = null;
      this.selectedFile = null;
    }
  }

  getCategories(): void {
    this.http
      .get<ICategory[]>(`${environment.apiUrl}/category`, {
        withCredentials: true,
      })
      .subscribe({
        next: (result: any) => {
          this.categories = result;
        },
        error: (error) => {
          console.error('Erro ao buscar categorias:', error);
          this.mostrarFeedback(
            'Erro ao carregar categorias. Tente novamente.',
            'error'
          );
        },
      });
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
    this.form.get('image')?.reset();
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

  onCancel(): void {
    this.router.navigate(['/adm-news']);
  }

  onSubmit(): void {
    this.clearFeedback();

    if (this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('subtitle', this.form.get('subtitle')?.value);
      formData.append('content', this.form.get('content')?.value);
      formData.append('category_id', this.form.get('category_id')?.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      const apiCall = this.isNew
        ? this.http.post<INews>(`${environment.apiUrl}/news`, formData, {
            withCredentials: true,
          })
        : this.http.put<INews>(
            `${environment.apiUrl}/news/${this.id}`,
            formData,
            { withCredentials: true }
          );

      apiCall.subscribe({
        next: (response) => {
          const action = this.isNew ? 'adicionada' : 'atualizada';
          console.log(`Notícia ${action}:`, response);
          const newsId = this.isNew ? response.id : this.id;
          this.router.navigate([`/news-preview/${newsId}`]);
        },
        error: (err) => {
          const action = this.isNew ? 'adicionar' : 'atualizar';
          console.error(`Erro ao ${action} notícia:`, err);
          let errorMessage = `Erro ao ${action} notícia. Tente novamente.`;
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
      this.form.markAllAsTouched();
      this.mostrarFeedback(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        'error'
      );
    }
  }

  private mostrarFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }

  private clearFeedback(): void {
    this.feedbackMessage = '';
    this.feedbackType = '';
  }
}
