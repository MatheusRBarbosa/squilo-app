import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'squilo-navbar',
  templateUrl: './navbar.component.html',
  imports: [IonicModule],
})
export class NavbarComponent {
  @Input()
  contentId: string = 'main-content';
}
