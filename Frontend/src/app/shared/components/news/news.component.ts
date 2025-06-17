import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { INews } from '../../../shared/interfaces/news.interface';
import { NewsGridComponent } from '../news-grid/news-grid.component';

@Component({
  selector: 'news',
  imports: [CommonModule, NewsGridComponent, MatCardModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  id!: string;
  news!: INews;
  newsList!: INews[];
  apiUrl = environment.apiUrl;
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getNew();
      if (!this.isAdmin) {
        this.getNews();
      }
    });
  }

  getNew(): void {
    this.http.get<INews>(`${this.apiUrl}/news/${this.id}`).subscribe({
      next: (result) => {
        this.news = result;
      },
      error: (error) => {
        alert(error.error.error);
      },
    });
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

  onCancel(): void {
    this.router.navigate([`/adm-news/${this.id}`]);
  }

  onSubmit(): void {
    this.clearFeedback();

    this.news.draft = false;

    this.http.patch<INews>(`${environment.apiUrl}/news/${this.id}/toggle-draft`,
      null,
      { withCredentials: true }
    ).subscribe({
      next: (response) => {
        console.log(`Notícia publicada:`, response);
        this.router.navigate([`/adm-news`]);
      },
      error: (err) => {
        console.error(`Erro ao publicar notícia:`, err);
        let errorMessage = `Erro ao publicar notícia. Tente novamente.`;
        if (err.status === 0) {
          errorMessage = 'Erro de rede ou API indisponível. Verifique sua conexão e a URL da API.';
        } else if (err.error && err.error.message) {
          errorMessage = `Erro do servidor: ${err.error.message}`;
        } else if (err.status === 400) {
          errorMessage = 'Dados inválidos. Por favor, verifique os campos preenchidos.';
        }
        this.mostrarFeedback(errorMessage, 'error');
      },
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
}
