import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CamViewComponent } from './components/cam-view/cam-view.component';
import { RoomsViewComponent } from './components/rooms-view/rooms-view.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { LampViewComponent } from './components/lamp-view/lamp-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CamViewComponent, RoomsViewComponent, MusicPlayerComponent, LampViewComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'connected-house';
}
