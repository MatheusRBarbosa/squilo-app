import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'squilo-page-slider',
  templateUrl: './page-slider.component.html',
  styleUrls: ['page-slider.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PageSlider {
  @Input()
  index: number = 1;

  @Output()
  onClick = new EventEmitter<number>();

  constructor() {}
}
