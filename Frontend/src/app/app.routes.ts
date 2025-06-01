import { Routes } from '@angular/router';
import { AuthGuard } from './admin/login-page/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'monitors',
    loadComponent: () =>
      import('./user/monitors/monitors.component').then(
        (m) => m.MonitorsComponent
      ),
  },
  {
    path: 'news/:id',
    loadComponent: () =>
      import('./shared/components/news/news.component').then(
        (m) => m.NewsComponent
      ),
  },
  {
    path: 'user-news',
    loadComponent: () =>
      import('./user/news/news-list.component').then(
        (m) => m.NewsListComponent
      ),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./user/team/team.component').then((m) => m.TeamComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./admin/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'monitor/:id',
    loadComponent: () =>
      import('./admin/monitors/view-monitor/view-monitor.component').then(
        (m) => m.ViewMonitorComponent
      ),
  },
  {
    path: 'adm-monitors',
    loadComponent: () =>
      import('./admin/monitors/monitors-list.component').then(
        (m) => m.MonitorsListComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'adm-news/new',
    loadComponent: () =>
      import('./admin/news/news-form/news-form.component').then(
        (m) => m.NewsFormComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'adm-news/:id',
    loadComponent: () =>
      import('./admin/news/news-form/news-form.component').then(
        (m) => m.NewsFormComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'adm-news',
    loadComponent: () =>
      import('./admin/news/adm-news.component').then(
        (m) => m.AdmNewsComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'team/new',
    loadComponent: () =>
      import('./admin/team/view-team/view-team.component').then(
        (m) => m.ViewTeamComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'team/:id',
    loadComponent: () =>
      import('./admin/team/view-team/view-team.component').then(
        (m) => m.ViewTeamComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'adm-team',
    loadComponent: () =>
      import('./admin/team/team-list.component').then(
        (m) => m.TeamListComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'adm-team/add',
    loadComponent: () =>
      import(
        './admin/team/add-team-member-page/add-team-member-page.component'
      ).then((m) => m.AddTeamMemberPageComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },
];
