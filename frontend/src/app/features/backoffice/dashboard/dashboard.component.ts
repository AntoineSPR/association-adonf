import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  stats = [
    { label: 'Actualités', value: 12, icon: 'news' },
    { label: 'Concerts', value: 25, icon: 'music' },
    { label: 'Événements à venir', value: 8, icon: 'calendar' },
    { label: 'Pages', value: 15, icon: 'pages' },
  ];
}
