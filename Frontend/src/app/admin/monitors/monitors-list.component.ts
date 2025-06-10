import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { FeedbackPopupComponent } from '../../shared/components/feedback-popup/feedback-popup.component';
import { IMonitor } from '../../shared/interfaces/monitor.interface';
import { AdmPageComponent } from '../../shared/layout/admin-page/adm-page.component';
import { ViewMonitorComponent } from './view-monitor/view-monitor.component';

@Component({
  selector: 'monitors-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AdmPageComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FeedbackPopupComponent,
  ],
  templateUrl: './monitors-list.component.html',
  styleUrl: './monitors-list.component.css',
})
export class MonitorsListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'ra', 'email', 'acoes'];
  dataSource = new MatTableDataSource<IMonitor>([]);

  private apiUrl = environment.apiUrl;
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarMonitores();
  }

  carregarMonitores(): void {
    this.http
      .get<IMonitor[]>(`${this.apiUrl}/monitor`, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar monitores:', error);
          if (error.status === 0) {
            console.error(
              'Erro de CORS ou rede. Verifique a configuração do servidor e a URL da API.'
            );
          } else if (error.status === 401 || error.status === 403) {
            console.error(
              'Erro de autenticação ou autorização. O servidor rejeitou a requisição. Verifique se o cookie HttpOnly é válido e se o backend o processa corretamente.'
            );
          }
          this.dataSource.data = [];
          return of([]);
        })
      )
      .subscribe((data: IMonitor[]) => {
        this.dataSource.data = data;
        console.log('Monitores carregados:', data);
      });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  visualizarDetalhes(monitor: IMonitor): void {
    console.log('Buscando detalhes do monitor:', monitor.id);
    this.http
      .get<IMonitor>(`${this.apiUrl}/monitor/${monitor.id}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (monitorDetails) => {
          this.dialog.open(ViewMonitorComponent, {
            width: '500px',
            data: monitorDetails,
            panelClass: 'custom-dialog-container',
          });
        },
        error: (err) => {
          console.error('Erro ao buscar detalhes do monitor:', err);
          this.mostrarFeedback(
            'Não foi possível carregar os detalhes.',
            'error'
          );
        },
      });
  }

  deletarMonitor(monitor: IMonitor): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: `Tem certeza que deseja remover o monitor: ${monitor.name}?`,
      },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .delete(`${this.apiUrl}/monitor/${monitor.id}`, {
            withCredentials: true,
          })
          .subscribe({
            next: () => {
              console.log('Monitor deletado com sucesso.');
              this.mostrarFeedback('Monitor removido com sucesso!', 'success');
              this.carregarMonitores();
            },
            error: (err) => {
              console.error('Erro ao deletar monitor:', err);
              this.mostrarFeedback(
                'Erro ao remover monitor. Tente novamente.',
                'error'
              );
            },
          });
      }
    });
  }

  copiarEmails(): void {
    if (this.dataSource.data.length === 0) {
      this.mostrarFeedback('Nenhum email para copiar.', 'success');
      console.warn('Nenhum email para copiar.');
      return;
    }
    const emails = this.dataSource.data
      .map((monitor) => monitor.email)
      .join('\n');
    this.copiarParaClipboard(emails);
  }

  private copiarParaClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful
        ? 'Emails copiados para a área de transferência!'
        : 'Falha ao copiar emails.';
      this.mostrarFeedback(msg, 'success');
    } catch (err) {
      const errorMsg = 'Erro ao tentar copiar emails.';
      this.mostrarFeedback(errorMsg, 'error');
    }
    document.body.removeChild(textarea);
  }

  private mostrarFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }

  onRowClick(event: MouseEvent, monitor: IMonitor): void {
    if ((event.target as HTMLElement).tagName === 'SPAN' || (event.target as HTMLElement).tagName === 'MAT-ICON') return;

    this.visualizarDetalhes(monitor);
  }
}
