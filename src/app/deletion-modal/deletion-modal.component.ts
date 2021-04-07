import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deletion-modal',
  templateUrl: './deletion-modal.component.html',
  styleUrls: ['./deletion-modal.component.css'],
})
export class DeletionModalComponent {
  @Input() id: number;
  @Output() closeModal: EventEmitter<number> = new EventEmitter();

  deleteItem() {
    this.closeModal.emit(this.id);
  }
}
