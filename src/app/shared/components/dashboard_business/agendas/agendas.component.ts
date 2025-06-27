import { MatTabsModule } from '@angular/material/tabs';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AuthUsuarioService } from '../../../../core/services/auth_fire.service';
import { DatabaseService } from '../../../../core/services/database.service';

export interface AgendaElement {
  id: string;
  cliente: string;
  data: string;
  hora: string;
  servico: string;
  status: string;
}

const AGENDA_DATA: AgendaElement[] = [];

@Component({
  selector: 'app-agendas',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [AuthUsuarioService],
  templateUrl: './agendas.component.html',
  styleUrl: './agendas.component.css'
})
export class AgendasComponent {

  displayedColumns: string[] = ['cliente', 'data', 'hora', 'servico', 'status'];
  dataToDisplay = [...AGENDA_DATA];
  dataSource = new ExampleDataSource(this.dataToDisplay);

  readonly dialog = inject(MatDialog);

  constructor(
    private database: DatabaseService,
  ) { }

  createAgenda() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '400px',
      data: { name: 'Nova Agenda' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const empresaId = 'empresa-id-aqui'; // 🔥 Pega da autenticação
        const agendamentoId = new Date().getTime().toString(); // 🔥 ID único
        const data = {
          title: result.title,
          description: result.description,
          service: result.service,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        this.database.createSchedule(empresaId, agendamentoId, data)
          .then(() => console.log('Agenda criada com sucesso!'))
          .catch((err) => console.error('Erro ao criar agenda', err));
      }
    });
  }

}

class ExampleDataSource extends DataSource<AgendaElement> {
  private _dataStream = new ReplaySubject<AgendaElement[]>();

  constructor(initialData: AgendaElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<AgendaElement[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: AgendaElement[]) {
    this._dataStream.next(data);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <h2 mat-dialog-title>Criar Agendamento</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Cliente</mat-label>
        <input matInput [(ngModel)]="data.cliente">
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Data</mat-label>
        <input matInput [(ngModel)]="data.data" type="date">
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Hora</mat-label>
        <input matInput [(ngModel)]="data.hora" type="time">
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Serviço</mat-label>
        <input matInput [(ngModel)]="data.servico">
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button (click)="onSave()" cdkFocusInitial>Salvar</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
})
export class DialogContentExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
