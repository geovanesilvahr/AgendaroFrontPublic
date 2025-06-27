import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { LoginComponent } from './app/pages/login/login.component';
import { DashboardComponent } from './app/pages/business/dashboard/dashboard.component';
import { RegisterBusinessComponent } from './app/pages/register-business/register-business.component';
import { RegisterClientComponent } from './app/pages/register-client/register-client.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './app/core/guards/auth.guard';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from './environments/environments.prod';
import { Routes } from '@angular/router';
import { AgendasComponent } from './app/shared/components/dashboard_business/agendas/agendas.component';
import { SchedulesComponent } from './app/shared/components/dashboard_business/schedules/schedules.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children
      : [
        { path: 'agendas', component: AgendasComponent, canActivate: [AuthGuard] },
        { path: 'schedules', component: SchedulesComponent, canActivate: [AuthGuard] },
      ]
  },
  { path: 'registerBusiness', component: RegisterBusinessComponent },
  { path: 'registerClient', component: RegisterClientComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()) // Adiciona o Realtime Database
  ],
}).catch(err => console.error(err));
