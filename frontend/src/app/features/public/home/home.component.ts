import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicLayoutComponent } from '../../../shared/components/public-layout/public-layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PublicLayoutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  actualites = [
    {
      id: 1,
      title: 'Actualité exemple 1',
      image: 'assets/images/placeholder.jpg',
      excerpt: 'Découvrez notre nouvelle programmation...',
    },
    {
      id: 2,
      title: 'Actualité exemple 2',
      image: 'assets/images/placeholder.jpg',
      excerpt: 'Les inscriptions sont ouvertes...',
    },
  ];

  programmation = [
    {
      id: 1,
      name: 'Concert exemple',
      date: new Date('2025-12-01'),
      image: 'assets/images/placeholder.jpg',
      status: null,
    },
    {
      id: 2,
      name: 'Événement exemple',
      date: new Date('2025-12-15'),
      image: 'assets/images/placeholder.jpg',
      status: 'COMPLET',
    },
  ];
}
