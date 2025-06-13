import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NewsGridComponent } from '../../shared/components/news-grid/news-grid.component';
import { INews } from '../../shared/interfaces/news.interface';
import { PageComponent } from '../../shared/layout/page/page.component';
import { FeedbackPopupComponent } from '../../shared/components/feedback-popup/feedback-popup.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    PageComponent,
    NewsGridComponent,
    FeedbackPopupComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('contactFormRef') contactForm!: ElementRef;
  @ViewChild('contactForm') contactNgForm!: NgForm;

  newsList: INews[] = [];
  apiUrl = environment.apiUrl;
  isSubmitting = false;
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';

  formData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  constructor(
    private readonly http: HttpClient,
    private readonly location: Location,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    this.getNews();
    const navState = this.location.getState() as { scrollToContact?: boolean };

    if (navState?.scrollToContact) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.scrollToContact();
        });
      }, 200);
    }
  }

  getNews(): void {
    this.http.get<INews[]>(`${this.apiUrl}/news/latest`).subscribe({
      next: (result) => {
        this.newsList = result;
        this.sortNewsByDate();
      },
      error: (error) => {
        alert(error.error.error);
      },
    });
  }

  sortNewsByDate(): void {
    this.newsList.sort(
      (a, b) =>
        new Date(b.creation_date).getTime() -
        new Date(a.creation_date).getTime()
    );
  }

  scrollToContact(): void {
    this.contactForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit(): void {
    if (this.contactNgForm.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.isSubmitting = true;

    const body = {
      name: this.formData.name.trim(),
      email: this.formData.email.trim(),
      phoneNumber: this.formData.phone.trim(),
      message: this.formData.message.trim(),
    };

    this.http
      .post(`${this.apiUrl}/contact`, body)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.mostrarFeedback(
            'Email enviado com sucesso! Entraremos em contato em breve.',
            'success'
          );
          this.contactNgForm.resetForm();
        },
        error: (error) => {
          console.error('Erro ao enviar contato:', error);
          this.mostrarFeedback(
            'Erro ao enviar email. Tente novamente mais tarde.',
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
