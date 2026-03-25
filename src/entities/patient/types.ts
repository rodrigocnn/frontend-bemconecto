export interface Patient {
  id?: string;
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  rg?: string;
  gender?: string;
  birthDate: string;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: number;
}
