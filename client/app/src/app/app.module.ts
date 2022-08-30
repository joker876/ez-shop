import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaIconComponent } from './components/icons/fa-icon/fa-icon.component';
import { BiIconComponent } from './components/icons/bi-icon/bi-icon.component';
import { MatIconComponent } from './components/icons/mat-icon/mat-icon.component';
import { ModalComponent } from './components/modal/modal.component';
import { TransparentButtonComponent } from './components/buttons/transparent-button/transparent-button.component';
import { MainButtonComponent } from './components/buttons/main-button/main-button.component';
import { GhostButtonComponent } from './components/buttons/ghost-button/ghost-button.component';
import { FieldLabelComponent } from './components/forms/field-label/field-label.component';
import { FieldTextComponent } from './components/forms/field-text/field-text.component';
import { FormFieldComponent } from './components/forms/form-field/form-field.component';
import { FieldHintComponent } from './components/forms/field-hint/field-hint.component';
import { TextInputComponent } from './components/forms/inputs/text-input/text-input.component';
import { _GeneralInputComponent } from './components/forms/inputs/INTERNAL-general-input/general-input.component';

@NgModule({
  declarations: [
    AppComponent,
    FaIconComponent,
    BiIconComponent,
    MatIconComponent,
    ModalComponent,
    TransparentButtonComponent,
    MainButtonComponent,
    GhostButtonComponent,
    FieldLabelComponent,
    FieldTextComponent,
    FormFieldComponent,
    FieldHintComponent,
    TextInputComponent,
    _GeneralInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
