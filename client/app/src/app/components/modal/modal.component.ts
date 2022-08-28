import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() modalTitle?: string;

  @Input() maxContentWidth = false;

  @Input() cancelText?: string;
  @Input() confirmText?: string;
  @Input() hideButtons: boolean = false;

  @Input() open?: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Output() close = new EventEmitter<Event>();
  @Output() cancel = new EventEmitter<Event>();
  @Output() confirm = new EventEmitter<Event>();

  @Input() preventClosing = false;

  constructor() { }

  onClose(event: Event) {
    this.open = false;
    this.close.emit(event);
    this.openChange.emit(false);
  }
  onCancel(event: Event) {
    this.cancel.emit(event);
  }
  onConfirm(event: Event) {
    this.confirm.emit(event);
  }
  stopBgClick(event: Event) {
    event.stopPropagation();
  }
}