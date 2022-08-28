import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-general-input',
  templateUrl: './general-input.component.html',
  styleUrls: ['./general-input.component.scss'],
})
export class GeneralInputComponent implements OnChanges, AfterViewInit {
  @Input() before: any;
  @Input() beforeType: 'text' | 'icon' | 'icon-button' = 'icon-button';
  @Input() after: any;
  @Input() afterType: 'text' | 'icon' = 'icon';

  @Input() removeClearButton: boolean = false;

  @Input() placeholder?: string;

  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Output() prevValueChange = new EventEmitter<any>();
  @Input() caretPos: any;
  @Output() caretPosChange = new EventEmitter<number>();

  @Output() onTouched = new EventEmitter();

  @Input() disabled: boolean = false;

  @Input() id?: string;

  isViewInitialized = false;
  ngAfterViewInit(): void {
    this.isViewInitialized = true;
  }

  //input element
  @ViewChild('input') inputEl!: ElementRef;

  formatFunction: Function = () => {};
  
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isViewInitialized) return;
    if (changes['caretPos']) {
      this._setCaretPos(changes['caretPos'].currentValue);
    }
  }

  setValue(val: any) {
    this.value = val;
    this.inputEl.nativeElement.value = val;
    this.valueChange.emit(val);
  }
  onArrowPress(event: KeyboardEvent) {
    if (event.key != 'ArrowLeft' && event.key != 'ArrowRight') return;
    this.emitNewCaretPos();
  }
  onInput(event: Event) {
    this.prevValueChange.emit(this.value);
    this.value = (event.target as HTMLInputElement).value;

    this.valueChange.emit(this.value);
    this.emitNewCaretPos();

    if (!this.isViewInitialized) return;
    this.formatFunction();
  }
  emitNewCaretPos() {
    this.caretPosChange.emit(this._getCaretPos());
  }
  private _getCaretPos(): number {
    return this.inputEl.nativeElement.selectionStart;
  }
  private _setCaretPos(pos: number): void {
    this.inputEl.nativeElement.setSelectionRange(pos, pos);
  }
}
