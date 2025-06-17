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
      image: [null],
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
            image: result.image,
            category_id: result.category_id,
          });
          this.imagePreview = result.image
            ? `${environment.apiUrl}/news/${this.id}/image`
            : null;
          this.selectedFile = result.image ? new File([], result.image) : null;
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
      .get<ICategory>(`${environment.apiUrl}/category`, {
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
      this.form.patchValue({ image: file });

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
    this.form.patchValue({ image: null });
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
      Object.keys(this.form.value).forEach((key) => {
        formData.append(key, this.form.value[key]);
      });

      if (this.isNew) {
        this.http
          .post<INews>(`${environment.apiUrl}/news`, formData, {
            withCredentials: true,
          })
          .subscribe({
            next: (response) => {
              console.log('Nova notícia adicionada:', response);
              this.router.navigate(['/adm-news'], {
                queryParams: {
                  newNewsTitle: response.title,
                  status: 'success',
                },
              });
            },
            error: (err) => {
              console.error('Erro ao adicionar notícia:', err);
              let errorMessage = 'Erro ao adicionar notícia. Tente novamente.';
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
        this.http
          .put<INews>(`${environment.apiUrl}/news/${this.id}`, formData, {
            withCredentials: true,
          })
          .subscribe({
            next: (response) => {
              console.log('Notícia atualizada:', response);
              this.router.navigate(['/adm-news'], {
                queryParams: {
                  updatedNewsTitle: response.title,
                  status: 'success',
                },
              });
            },
            error: (err) => {
              console.error('Erro ao atualizar notícia:', err);
              let errorMessage = 'Erro ao atualizar notícia. Tente novamente.';
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
      }
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
