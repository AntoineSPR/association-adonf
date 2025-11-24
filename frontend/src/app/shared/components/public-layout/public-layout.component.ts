import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CookieConsentComponent } from '../cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    CookieConsentComponent,
  ],
  template: `
    <div class="public-layout">
      <app-header></app-header>
      <main class="main-content">
        <ng-content></ng-content>
      </main>
      <app-footer></app-footer>
      <app-cookie-consent></app-cookie-consent>
    </div>
  `,
  styles: [
    `
      .public-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .main-content {
        flex: 1;
      }
    `,
  ],
})
export class PublicLayoutComponent {}
