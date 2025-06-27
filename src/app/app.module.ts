import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component'; // <-- Adicione seu componente raiz aqui
import { RegisterBusinessComponent } from './pages/register-business/register-business.component';

import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AuthUsuarioService } from './core/services/auth_fire.service';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    AuthUsuarioService,
    provideDatabase(() => getDatabase()),
  ],
})
export class AppModule { }
