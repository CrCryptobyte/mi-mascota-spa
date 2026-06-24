import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonButton, IonIcon, IonBadge,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea,
  AlertController, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  createOutline, trashOutline, calendarOutline, timeOutline,
  pawOutline, personOutline, checkmarkCircleOutline, closeCircleOutline,
} from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonButton, IonIcon, IonBadge,
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea,
  ],
})
export class AdminPage implements OnInit, OnDestroy {

  appointments: Appointment[] = [];
  editMode: string | null = null;   // id de cita en edición
  editData: Partial<Appointment> = {};

  private sub!: Subscription;

  // Slots para el select de edición
  timeSlots = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00'];
  serviceTypes = ['Baño', 'Peluquería', 'Corte de uñas'];

  constructor(
    private appointmentSvc: AppointmentService,
    private alertCtrl: AlertController,
  ) {
    addIcons({
      createOutline, trashOutline, calendarOutline, timeOutline,
      pawOutline, personOutline, checkmarkCircleOutline, closeCircleOutline,
    });
  }

  ngOnInit(): void {
    // RF10 — suscribirse al observable para reactualizar en tiempo real
    this.sub = this.appointmentSvc.appointments$.subscribe((list) => {
      this.appointments = list.filter(a => a.status !== 'Cancelada');
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get total(): number { return this.appointments.length; }

  formatDate(str: string): string {
    if (!str) return '';
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
  }

  serviceClass(svc: string): string {
    if (svc === 'Baño')         return 'chip-bano';
    if (svc === 'Peluquería')   return 'chip-peluqueria';
    if (svc === 'Corte de uñas') return 'chip-unas';
    return '';
  }

  // ── RF11 — Editar cita ──────────────────────────────
  startEdit(appt: Appointment): void {
    this.editMode = appt.id;
    this.editData = { ...appt };
  }

  cancelEdit(): void {
    this.editMode = null;
    this.editData = {};
  }

  async saveEdit(): Promise<void> {
    if (!this.editMode) return;
    const ok = this.appointmentSvc.updateAppointment(this.editMode, this.editData);
    if (ok) {
      this.editMode = null;
      this.editData = {};
    } else {
      const alert = await this.alertCtrl.create({
        header:  'Horario no disponible',
        message: 'El nuevo horario seleccionado ya está reservado. Elige otro.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }

  // ── RF12 — Cancelar cita ─────────────────────────────
  async cancelAppointment(appt: Appointment): Promise<void> {
    const alert = await this.alertCtrl.create({
      header:  'Cancelar cita',
      message: `¿Está seguro de que desea cancelar la cita de ${appt.petName}?`,
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Sí, cancelar',
          role: 'destructive',
          handler: () => this.appointmentSvc.cancelAppointment(appt.id),
        },
      ],
    });
    await alert.present();
  }
}
