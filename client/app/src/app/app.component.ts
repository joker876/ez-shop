import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NameService } from './services/name.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nameModalOpen = !this.nameService.nameExists();

  nameForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
  });
  nameInputError?: string;

  constructor(
    private nameService: NameService,
  ) { }
  
  resetError() {
    this.nameInputError = '';
  }
  onNameConfirm() {
    this.resetError();
    if (this.nameForm.status == "INVALID") {
      let nameField = this.nameForm.controls['name']
      if (nameField.hasError('required')) {
        this.nameInputError = 'This field is required!';
        return;
      }
      if (nameField.hasError('minlength')) {
        this.nameInputError = 'Minimum length is 2 characters!';
        return;
      }
    }
    this.nameService.setName(this.nameForm.value['name']);
    this.nameModalOpen = false;
  }
}