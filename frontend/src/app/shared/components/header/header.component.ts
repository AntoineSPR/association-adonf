import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = false;

  menuItems = [
    { label: '', routerLink: '/', icon: 'pi pi-home' },
    { separator: true },
    { label: 'Agenda', routerLink: '/agenda' },
    { separator: true },
    {
      label: 'École de Musique',
      items: [
        { label: 'Cours de Musique', routerLink: '/cours-de-musique' },
        { label: 'Inscriptions et Tarifs', routerLink: '/inscriptions-tarifs' },
        { label: 'Projet Pédagogique', routerLink: '/projet-pedagogique' },
      ],
    },
    { separator: true },
    { label: 'Répétitions', routerLink: '/repetitions' },
    { separator: true },
    { label: "Studio d'Enregistrement", routerLink: '/studio-enregistrement' },
    { separator: true },
    {
      label: 'Prestations diverses',
      items: [
        { label: 'Sonorisation', routerLink: '/prestations#sonorisation' },
        { label: 'Régie', routerLink: '/prestations#regie' },
        { label: 'Festivals', routerLink: '/prestations#festivals' },
        {
          label: 'Accompagnement artistique',
          routerLink: '/prestations#accompagnement',
        },
      ],
    },
    {
      icon: 'pi pi-facebook',
      url: 'https://www.facebook.com/AssociationADonf/',
      target: '_blank',
      styleClass: 'mobile-social-header',
    },
    {
      icon: 'pi pi-instagram',
      url: 'https://www.instagram.com/association_adonf/',
      target: '_blank',
      styleClass: 'mobile-social-header',
    },
    {
      icon: 'pi pi-youtube',
      url: 'https://www.youtube.com/@rockschooladonf7634',
      target: '_blank',
      styleClass: 'mobile-social-header',
    },
  ];

  socialLinks = [
    { icon: 'facebook', url: 'https://www.facebook.com/AssociationADonf/' },
    { icon: 'instagram', url: 'https://www.instagram.com/association_adonf/' },
    { icon: 'youtube', url: 'https://www.youtube.com/@rockschooladonf7634' },
  ];
}
