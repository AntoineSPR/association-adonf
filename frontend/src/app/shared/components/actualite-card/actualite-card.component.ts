import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Actualite } from '../../../core/models/content.model';

@Component({
  selector: 'app-actualite-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actualite-card.component.html',
  styleUrls: ['./actualite-card.component.scss'],
})
export class ActualiteCardComponent {
  @Input() actualite!: Actualite;
  @Input() featured: boolean = false;
}
