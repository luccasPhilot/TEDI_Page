import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
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
  },
  {
    path: 'adm-news/new',
    loadComponent: () =>
      import('./admin/news/news-form/news-form.component').then(
        (m) => m.NewsFormComponent
      ),
  },
  {
    path: 'adm-news/:id',
    loadComponent: () =>
      import('./admin/news/news-form/news-form.component').then(
        (m) => m.NewsFormComponent
      ),
  },
  {
    path: 'adm-news',
    loadComponent: () =>
      import('./admin/news/adm-news.component').then((m) => m.AdmNewsComponent),
  },
  {
    path: 'team/new',
    loadComponent: () =>
      import('./admin/team/member-form/member-form.component').then(
        (m) => m.MemberFormComponent
      ),
  },
  {
    path: 'team/:id',
    loadComponent: () =>
      import('./admin/team/member-form/member-form.component').then(
        (m) => m.MemberFormComponent
      ),
  },
  {
    path: 'adm-team',
    loadComponent: () =>
      import('./admin/team/adm-team-list.component').then(
        (m) => m.AdmTeamListComponent
      ),
  },
  {
    path: 'teste',
    loadComponent: () =>
      import('./components/table/table.component').then(
        (m) => m.TableComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
