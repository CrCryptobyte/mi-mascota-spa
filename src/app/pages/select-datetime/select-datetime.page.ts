import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonButton, IonIcon, IonProgressBar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline, timeOutline, arrowForwardOutline } from 'ionicons/icons';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-select-datetime',
  templateUrl: 'select-datetime.page.html',
  styleUrls: ['select-datetime.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonButton, IonIcon, IonProgressBar,
  ],
})
export class SelectDatetimePage implements OnInit {

  // ── Calendario ────────────────────────────────
  today        = new Date();
  currentMonth!: Date;
  calendarDays!: (Date | null)[];
  weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  selectedDate: string | null = null;
  selectedTime: string | null = null;
  availableSlots: string[]    = [];

  constructor(
    private router: Router,
    private appointmentSvc: AppointmentService,
  ) {
    addIcons({ chevronBackOutline, chevronForwardOutline, timeOutline, arrowForwardOutline });
  }

  ngOnInit(): void {
    this.currentMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.buildCalendar();

    const draft = this.appointmentSvc.getDraft();
    if (draft.date) {
      this.selectedDate  = draft.date;
      this.selectedTime  = draft.time ?? null;
      this.availableSlots = this.appointmentSvc.getAvailableSlots(draft.date);
    }
  }

  // ── Navegación de mes ─────────────────────────
  prevMonth(): void {
    const d = new Date(this.currentMonth);
    d.setMonth(d.getMonth() - 1);
    if (d >= new Date(this.today.getFullYear(), this.today.getMonth(), 1)) {
      this.currentMonth = d;
      this.buildCalendar();
    }
  }

  nextMonth(): void {
    const d = new Date(this.currentMonth);
    d.setMonth(d.getMonth() + 1);
    this.currentMonth = d;
    this.buildCalendar();
  }

  get monthLabel(): string {
    return this.currentMonth.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
  }

  buildCalendar(): void {
    const year  = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const first = new Date(year, month, 1);
    const last  = new Date(year, month + 1, 0);

    // Lunes = 0 … Domingo = 6
    let startDow = first.getDay() - 1;
    if (startDow < 0) startDow = 6;

    this.calendarDays = [];
    for (let i = 0; i < startDow; i++) this.calendarDays.push(null);
    for (let d = 1; d <= last.getDate(); d++) {
      this.calendarDays.push(new Date(year, month, d));
    }
  }

  isToday(d: Date): boolean {
    return d.toDateString() === this.today.toDateString();
  }

  isPast(d: Date): boolean {
    const midnight = new Date(this.today); midnight.setHours(0,0,0,0);
    return d < midnight;
  }

  isWeekend(d: Date): boolean {
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isAvailableDay(d: Date): boolean {
    if (this.isPast(d) || this.isWeekend(d)) return false;
    const str = this.toDateStr(d);
    return this.appointmentSvc.getAvailableSlots(str).length > 0;
  }

  isSelectedDate(d: Date): boolean {
    return this.toDateStr(d) === this.selectedDate;
  }

  selectDate(d: Date | null): void {
    if (!d || !this.isAvailableDay(d)) return;
    this.selectedDate  = this.toDateStr(d);
    this.selectedTime  = null;
    this.availableSlots = this.appointmentSvc.getAvailableSlots(this.selectedDate);
  }

  selectTime(t: string): void {
    this.selectedTime = t;
  }

  continuar(): void {
    if (!this.selectedDate || !this.selectedTime) return;
    this.appointmentSvc.setDraft({ date: this.selectedDate, time: this.selectedTime });
    this.router.navigate(['/client-data']);
  }

  private toDateStr(d: Date): string {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  formatDisplayDate(str: string): string {
    if (!str) return '';
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
  }
}
