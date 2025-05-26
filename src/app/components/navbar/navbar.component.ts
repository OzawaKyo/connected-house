import { Component } from '@angular/core';
import { NavIconComponent, NavIconType } from '../nav-icon/nav-icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavIconComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Vous pouvez ajouter des propriétés et méthodes ici
  isMenuOpen = false;
  NavIconType = NavIconType; // Make enum available in template

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
} 