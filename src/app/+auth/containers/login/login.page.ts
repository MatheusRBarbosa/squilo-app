import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonicModule, IonSlides } from '@ionic/angular';
import { LoginSlide } from '../../components/login-slide/login-slide.component';
import { PageSlider } from '../../components/page-slider/page-slider.component';
import { SignupSlide } from '../../components/signup-slide/signup-slide.component';

enum SlidePages {
  Login = 1,
  Signup = 2,
}

@Component({
  standalone: true,
  selector: 'squilo-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [IonicModule, CommonModule, LoginSlide, SignupSlide, PageSlider],
})
export class LoginPage {
  selectedPage: number = SlidePages.Login;

  @ViewChild(IonSlides) slides?: IonSlides;
  constructor() {}

  /**
   *
   */
  setSelectedPage = (page: number) => (this.selectedPage = page);

  /**
   *
   */
  onClickPageSlider = (page: number) => {
    page === SlidePages.Signup
      ? this.slides?.slideNext()
      : this.slides?.slidePrev();
  };

  /**
   *
   */
  signupCompleted = (completed: boolean) => {
    if (completed) {
      this.slides?.slidePrev();
    }
  };
}
