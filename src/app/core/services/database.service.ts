import { Injectable, ChangeDetectionStrategy } from '@angular/core';
import { Database, ref, set, push, update, remove, get, child } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private db: Database) { }

  // ============================
  // 🔸 EMPRESAS
  // ============================

  createBusiness(businessId: string, data: any) {
    return set(ref(this.db, `empresas/${businessId}`), data);
  }

  getBusiness(businessId: string) {
    return get(ref(this.db, `empresas/${businessId}`));
  }

  updateBusiness(businessId: string, data: any) {
    return update(ref(this.db, `empresas/${businessId}`), data);
  }

  deleteBusiness(businessId: string) {
    return remove(ref(this.db, `empresas/${businessId}`));
  }

  // ============================
  // 🔸 USUÁRIOS (dentro da empresa)
  // ============================

  addUserToBusiness(businessId: string, userId: string, data: any) {
    return set(ref(this.db, `empresas/${businessId}/usuarios/${userId}`), data);
  }

  removeUserFromBusiness(businessId: string, userId: string) {
    return remove(ref(this.db, `empresas/${businessId}/usuarios/${userId}`));
  }

  // ============================
  // 🔸 CLIENTES (dentro da empresa)
  // ============================

  addClientIntoBusiness(businessId: string, clientId: string, data: any) {
    return set(ref(this.db, `empresas/${businessId}/clientes/${clientId}`), data);
  }

  updateClientIntoBusiness(businessId: string, clientId: string, data: any) {
    return update(ref(this.db, `empresas/${businessId}/clientes/${clientId}`), data);
  }

  deleteClientIntoBusiness(businessId: string, clientId: string) {
    return remove(ref(this.db, `empresas/${businessId}/clientes/${clientId}`));
  }

  // ============================
  // 🔸 AGENDAMENTOS (dentro da empresa)
  // ============================

  createSchedule(empresaId: string, agendamentoId: string, data: any) {
    const refPath = `empresas/${empresaId}/agendamentos/${agendamentoId}`;
    return set(ref(this.db, refPath), data);
  }

  updateSchedule(businessId: string, appointmentId: string, data: any) {
    return update(ref(this.db, `empresas/${businessId}/agendamentos/${appointmentId}`), data);
  }

  deleteSchedule(businessId: string, appointmentId: string) {
    return remove(ref(this.db, `empresas/${businessId}/agendamentos/${appointmentId}`));
  }

  getSchedule(businessId: string) {
    return get(ref(this.db, `empresas/${businessId}/agendamentos`));
  }

  // ============================
  // 🔸 Clientes
  // ============================

  createClient(clientId: string, data: any) {
    return set(ref(this.db, `clientes/${clientId}`), data);
  }
  
  getClient(clientId: string) {
    return get(ref(this.db, `clientes/${clientId}`));
  }

  updateClientData(clientId: string, data: any) {
    return update(ref(this.db, `clientes/${clientId}`), data);
  }

  deleteClientData(clientId: string) {
    return remove(ref(this.db, `clientes/${clientId}`));
  }

}
