import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Concert } from '../../../core/models/content.model';

@Component({
  selector: 'app-concert-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './concert-card.component.html',
  styleUrls: ['./concert-card.component.scss'],
})
export class ConcertCardComponent {
  @Input() concert!: Concert;
  @Input() compact: boolean = false;
}
