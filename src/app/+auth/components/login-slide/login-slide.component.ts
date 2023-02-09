import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ValidationMessages, ValidationStatusComponent } from '@squilo/core';
import { User } from '@squilo/domain';
import { ToastService, DefaultError, AccountService } from '@squilo/services';

@Component({
  standalone: true,
  selector: 'squilo-login-slide',
  templateUrl: './login-slide.component.html',
  styleUrls: ['login-slide.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ValidationStatusComponent,
  ],
})
export class LoginSlide implements OnInit {
  form!: FormGroup;

  validationMessages: ValidationMessages = {
    password: {
      required: 'Senha é obrigatório',
      minlength: 'Senha precisa ter no mínimo 6 caracteres',
    },
  };

  constructor(
    public formBuilder: FormBuilder,
    private account: AccountService,
    private toast: ToastService
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   *
   */
  submit = () => {
    this.account.login(this.form.value).subscribe({
      next: this.redirectUser,
      error: this.onSubmitError,
    });
  };

  /**
   *
   */
  forgot = () => {
    this.toast.show({
      duration: 10000,
      message: 'Funcionalidade ainda não implementada =(',
      color: 'warning',
    });
  };

  /**
   *
   */
  private redirectUser = (user: User) => {
    console.log(user);
  };

  /**
   *
   */
  private onSubmitError = (error: DefaultError) => {
    console.log(error);
    this.toast.show({ message: error.message, color: 'danger' });
  };
}
