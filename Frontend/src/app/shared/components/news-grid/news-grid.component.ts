import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { FeedbackPopupComponent } from '../../../shared/components/feedback-popup/feedback-popup.component';
import { INews } from '../../../shared/interfaces/news.interface';

@Component({
  selector: 'news-grid',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    FeedbackPopupComponent,
    MatTooltipModule
  ],
  templateUrl: './news-grid.component.html',
  styleUrl: './news-grid.component.css',
})
export class NewsGridComponent implements AfterViewInit {
  @Input() isLatest: boolean = false;
  @Input() isAdmin: boolean = false;
  @Input() newsList: INews[] = [];
  @Input() parentComponent: any;
  @Output() newsListLoaded = new EventEmitter<INews[]>();
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChildren('titleRef') titleRefs!: QueryList<ElementRef>;

  isTruncatedMap: Record<string, boolean> = {};

  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';
  hasItemsSelected: boolean = false;
  apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  get isHorizontalLayout(): boolean {
    return this.newsList.length > 0 && this.newsList.length <= 3;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.titleRefs.forEach((elRef: ElementRef) => {
        const element = elRef.nativeElement as HTMLElement;

        const isTruncated =
          element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth;

        const newsId = this.getNewsIdFromElement(element);
        if (newsId) {
          this.isTruncatedMap[newsId] = isTruncated;
        }
      });
    });
  }

  private getNewsIdFromElement(element: HTMLElement): string | null {
    let current = element.parentElement;
    while (current && !current.classList.contains('news-card')) {
      current = current.parentElement;
    }

    if (!current) return null;

    return current.getAttribute('data-news-id');
  }

  toggleDraft(news: INews): void {
    this.clearFeedback();
    news.draft = !news.draft;

    this.http.patch<INews>(`${environment.apiUrl}/news/${news.id}/toggle-draft`,
      null,
      { withCredentials: true }
    ).subscribe({
      next: (response) => {
        console.log(`Notícia publicada:`, response);
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

  openNews(event: any, news: INews): void {
    if (
      ((event.target as HTMLElement).tagName === 'MAT-ICON' ||
        (event.target as HTMLElement).tagName === 'SPAN')
    )
      return;
    this.router.navigate([`/news/${news.id}`]);
  }

  editNews(news: INews): void {
    this.router.navigate([`/adm-news/${news.id}`]);
  }

  delete(news: INews): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: `Tem certeza que deseja remover a notícia: ${news.title}?`,
      },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .delete(`${environment.apiUrl}/news/${news.id}`, {
            withCredentials: true,
          })
          .subscribe({
            next: () => {
              console.log('Notícia deletada com sucesso.');
              this.mostrarFeedback('Notícia removida com sucesso!', 'success');
              this.parentComponent.getNews();
            },
            error: (err) => {
              console.error('Erro ao deletar notícia:', err);
              this.mostrarFeedback(
                'Erro ao remover monitor. Tente novamente.',
                'error'
              );
            },
          });
      }
    });
  }

  showNewsCards(): boolean {
    return this.newsList.every(news => news.filtered === true);
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
