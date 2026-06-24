// ─── MODELOS DE DOMINIO — Mi Mascota Spa ────────────────

export type ServiceType = 'Baño' | 'Peluquería' | 'Corte de uñas';
export type PetType    = 'Perro' | 'Gato' | 'Conejo' | 'Otro';
export type AppointmentStatus = 'Confirmada' | 'Modificada' | 'Cancelada';

export interface Appointment {
  id: string;
  service: ServiceType;
  date: string;       // YYYY-MM-DD
  time: string;       // HH:mm
  ownerName: string;
  ownerPhone: string;
  petName: string;
  petType: PetType;
  observations: string;
  status: AppointmentStatus;
  createdAt: string;  // ISO string
}

export interface BookingDraft {
  service?: ServiceType;
  date?: string;
  time?: string;
  ownerName?: string;
  ownerPhone?: string;
  petName?: string;
  petType?: PetType;
  observations?: string;
}
