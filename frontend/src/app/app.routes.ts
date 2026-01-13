import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    loadComponent: () =>
      import('./features/public/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'actualites/:id',
    loadComponent: () =>
      import(
        './features/public/actualite-detail/actualite-detail.component'
      ).then((m) => m.ActualiteDetailComponent),
  },
  {
    path: 'concerts',
    loadComponent: () =>
      import('./features/public/concerts-list/concerts-list.component').then(
        (m) => m.ConcertsListComponent
      ),
  },
  {
    path: 'concerts/:id',
    loadComponent: () =>
      import('./features/public/concert-detail/concert-detail.component').then(
        (m) => m.ConcertDetailComponent
      ),
  },
  {
    path: 'agenda',
    loadComponent: () =>
      import('./features/public/agenda/agenda.component').then(
        (m) => m.AgendaComponent
      ),
  },
  {
    path: 'cours-de-musique',
    loadComponent: () =>
      import('./features/public/cours-musique/cours-musique.component').then(
        (m) => m.CoursMusiqueComponent
      ),
  },
  {
    path: 'inscriptions-tarifs',
    loadComponent: () =>
      import(
        './features/public/inscriptions-tarifs/inscriptions-tarifs.component'
      ).then((m) => m.InscriptionsTarifsComponent),
  },
  {
    path: 'projet-pedagogique',
    loadComponent: () =>
      import(
        './features/public/projet-pedagogique/projet-pedagogique.component'
      ).then((m) => m.ProjetPedagogiqueComponent),
  },
  {
    path: 'repetitions',
    loadComponent: () =>
      import('./features/public/repetitions/repetitions.component').then(
        (m) => m.RepetitionsComponent
      ),
  },
  {
    path: 'studio-enregistrement',
    loadComponent: () =>
      import(
        './features/public/studio-enregistrement/studio-enregistrement.component'
      ).then((m) => m.StudioEnregistrementComponent),
  },
  {
    path: 'prestations',
    loadComponent: () =>
      import('./features/public/prestations/prestations.component').then(
        (m) => m.PrestationsComponent
      ),
  },
  {
    path: 'billetterie',
    loadComponent: () =>
      import('./features/public/billetterie/billetterie.component').then(
        (m) => m.BilletterieComponent
      ),
  },
  {
    path: 'association',
    loadComponent: () =>
      import('./features/public/association/association.component').then(
        (m) => m.AssociationComponent
      ),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./features/public/contacts/contacts.component').then(
        (m) => m.ContactsComponent
      ),
  },
  {
    path: 'plan-acces',
    loadComponent: () =>
      import('./features/public/plan-acces/plan-acces.component').then(
        (m) => m.PlanAccesComponent
      ),
  },
  {
    path: 'politique-confidentialite',
    loadComponent: () =>
      import(
        './features/public/politique-confidentialite/politique-confidentialite.component'
      ).then((m) => m.PolitiqueConfidentialiteComponent),
  },
  {
    path: 'mentions-legales',
    loadComponent: () =>
      import(
        './features/public/mentions-legales/mentions-legales.component'
      ).then((m) => m.MentionsLegalesComponent),
  },
  {
    path: 'cgv-statuts',
    loadComponent: () =>
      import('./features/public/cgv-statuts/cgv-statuts.component').then(
        (m) => m.CgvStatutsComponent
      ),
  },

  // Auth routes
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent),
  },

  // Backoffice routes (protected)
  {
    path: 'backoffice',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/backoffice/backoffice-layout/backoffice-layout.component'
      ).then((m) => m.BackofficeLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/backoffice/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import(
            './features/backoffice/pages/home-editor/home-editor.component'
          ).then((m) => m.HomeEditorComponent),
      },
      {
        path: 'actualites',
        loadComponent: () =>
          import(
            './features/backoffice/pages/actualites-manager/actualites-manager.component'
          ).then((m) => m.ActualitesManagerComponent),
      },
      {
        path: 'concerts',
        loadComponent: () =>
          import(
            './features/backoffice/pages/concerts-manager/concerts-manager.component'
          ).then((m) => m.ConcertsManagerComponent),
      },
      {
        path: 'agenda',
        loadComponent: () =>
          import(
            './features/backoffice/pages/agenda-editor/agenda-editor.component'
          ).then((m) => m.AgendaEditorComponent),
      },
      {
        path: 'pages/:pageId',
        loadComponent: () =>
          import(
            './features/backoffice/pages/page-editor/page-editor.component'
          ).then((m) => m.PageEditorComponent),
      },
    ],
  },

  // Redirect unknown routes
  {
    path: '**',
    redirectTo: '',
  },
];
