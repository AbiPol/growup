import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'growup-header',
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    RouterLink
  ],
  templateUrl: './header.html'
})
export class Header {
  isDark = false;

  toggleDark() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark', this.isDark);
  }
}
