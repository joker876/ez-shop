import { AfterViewInit, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { _GeneralInputComponent } from '../INTERNAL-general-input/general-input.component';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextInputComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => TextInputComponent)
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor, Validator, AfterViewInit {
  @Input() value: string = '';
  prevValue: string = '';
  caretPos: number = 0;

  @Input() maxLength?: number;

  @Input() placeholder?: string;

  //input element
  @ViewChild('input') inputComponent!: _GeneralInputComponent;

  onChange: any = () => {};
  onTouched: any = () => {};
  disabled = false;

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(state: boolean): void {
    this.disabled = state;
  }
  onValueChange(_: any) {
    this.onChange(this.value);
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
  ngAfterViewInit(): void {
    let $this = this;
    this.inputComponent.formatFunction = function() {
      if ($this.maxLength) {
        if (this.value.length > $this.maxLength) {
          this.setValue(this.value.slice(0, $this.maxLength));
        }
      }
    }
  }
}
