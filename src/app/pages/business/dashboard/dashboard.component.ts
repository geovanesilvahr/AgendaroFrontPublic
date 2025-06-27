import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatabaseService } from '../../../core/services/database.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opened = true;
  isMobile = false;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  checkScreen() {
    this.isMobile = window.innerWidth <= 768;
    this.opened = !this.isMobile;
  }

  // 🔸 Adicionar Cliente
  addClient() {
    const empresaId = 'empresaId123';
    const clienteId = 'clienteId1';
    const clientData = {
      nome: 'Maria',
      telefone: '119999999',
      email: 'maria@email.com'
    };
    this.database.addClientIntoBusiness(empresaId, clienteId, clientData).then(() => {
      console.log('Cliente adicionado!');
    });
  }

  // 🔸 Adicionar Agendamento
  addSchedule() {
    const empresaId = 'empresaId123';
    const agendamentoId = 'agendamentoId1';
    const appointmentData = {
      cliente: 'Maria',
      data: '2025-06-02',
      hora: '14:00',
      servico: 'Corte de cabelo',
      status: 'pendente'
    };
    this.database.createSchedule(empresaId, agendamentoId, appointmentData).then(() => {
      console.log('Agendamento criado!');
    });
  }

  // 🔸 Deletar Empresa
  deleteBusiness() {
    this.database.deleteBusiness('empresaId123').then(() => {
      console.log('Empresa deletada!');
    });
  }
}
