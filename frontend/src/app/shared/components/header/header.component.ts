import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = false;

  menuItems = [
    { label: 'Home', route: '/' },
    { label: 'Agenda', route: '/agenda' },
    {
      label: 'École de Musique',
      submenu: [
        { label: 'Cours de Musique', route: '/cours-de-musique' },
        { label: 'Inscriptions et Tarifs', route: '/inscriptions-tarifs' },
        { label: 'Projet Pédagogique', route: '/projet-pedagogique' },
      ],
    },
    { label: 'Répétitions', route: '/repetitions' },
    { label: "Studio d'Enregistrement", route: '/studio-enregistrement' },
    {
      label: 'Prestations diverses',
      submenu: [
        { label: 'Sonorisation', route: '/prestations#sonorisation' },
        { label: 'Régie', route: '/prestations#regie' },
        { label: 'Festivals', route: '/prestations#festivals' },
        {
          label: 'Accompagnement artistique',
          route: '/prestations#accompagnement',
        },
      ],
    },
  ];

  socialLinks = [
    { icon: 'facebook', url: 'https://facebook.com/adonf' },
    { icon: 'instagram', url: 'https://instagram.com/adonf' },
    { icon: 'youtube', url: 'https://youtube.com/adonf' },
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
