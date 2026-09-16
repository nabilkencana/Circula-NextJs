export interface RegisterAdminBankPayload {
  namaUnit: string;
  namaPengelola: string;
  telp: string;
  username: string;
  password: string;
  confirmPassword: string;
  setujuKetentuan: boolean;
}

export interface RegisterAdminBankResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    username: string;
    role: 'ADMIN';
    adminBank: {
      id: string;
      namaUnit: string;
      namaPengelola: string;
      telp: string;
    };
    token?: string;
    createdAt: string;
  };
}
