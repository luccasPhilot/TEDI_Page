import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FeedbackPopupComponent } from '../../components/feedback-popup/feedback-popup.component';

@Component({
  selector: 'adm-page',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    CommonModule,
    FeedbackPopupComponent,
  ],
  templateUrl: './adm-page.component.html',
  styleUrl: './adm-page.component.css',
})
export class AdmPageComponent {
  @Input() isLoginScreen: boolean = false;

  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';

  constructor(private readonly router: Router, private http: HttpClient) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.http
      .post(`${environment.apiUrl}/auth/logout`, null, {
        withCredentials: true,
      })
      .pipe(
        finalize(() => {
          console.log('Finalizando processo de logout...');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        })
      )
      .subscribe({
        next: () => {
          this.mostrarFeedback('Logout realizado com sucesso!', 'success');
        },
        error: (err) => {
          console.error('Erro na chamada de logout para o servidor:', err);
          this.mostrarFeedback(
            `Não foi possível invalidar a sessão no servidor, mas você foi desconectado localmente.`,
            'error'
          );
        },
      });
  }

  private mostrarFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }
}
