import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdmPageComponent } from '../../shared/layout/admin-page/adm-page.component';
import { FeedbackPopupComponent } from '../../shared/components/feedback-popup/feedback-popup.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdmPageComponent,
    FeedbackPopupComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.http
      .post('http://localhost:3333/auth/login', this.loginForm.value, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.mostrarFeedback('Login realizado com sucesso!', 'success');
          setTimeout(() => {
            this.router.navigate(['/adm-news']);
          }, 1500);
        },
        error: (err) => {
          const errorMessage =
            err.error?.message ||
            err.message ||
            'Erro desconhecido ao autenticar.';
          this.mostrarFeedback(`Erro ao autenticar: ${errorMessage}`, 'error');
        },
      });
  }

  private mostrarFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }
}
