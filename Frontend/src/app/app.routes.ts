import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginRedirectGuard } from './guards/login-redirect.guard';

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
      import('./user/news/view-news/view-news.component').then(
        (m) => m.ViewNewsComponent
      ),
  },
  {
    path: 'news',
    loadComponent: () =>
      import('./user/news/news-list.component').then(
        (m) => m.NewsListComponent
      ),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./user/team/team.component').then(
        (m) => m.TeamComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./admin/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
    canActivate: [LoginRedirectGuard]
  },
  {
    path: 'monitor/:id',
    loadComponent: () =>
      import('./admin/monitors/view-monitor/view-monitor.component').then(
        (m) => m.ViewMonitorComponent
      ),
    canActivate: [AuthGuard]
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
    path: 'news-preview/:id',
    loadComponent: () =>
      import('./admin/news/preview-news/preview-news.component').then(
        (m) => m.PreviewNewsComponent
      ),
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
    path: 'adm-team/add',
    loadComponent: () =>
      import(
        './admin/team/add-team-member-page/add-team-member-page.component'
      ).then((m) => m.AddTeamMemberPageComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'team/:id',
    loadComponent: () =>
      import('./admin/team/view-team-member/view-team-member.component').then(
        (m) => m.ViewTeamMemberComponent
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
  { path: '**', redirectTo: '' },
];
