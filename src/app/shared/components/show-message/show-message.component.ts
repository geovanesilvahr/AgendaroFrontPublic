import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-message',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent implements OnChanges {
  @Input() messages: { text: string; type: string }[] = [];

  ngOnChanges() {
    this.messages.forEach((_, index) => {
      setTimeout(() => {
        this.messages.splice(index, 1);
      }, 5000); // ⏳ Mensagem some após 5 segundos
    });
  }

  removeMessage(index: number) {
    this.messages.splice(index, 1);
  }
}
