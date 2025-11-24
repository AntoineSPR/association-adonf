import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-backoffice-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './backoffice-layout.component.html',
  styleUrls: ['./backoffice-layout.component.scss'],
})
export class BackofficeLayoutComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;
  isSidebarOpen = true;

  menuItems = [
    { label: 'Tableau de bord', route: '/backoffice', icon: 'dashboard' },
    { label: "Page d'accueil", route: '/backoffice/home', icon: 'home' },
    { label: 'Actualités', route: '/backoffice/actualites', icon: 'news' },
    { label: 'Concerts', route: '/backoffice/concerts', icon: 'music' },
    { label: 'Agenda', route: '/backoffice/agenda', icon: 'calendar' },
    {
      label: 'Pages statiques',
      icon: 'pages',
      submenu: [
        { label: 'Cours de Musique', route: '/backoffice/pages/cours-musique' },
        {
          label: 'Inscriptions et Tarifs',
          route: '/backoffice/pages/inscriptions-tarifs',
        },
        {
          label: 'Projet Pédagogique',
          route: '/backoffice/pages/projet-pedagogique',
        },
        { label: 'Répétitions', route: '/backoffice/pages/repetitions' },
        {
          label: "Studio d'Enregistrement",
          route: '/backoffice/pages/studio-enregistrement',
        },
        { label: 'Prestations', route: '/backoffice/pages/prestations' },
        { label: 'Billetterie', route: '/backoffice/pages/billetterie' },
        { label: 'Association', route: '/backoffice/pages/association' },
        { label: 'Contacts', route: '/backoffice/pages/contacts' },
        { label: "Plan d'accès", route: '/backoffice/pages/plan-acces' },
      ],
    },
  ];

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
