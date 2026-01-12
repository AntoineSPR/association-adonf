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
    { label: 'Partenaires', route: '/partenaires' },
  ];

  socialLinks = [
    { icon: 'facebook', url: 'https://www.facebook.com/AssociationADonf/' },
    { icon: 'instagram', url: 'https://www.instagram.com/association_adonf/' },
    { icon: 'youtube', url: 'https://www.youtube.com/@rockschooladonf7634' },
  ];

  currentYear = new Date().getFullYear();
}
