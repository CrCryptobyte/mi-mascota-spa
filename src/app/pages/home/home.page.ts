import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonButton, IonIcon,
  IonCard, IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, settingsOutline, pawOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, IonCard, IonCardContent],
})
export class HomePage {

  constructor(private router: Router) {
    addIcons({ calendarOutline, settingsOutline, pawOutline });
  }

  goAgendarCita(): void {
    this.router.navigate(['/select-service']);
  }

  goAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
