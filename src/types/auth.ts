export type AuthRole = 'NASABAH' | 'ADMIN';

export interface RegisterNasabahPayload {
  namaLengkap: string;
  username: string;
  nomorWhatsapp: string;
  alamatLengkap: string;
  password: string;
  confirmPassword: string;
  fotoProfil?: File | null;
  setujuKetentuan: boolean;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    username: string;
    namaLengkap: string;
    role: 'NASABAH';
    createdAt: string;
  };
}

export interface LoginPayload {
  username: string;
  password: string;
  role: AuthRole;
  rememberMe: boolean;
}

export interface UserSessionData {
  id: string;
  username: string;
  role: AuthRole;
  namaLengkap?: string;
  adminBank?: {
    id: string;
    namaUnit: string;
    namaPengelola: string;
    telp: string;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: UserSessionData;
  };
}
