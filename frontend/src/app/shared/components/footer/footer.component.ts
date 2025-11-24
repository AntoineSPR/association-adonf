import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  footerLinks = [
    { label: 'Accueil', route: '/' },
    { label: 'Association', route: '/association' },
    { label: 'Contacts', route: '/contacts' },
    { label: "Plan d'accès", route: '/plan-acces' },
    {
      label: 'Politique de confidentialité',
      route: '/politique-confidentialite',
    },
    { label: 'Mentions légales', route: '/mentions-legales' },
    { label: 'CGV / Statuts', route: '/cgv-statuts' },
  ];

  socialLinks = [
    { icon: 'facebook', url: 'https://facebook.com/adonf' },
    { icon: 'instagram', url: 'https://instagram.com/adonf' },
    { icon: 'youtube', url: 'https://youtube.com/adonf' },
  ];

  currentYear = new Date().getFullYear();
}
