import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfirmedValidator, ValidationMessages } from '@squilo/core';
import { User } from '@squilo/domain';
import {
  ApiFacade,
  DefaultError,
  LoadingService,
  ToastService,
} from '@squilo/services';
import { finalize } from 'rxjs/operators';
import { ValidationStatusComponent } from '@squilo/core';
@Component({
  standalone: true,
  selector: 'squilo-signup-slide',
  templateUrl: './signup-slide.component.html',
  styleUrls: ['signup-slide.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    ValidationStatusComponent,
    ReactiveFormsModule,
  ],
})
export class SignupSlide implements OnInit {
  @Output()
  signupCompleted = new EventEmitter<boolean>();

  form!: FormGroup;

  validationMessages: ValidationMessages = {
    username: {
      required: 'Username is required',
      minlength: 'Username needs at least 4 characters',
      maxlength: 'Username must have a maximum of 24 characters',
      usernameAsync: 'Username is taken',
    },
    email: {
      required: 'Email is required',
      email: 'We need a valid email ;)',
      emailAsync: 'Email is taken',
    },
    password: {
      required: 'Passsword is required',
      minlength: 'Username needs at least 6 characters',
    },
  };

  constructor(
    public formBuilder: FormBuilder,
    private api: ApiFacade,
    private toast: ToastService,
    private loading: LoadingService
  ) {}

  /**
   *
   */
  get username() {
    return this.form.get('username');
  }

  /**
   *
   */
  get email() {
    return this.form.get('email');
  }

  /**
   *
   */
  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(24),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmationPassword: ['', []],
      },
      {
        validators: ConfirmedValidator('password', 'confirmationPassword'),
      }
    );
  }

  /**
   *
   */
  submit = () => {
    this.loading.show('Please wait...');
    this.api.user
      .create({ ...this.form.value })
      .pipe(finalize(() => this.loading.dismiss()))
      .subscribe({
        next: this.onSuccessCreate,
        error: this.onFailCreate,
      });
  };

  /**
   *
   */
  private onSuccessCreate = (user: User) => {
    this.toast.show({
      message: 'Account created succefully',
      color: 'success',
    });
    this.signupCompleted.emit(true);
    this.form.reset();
  };

  /**
   *
   */
  private onFailCreate = (error: DefaultError) => {
    console.log(error);
    this.toast.show({ message: error.message, color: 'danger' });
  };
}
