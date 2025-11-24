import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent {
  showBanner = false;
  private readonly CONSENT_KEY = 'cookie_consent';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const consent = localStorage.getItem(this.CONSENT_KEY);
      if (!consent) {
        this.showBanner = true;
      }
    }
  }

  acceptCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.CONSENT_KEY, 'accepted');
      this.showBanner = false;
    }
  }

  refuseCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.CONSENT_KEY, 'refused');
      this.showBanner = false;
    }
  }
}
