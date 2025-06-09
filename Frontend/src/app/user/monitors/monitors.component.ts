import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IMonitor } from '../../shared/interfaces/monitor.interface';
import { environment } from '../../../environments/environment';
import { PageComponent } from '../../shared/layout/page/page.component';

@Component({
  selector: 'monitors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageComponent],
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.css',
})
export class MonitorsComponent {
  monitorForm!: FormGroup;
  private apiUrl = environment.apiUrl;
  formSubmitted = false;
  formError = '';

  periodos: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.monitorForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      ra: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      period: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.formSubmitted = false;
    this.formError = '';

    if (this.monitorForm.invalid) {
      this.monitorForm.markAllAsTouched();
      return;
    }

    const body: IMonitor = this.monitorForm.value;

    this.http.post<IMonitor>(`${this.apiUrl}/monitor`, body, {}).subscribe({
      next: (response) => {
        console.log('Monitor cadastrado com sucesso!', response);
        this.formSubmitted = true;
        this.monitorForm.reset();
      },
      error: (err) => {
        console.error('Erro ao cadastrar monitor:', err);
        this.formError =
          'Não foi possível realizar o cadastro. Tente novamente mais tarde.';
      },
    });
  }

  get f() {
    return this.monitorForm.controls;
  }
}
