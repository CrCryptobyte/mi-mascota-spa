import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonButton, IonIcon, IonProgressBar,
  IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption,
  IonNote, AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkOutline, alertCircleOutline } from 'ionicons/icons';
import { AppointmentService } from '../../services/appointment.service';
import { PetType } from '../../models/appointment.model';

@Component({
  selector: 'app-client-data',
  templateUrl: 'client-data.page.html',
  styleUrls: ['client-data.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonButton, IonIcon, IonProgressBar,
    IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonNote,
  ],
})
export class ClientDataPage implements OnInit {

  ownerName    = '';
  ownerPhone   = '';
  petName      = '';
  petType: PetType = 'Perro';
  observations = '';

  petTypes: PetType[] = ['Perro', 'Gato', 'Conejo', 'Otro'];
  submitted  = false;
  isLoading  = false;

  constructor(
    private router: Router,
    private appointmentSvc: AppointmentService,
    private alertCtrl: AlertController,
  ) {
    addIcons({ checkmarkOutline, alertCircleOutline });
  }

  ngOnInit(): void {
    const draft = this.appointmentSvc.getDraft();
    if (draft.ownerName)  this.ownerName  = draft.ownerName;
    if (draft.ownerPhone) this.ownerPhone = draft.ownerPhone;
    if (draft.petName)    this.petName    = draft.petName;
    if (draft.petType)    this.petType    = draft.petType;
    if (draft.observations) this.observations = draft.observations;
  }

  get isFormValid(): boolean {
    return (
      this.ownerName.trim().length >= 3 &&
      this.ownerPhone.trim().length >= 7 &&
      this.petName.trim().length >= 2 &&
      !!this.petType
    );
  }

  async agendar(): Promise<void> {
    this.submitted = true;
    if (!this.isFormValid) return;

    this.isLoading = true;

    // Guardar datos en draft
    this.appointmentSvc.setDraft({
      ownerName:    this.ownerName.trim(),
      ownerPhone:   this.ownerPhone.trim(),
      petName:      this.petName.trim(),
      petType:      this.petType,
      observations: this.observations.trim(),
    });

    const draft = this.appointmentSvc.getDraft();

    // RF06 — Validar disponibilidad antes de registrar
    if (!this.appointmentSvc.isSlotAvailable(draft.date!, draft.time!)) {
      this.isLoading = false;
      await this.showSlotTakenAlert();
      return;
    }

    // RF08 — Registrar cita
    const appt = this.appointmentSvc.createAppointment(draft as any);
    this.isLoading = false;

    if (appt) {
      this.router.navigate(['/confirmation'], { state: { appointmentId: appt.id } });
    } else {
      await this.showErrorAlert();
    }
  }

  private async showSlotTakenAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header:  'Horario ocupado',
      message: 'El horario seleccionado acaba de ser reservado. Por favor elige otro horario.',
      buttons: [{
        text: 'Seleccionar otro horario',
        handler: () => this.router.navigate(['/select-datetime']),
      }],
    });
    await alert.present();
  }

  private async showErrorAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header:  'Error',
      message: 'No fue posible registrar la cita. Intenta nuevamente.',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
