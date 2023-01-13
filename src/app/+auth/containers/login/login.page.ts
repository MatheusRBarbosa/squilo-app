import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from '@squilo/domain';
import { AccountService, ToastService } from '@squilo/services';
import { DefaultError } from 'src/libs/services/interceptors';

@Component({
  standalone: true,
  selector: 'squilo-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  form!: FormGroup;

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
    console.log('Redirect para esqueceu a senha');
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
