import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'routing-app';

  messages = [
    { text: "Login realizado com sucesso!", type: "success" },
    { text: "Erro ao tentar logar!", type: "danger" }
  ];

}
