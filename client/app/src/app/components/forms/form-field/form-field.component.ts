import { Component, Input, OnInit } from '@angular/core';
import { TakeChance } from 'take-chance';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() errorMessage?: any;
  @Input() errorReplacesHint: boolean = true;

  @Input() required: boolean = false;

  @Input() disabled: boolean = false;

  id = TakeChance.id();

  constructor() { }

  ngOnInit(): void {
  }

}
