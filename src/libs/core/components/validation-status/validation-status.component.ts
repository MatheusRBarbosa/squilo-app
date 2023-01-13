import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Disposable, ValidationMessages } from '@squilo/core';
import { takeUntil } from 'rxjs/operators';
@Component({
  standalone: true,
  selector: 'squilo-validation-status',
  templateUrl: './validation-status.component.html',
  styleUrls: ['validation-status.component.scss'],
  imports: [CommonModule],
})
export class ValidationStatusComponent extends Disposable implements OnInit {
  @Input()
  validationMessages!: ValidationMessages;
  @Input()
  controlName!: string;
  @Input()
  form!: FormGroup;

  errorMessage: string = '';

  ngOnInit() {
    const control = this.form.get(this.controlName);
    control?.valueChanges.pipe(takeUntil(this.destroyed$$)).subscribe(() => {
      let hasErrors = false;
      for (let prop in control.errors) {
        this.errorMessage = this.validationMessages[this.controlName][prop];
        hasErrors = true;
      }

      if (!hasErrors) {
        this.errorMessage = '';
      }
    });
  }
}
