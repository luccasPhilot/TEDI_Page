import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

import { PageComponent } from '../../shared/layout/page/page.component';
import { ITeam } from '../../shared/interfaces/team.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent implements OnInit {
  teamMembers: ITeam[] = [];
  isLoading = true;
  error: string | null = null;

  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.carregarMembros();
  }

  carregarMembros(): void {
    this.isLoading = true;
    this.error = null;

    this.http
      .get<ITeam[]>(`${this.apiUrl}/teammember`, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar membros da equipe:', error);
          if (error.status === 0) {
            this.error =
              'Não foi possível conectar ao servidor. Verifique sua rede.';
            console.error(
              'Erro de CORS ou rede. Verifique a configuração do servidor e a URL da API.'
            );
          } else if (error.status === 401 || error.status === 403) {
            this.error = 'Você não tem permissão para ver estes dados.';
            console.error(
              'Erro de autenticação ou autorização. Verifique as credenciais.'
            );
          } else {
            this.error =
              'Ocorreu um erro ao carregar a equipe. Tente novamente mais tarde.';
          }
          this.teamMembers = [];
          return of([]);
        })
      )
      .subscribe((data: ITeam[]) => {
        this.isLoading = false;
        this.teamMembers = data;
        console.log('Membros da equipe carregados:', data);
        if (data.length === 0 && !this.error) {
          this.error = 'Nenhum membro da equipe encontrado.';
        }
      });
  }
}
