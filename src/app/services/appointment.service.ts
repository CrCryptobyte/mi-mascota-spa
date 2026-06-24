import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Appointment,
  BookingDraft,
  ServiceType,
} from '../models/appointment.model';

const STORAGE_KEY  = 'mms_appointments';
const DRAFT_KEY    = 'mms_draft';

/** Horarios disponibles por defecto */
const DEFAULT_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00',
];

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  // ── Observable de citas para reactividad ─────────────
  private _appointments$ = new BehaviorSubject<Appointment[]>(this.load());
  readonly appointments$ = this._appointments$.asObservable();

  // ── Borrador de agendamiento en curso ─────────────────
  private _draft: BookingDraft = {};

  // ═══════════════════════════════════════════════════
  // DRAFT (flujo de agendamiento)
  // ═══════════════════════════════════════════════════

  setDraft(partial: Partial<BookingDraft>): void {
    this._draft = { ...this._draft, ...partial };
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(this._draft));
  }

  getDraft(): BookingDraft {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (raw) this._draft = JSON.parse(raw);
    return this._draft;
  }

  clearDraft(): void {
    this._draft = {};
    sessionStorage.removeItem(DRAFT_KEY);
  }

  // ═══════════════════════════════════════════════════
  // HORARIOS
  // ═══════════════════════════════════════════════════

  /** Devuelve los slots libres para una fecha dada (RF03, RF04, RF06, RF07) */
  getAvailableSlots(date: string): string[] {
    const taken = this._appointments$.value
      .filter((a) => a.date === date && a.status !== 'Cancelada')
      .map((a) => a.time);
    return DEFAULT_SLOTS.filter((s) => !taken.includes(s));
  }

  /** Verifica si un slot puntual sigue libre (RF06) */
  isSlotAvailable(date: string, time: string): boolean {
    return this.getAvailableSlots(date).includes(time);
  }

  // ═══════════════════════════════════════════════════
  // CRUD CITAS
  // ═══════════════════════════════════════════════════

  /** RF08 — Registrar cita */
  createAppointment(draft: Required<BookingDraft>): Appointment | null {
    if (!this.isSlotAvailable(draft.date, draft.time)) return null;

    const appt: Appointment = {
      id:           this.generateId(),
      service:      draft.service as ServiceType,
      date:         draft.date,
      time:         draft.time,
      ownerName:    draft.ownerName,
      ownerPhone:   draft.ownerPhone,
      petName:      draft.petName,
      petType:      draft.petType,
      observations: draft.observations,
      status:       'Confirmada',
      createdAt:    new Date().toISOString(),
    };

    const updated = [...this._appointments$.value, appt];
    this.save(updated);
    this.clearDraft();
    return appt;
  }

  /** RF10 — Leer todas las citas */
  getAll(): Appointment[] {
    return this._appointments$.value;
  }

  /** Obtener cita por id */
  getById(id: string): Appointment | undefined {
    return this._appointments$.value.find((a) => a.id === id);
  }

  /** RF11 — Modificar cita */
  updateAppointment(id: string, changes: Partial<Appointment>): boolean {
    const list = this._appointments$.value;
    const idx  = list.findIndex((a) => a.id === id);
    if (idx === -1) return false;

    // Si cambia horario, valida disponibilidad
    if (changes.time || changes.date) {
      const newDate = changes.date ?? list[idx].date;
      const newTime = changes.time ?? list[idx].time;
      const slots   = this.getAvailableSlots(newDate);
      // El slot actual no cuenta como ocupado para esta misma cita
      const slotFreeForEdit = slots.includes(newTime) || list[idx].time === newTime;
      if (!slotFreeForEdit) return false;
    }

    const updated = [...list];
    updated[idx]  = { ...updated[idx], ...changes, status: 'Modificada' };
    this.save(updated);
    return true;
  }

  /** RF12 — Cancelar cita */
  cancelAppointment(id: string): boolean {
    const list = this._appointments$.value;
    const idx  = list.findIndex((a) => a.id === id);
    if (idx === -1) return false;

    const updated  = [...list];
    updated[idx]   = { ...updated[idx], status: 'Cancelada' };
    this.save(updated);
    return true;
  }

  // ═══════════════════════════════════════════════════
  // HELPERS PRIVADOS
  // ═══════════════════════════════════════════════════

  private load(): Appointment[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(list: Appointment[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    this._appointments$.next(list);
  }

  private generateId(): string {
    return 'cita_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  }
}
