import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
import { finalize, tap } from 'rxjs/operators';
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

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    birthDate: new FormControl(new Date()),
    password: new FormControl(''),
    confirmationPassword: new FormControl(''),
  });

  validationMessages: ValidationMessages = {
    name: {
      required: 'Nome é obrigatório',
    },
    birthDate: {
      required: 'Data de nascimento é obrigatório',
    },
    email: {
      required: 'E-mail é obrigatório',
      email: 'Precisamos de um e-mail válido ;)',
    },
    password: {
      required: 'Senha é obrigatório',
      minlength: 'Senha precisa ter no mínimo 6 caracteres',
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
  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        birthDate: ['', Validators.required],
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
  submit = async () => {
    await this.loading.show('Aguarde...');
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
      message: 'Conta criada com sucesso. Você já pode logar',
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
