import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMonitor } from '../../shared/interfaces/monitor.interface';
import { AdmPageComponent } from '../../shared/layout/admin-page/adm-page.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewMonitorComponent } from './view-monitor/view-monitor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FeedbackPopupComponent } from '../../shared/components/feedback-popup/feedback-popup.component';

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

  private apiUrl = 'http://localhost:3333/monitor'; //TODO: como iremos pegar a URL?
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.carregarMonitores();
  }

  carregarMonitores(): void {
    this.http
      .get<IMonitor[]>(this.apiUrl, { withCredentials: true })
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

  adicionarMonitor(): void {
    //todo
    console.log('Abrir dialog para adicionar novo monitor.');
    this.mostrarFeedback('Função "Adicionar" a ser implementada.', 'success');
  }

  visualizarDetalhes(monitor: IMonitor): void {
    console.log('Buscando detalhes do monitor:', monitor.id);
    this.http
      .get<IMonitor>(`${this.apiUrl}/${monitor.id}`, { withCredentials: true })
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
    this.http
      .delete(`${this.apiUrl}/${monitor.id}`, { withCredentials: true })
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
}
