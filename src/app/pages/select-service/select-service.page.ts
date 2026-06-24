import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonButton, IonIcon, IonProgressBar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, ellipseOutline, arrowForwardOutline } from 'ionicons/icons';
import { AppointmentService } from '../../services/appointment.service';
import { ServiceType } from '../../models/appointment.model';

interface ServiceOption {
  id: ServiceType;
  label: string;
  description: string;
  emoji: string;
  chipClass: string;
}

@Component({
  selector: 'app-select-service',
  templateUrl: 'select-service.page.html',
  styleUrls: ['select-service.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonButton, IonIcon, IonProgressBar,
  ],
})
export class SelectServicePage {

  services: ServiceOption[] = [
    { id: 'Baño',           label: 'Baño',           description: 'Limpieza completa e hidratación del pelaje', emoji: '🛁', chipClass: 'chip-bano' },
    { id: 'Peluquería',     label: 'Peluquería',     description: 'Corte, estilizado y arreglo profesional',    emoji: '✂️', chipClass: 'chip-peluqueria' },
    { id: 'Corte de uñas',  label: 'Corte de uñas',  description: 'Lima y recorte seguro de uñas',               emoji: '💅', chipClass: 'chip-unas' },
  ];

  selected: ServiceType | null = null;

  constructor(
    private router: Router,
    private appointmentSvc: AppointmentService,
  ) {
    addIcons({ checkmarkCircle, ellipseOutline, arrowForwardOutline });
    // Restaurar selección del draft si existe
    const draft = this.appointmentSvc.getDraft();
    if (draft.service) this.selected = draft.service;
  }

  select(service: ServiceType): void {
    this.selected = service;
  }

  continuar(): void {
    if (!this.selected) return;
    this.appointmentSvc.setDraft({ service: this.selected });
    this.router.navigate(['/select-datetime']);
  }
}
