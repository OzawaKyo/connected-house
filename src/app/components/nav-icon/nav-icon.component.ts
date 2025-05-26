import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum NavIconType {
  DASHBOARD = 'dashboard',
  LAMP = 'lamp',
  MUSIC = 'music',
  THERMOMETER = 'thermometer',
  SHIELD = 'shield',
  BELL = 'bell',
  BOLT = 'bolt',
  PROFILE = 'profile'
}

@Component({
  selector: 'app-nav-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-icon.component.html',
  styleUrls: ['./nav-icon.component.css']
})
export class NavIconComponent {
  @Input() iconType: NavIconType = NavIconType.DASHBOARD;
  NavIconType = NavIconType; // Make enum available in template
}
