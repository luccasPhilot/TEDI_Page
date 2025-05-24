import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, AdmPageComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;

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
    if (this.loginForm.invalid) return;

    this.http
      .post('http://localhost:3333/auth/login', this.loginForm.value, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert(
            'Erro ao autenticar: ' + (err.error?.message || 'Erro desconhecido')
          );
        },
      });
  }
}
