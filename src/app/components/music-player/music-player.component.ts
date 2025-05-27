import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

interface Song {
  src: string;
  cover: string;
}

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css'
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  private audio: HTMLAudioElement | null = null;
  private songs: Song[] = [
    { src: '/music/Rahma.mp3', cover: '/music/cover.png' },
    { src: '/music/Hero.mp3', cover: '/music/cover.png' },
    { src: '/music/Désolé Mama.mp3', cover: '/music/cover.png' },
    { src: '/music/Je t\'aime.mp3', cover: '/music/cover.png' },
    { src: '/music/Bleu demain.mp3', cover: '/music/cover.png' },
    { src: '/music/Le poison.mp3', cover: '/music/cover.png' },
    { src: '/music/Tu me verras.mp3', cover: '/music/cover.png' },
    { src: '/music/Dernière pluie.mp3', cover: '/music/cover.png' },
    { src: '/music/Déviant.mp3', cover: '/music/cover.png' },
    { src: '/music/Magicien.mp3', cover: '/music/cover.png' },
    { src: '/music/Les jolies filles.mp3', cover: '/music/cover.png' },
    { src: '/music/La vie est belle.mp3', cover: '/music/cover.png' },
    { src: '/music/Une balle qui touche le ciel.mp3', cover: '/music/cover.png' },
    { src: '/music/L\'endroit où je suis né.mp3', cover: '/music/cover.png' },
    { src: '/music/Beretta.mp3', cover: '/music/cover.png' }
  ];
  private currentSongIndex: number = 0;
  
  isPlaying: boolean = true;
  currentTime: string = '0:00';
  duration: string = '0:00';
  progress: number = 0;
  isShuffled: boolean = false;
  currentCover: string = '/music/cover.png';
  isTransitioning: boolean = false;
  isSpinning: boolean = false;
  isActive: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
      this.audio.src = this.songs[this.currentSongIndex].src;
      this.audio.preload = 'auto';
    }
  }

  ngOnInit() {
    if (this.audio) {
      this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
      this.audio.addEventListener('loadedmetadata', this.updateDuration.bind(this));
      this.audio.addEventListener('ended', this.onSongEnd.bind(this));
      this.audio.addEventListener('error', (e) => console.error('Audio error:', e));
    }
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
      this.audio.removeEventListener('timeupdate', this.updateProgress.bind(this));
      this.audio.removeEventListener('loadedmetadata', this.updateDuration.bind(this));
      this.audio.removeEventListener('ended', this.onSongEnd.bind(this));
    }
  }

  async togglePlay() {
    if (!this.audio) return;
    
    try {
      if (this.isPlaying) {
        await this.audio.pause();
      } else {
        await this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    } catch (error) {
      console.error('Error toggling play:', error);
    }
  }

  async skipForward() {
    if (!this.audio) return;
    
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
    await this.loadAndPlaySong();
  }

  async skipBackward() {
    if (!this.audio) return;
    
    this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
    await this.loadAndPlaySong();
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
  }

  toggleSwitch() {
    this.isActive = !this.isActive;
    // Vous pouvez ajouter ici la logique pour gérer l'état du switch
    // Par exemple, activer/désactiver le haut-parleur
  }

  private async loadAndPlaySong() {
    if (!this.audio) return;
    
    try {
      this.isTransitioning = true;
      this.isSpinning = true;
      
      // Attendre que l'animation de rotation soit terminée
      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.audio.src = this.songs[this.currentSongIndex].src;
      this.currentCover = this.songs[this.currentSongIndex].cover;
      await this.audio.load();
      
      if (this.isPlaying) {
        await this.audio.play();
      }
      
      // Attendre que la transition soit terminée
      await new Promise(resolve => setTimeout(resolve, 300));
      this.isTransitioning = false;
      this.isSpinning = false;
    } catch (error) {
      console.error('Error loading song:', error);
      this.isTransitioning = false;
      this.isSpinning = false;
    }
  }

  private updateProgress() {
    if (!this.audio) return;
    
    const current = this.audio.currentTime;
    const duration = this.audio.duration;
    this.progress = (current / duration) * 100;
    this.currentTime = this.formatTime(current);
  }

  private updateDuration() {
    if (!this.audio) return;
    
    this.duration = this.formatTime(this.audio.duration);
  }

  private formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  private onSongEnd() {
    if (this.isShuffled) {
      this.currentSongIndex = Math.floor(Math.random() * this.songs.length);
    } else {
      this.skipForward();
    }
  }
}
