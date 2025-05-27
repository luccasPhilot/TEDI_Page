import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITeam } from '../../shared/interfaces/team.interface';
import { AdmPageComponent } from '../../shared/layout/admin-page/adm-page.component';
import { ViewTeamComponent } from './view-team/view-team.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-team-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AdmPageComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  standalone: true,
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'ra', 'role_name', 'acoes'];
  dataSource = new MatTableDataSource<ITeam>([]);

  private apiUrl = 'http://localhost:3333/teammember';
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.carregarMembros();
  }

  carregarMembros(): void {
    this.http
      .get<ITeam[]>(this.apiUrl, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar membros da equipe:', error);
          if (error.status === 0) {
            console.error(
              'Erro de CORS ou rede. Verifique a configuração do servidor e a URL da API.'
            );
          } else if (error.status === 401 || error.status === 403) {
            console.error(
              'Erro de autenticação ou autorização. Verifique as credenciais.'
            );
          }
          this.dataSource.data = [];
          return of([]);
        })
      )
      .subscribe((data: ITeam[]) => {
        this.dataSource.data = data;
        console.log('Membros da equipe carregados:', data);
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

  visualizarDetalhes(teamMember: ITeam): void {
    console.log('Buscando detalhes do membro da equipe:', teamMember.id);
    this.http
      .get<ITeam>(`${this.apiUrl}/${teamMember.id}`, { withCredentials: true })
      .subscribe({
        next: (memberDetails) => {
          this.dialog.open(ViewTeamComponent, {
            width: '500px',
            data: memberDetails,
            panelClass: 'custom-dialog-container',
          });
        },
        error: (err) => {
          console.error('Erro ao buscar detalhes do membro da equipe:', err);
          this.mostrarFeedback(
            'Não foi possível carregar os detalhes do membro.',
            'error'
          );
        },
      });
  }

  deletarMembro(teamMember: ITeam): void {
    this.http
      .delete(`${this.apiUrl}/${teamMember.id}`, { withCredentials: true })
      .subscribe({
        next: () => {
          console.log('Membro da equipe deletado com sucesso.');
          this.mostrarFeedback(
            'Membro da equipe removido com sucesso!',
            'success'
          );
          this.carregarMembros();
        },
        error: (err) => {
          console.error('Erro ao deletar membro da equipe:', err);
          this.mostrarFeedback(
            'Erro ao remover o membro. Tente novamente.',
            'error'
          );
        },
      });
  }

  private mostrarFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;

    setTimeout(() => {
      this.feedbackMessage = '';
      this.feedbackType = '';
    }, 3000);
  }
}
