import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { FeedbackPopupComponent } from '../../shared/components/feedback-popup/feedback-popup.component';
import { ITeam } from '../../shared/interfaces/team.interface';
import { AdmPageComponent } from '../../shared/layout/admin-page/adm-page.component';
import { ViewTeamMemberComponent } from './view-team-member/view-team-member.component';

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
    FeedbackPopupComponent,
  ],
  standalone: true,
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'ra', 'role_name', 'acoes'];
  dataSource = new MatTableDataSource<ITeam>([]);

  private apiUrl = environment.apiUrl;
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.carregarMembros();
  }

  carregarMembros(): void {
    this.http
      .get<ITeam[]>(`${this.apiUrl}/teammember`, { withCredentials: true })
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

  adicionarMembro(): void {
    this.router.navigate(['/adm-team/add']);
  }

  visualizarDetalhes(teamMember: ITeam): void {
    console.log('Buscando detalhes do membro da equipe:', teamMember.id);
    this.http
      .get<ITeam>(`${this.apiUrl}/teammember/${teamMember.id}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (memberDetails) => {
          this.dialog.open(ViewTeamMemberComponent, {
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: `Tem certeza que deseja remover o membro de equipe: ${teamMember.name}?`,
      },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .delete(`${this.apiUrl}/teammember/${teamMember.id}`, {
            withCredentials: true,
          })
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
    });
  }

  private mostrarFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }
}
