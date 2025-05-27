import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lamp-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lamp-view.component.html',
  styleUrl: './lamp-view.component.css'
})
export class LampViewComponent {
  isActive: boolean = true;
  brightness: number = 70;

  toggleSwitch() {
    this.isActive = !this.isActive;
    // Vous pouvez ajouter ici la logique pour gérer l'état de la lampe
  }

}
