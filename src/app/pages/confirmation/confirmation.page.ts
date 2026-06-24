import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, homeOutline, calendarOutline } from 'ionicons/icons';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: 'confirmation.page.html',
  styleUrls: ['confirmation.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonButton, IonIcon,
  ],
})
export class ConfirmationPage implements OnInit {

  appointment: Appointment | null = null;

  constructor(private router: Router, private appointmentSvc: AppointmentService) {
    addIcons({ checkmarkCircle, homeOutline, calendarOutline });
  }

  ngOnInit(): void {
    const nav = history.state;
    if (nav?.appointmentId) {
      this.appointment = this.appointmentSvc.getById(nav.appointmentId) ?? null;
    }
    if (!this.appointment) this.router.navigate(['/home']);
  }

  get formattedDate(): string {
    if (!this.appointment) return '';
    const [y, m, d] = this.appointment.date.split('-');
    return `${d}/${m}/${y}`;
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  newAppointment(): void {
    this.router.navigate(['/select-service']);
  }
}
