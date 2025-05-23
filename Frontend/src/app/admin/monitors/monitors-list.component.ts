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


@Component({
  selector: 'monitors-list',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, AdmPageComponent],
  templateUrl: './monitors-list.component.html',
  styleUrl: './monitors-list.component.css'
})
export class MonitorsListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'ra', 'email', 'acoes'];
  dataSource = new MatTableDataSource<IMonitor>([]);

  private apiUrl = 'http://localhost:3333/monitor'; //TODO: como iremos pegar a URL?
  feedbackCopia: string = '';

  constructor(private http: HttpClient) { }

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

  visualizarDetalhes(monitor: IMonitor): void {
    console.log('Visualizar detalhes do monitor:', monitor);
    //TODO
  }

  deletarAluno(monitor: IMonitor): void {
    console.log('Deletar monitor:', monitor);
    //TODO - logica real
    // Simulação
    const index = this.dataSource.data.findIndex(
      (m) =>
        m.id === monitor.id || (m.nome === monitor.nome && m.ra === monitor.ra)
    );
    if (index > -1) {
      const newData = [...this.dataSource.data];
      newData.splice(index, 1);
      this.dataSource.data = newData;
    }
  }

  copiarEmails(): void {
    if (this.dataSource.data.length === 0) {
      this.mostrarFeedback('Nenhum email para copiar.');
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
      this.mostrarFeedback(msg);
    } catch (err) {
      const errorMsg = 'Erro ao tentar copiar emails.';
      this.mostrarFeedback(errorMsg);
    }
    document.body.removeChild(textarea);
  }

  private mostrarFeedback(message: string): void {
    this.feedbackCopia = message;
    setTimeout(() => {
      this.feedbackCopia = '';
    }, 3000);
  }
}
