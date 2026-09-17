"use client";

import { useState, useCallback, useEffect } from "react";
import { RegisterNasabahPayload, RegisterResponse } from "@/types/auth";
import { registerNasabah } from "@/services/authService";

export interface RegisterFormState {
  namaLengkap: string;
  username: string;
  nomorWhatsapp: string;
  alamatLengkap: string;
  password: string;
  confirmPassword: string;
  setujuKetentuan: boolean;
  fotoProfil: File | null;
}

const INITIAL_FORM_STATE: RegisterFormState = {
  namaLengkap: "",
  username: "",
  nomorWhatsapp: "",
  alamatLengkap: "",
  password: "",
  confirmPassword: "",
  setujuKetentuan: false,
  fotoProfil: null,
};

export function useRegisterNasabah() {
  const [formData, setFormData] = useState<RegisterFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [registeredData, setRegisteredData] = useState<RegisterResponse["data"] | null>(null);

  // Clean up avatar preview URL on unmount or change
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "username" ? value.toLowerCase().replace(/\s+/g, "") : value,
      }));

      // Clear field error on change
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors]
  );

  const handleTermsToggle = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      setujuKetentuan: !prev.setujuKetentuan,
    }));
    if (errors.setujuKetentuan) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.setujuKetentuan;
        return next;
      });
    }
  }, [errors.setujuKetentuan]);

  const handleAvatarChange = useCallback((file: File | null) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, fotoProfil: null }));
      setAvatarPreview(null);
      return;
    }

    // Validation: Max 2MB, formats JPG, PNG, WEBP
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        fotoProfil: "Ukuran foto profil maksimal 2MB.",
      }));
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        fotoProfil: "Format foto harus JPG, PNG, atau WEBP.",
      }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.fotoProfil;
      return next;
    });

    setFormData((prev) => ({ ...prev, fotoProfil: file }));
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
  }, []);

  const handleAvatarRemove = useCallback(() => {
    if (avatarPreview && avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setFormData((prev) => ({ ...prev, fotoProfil: null }));
    setAvatarPreview(null);
  }, [avatarPreview]);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = "Nama lengkap wajib diisi.";
    } else if (formData.namaLengkap.trim().length < 3) {
      newErrors.namaLengkap = "Nama lengkap minimal 3 karakter.";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username wajib diisi.";
    } else if (formData.username.trim().length < 4) {
      newErrors.username = "Username minimal 4 karakter.";
    } else if (!/^[a-z0-9_.]+$/.test(formData.username.trim())) {
      newErrors.username = "Hanya huruf kecil, angka, garis bawah (_), dan titik (.).";
    }

    const cleanWa = formData.nomorWhatsapp.replace(/\D/g, "");
    if (!formData.nomorWhatsapp.trim()) {
      newErrors.nomorWhatsapp = "Nomor WhatsApp aktif wajib diisi.";
    } else if (cleanWa.length < 8 || cleanWa.length > 15) {
      newErrors.nomorWhatsapp = "Nomor WhatsApp tidak valid (minimal 9 digit).";
    }

    if (!formData.alamatLengkap.trim()) {
      newErrors.alamatLengkap = "Alamat domisili lengkap wajib diisi.";
    } else if (formData.alamatLengkap.trim().length < 10) {
      newErrors.alamatLengkap = "Alamat domisili terlalu singkat (minimal 10 karakter).";
    }

    if (!formData.password) {
      newErrors.password = "Kata sandi wajib diisi.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Kata sandi minimal 8 karakter.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi kata sandi wajib diisi.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Kata sandi dan konfirmasi tidak cocok.";
    }

    if (!formData.setujuKetentuan) {
      newErrors.setujuKetentuan =
        "Anda harus menyetujui syarat & ketentuan serta privasi data Circula.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (!validate()) {
        // Scroll to first error field
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
          const el = document.getElementById(firstErrorKey);
          if (el) el.focus();
        }
        return;
      }

      setIsSubmitting(true);

      try {
        const payload: RegisterNasabahPayload = {
          namaLengkap: formData.namaLengkap,
          username: formData.username,
          nomorWhatsapp: formData.nomorWhatsapp,
          alamatLengkap: formData.alamatLengkap,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          fotoProfil: formData.fotoProfil,
          setujuKetentuan: formData.setujuKetentuan,
        };

        const res = await registerNasabah(payload);
        if (res.success && res.data) {
          setRegisteredData(res.data);
          setIsSuccessModalOpen(true);
        } else {
          setErrors({ submit: res.message || "Gagal melakukan pendaftaran." });
        }
      } catch (err) {
        console.error("Registration error:", err);
        const apiMsg = err instanceof Error ? err.message : "";
        // Detect x-app-key / App Maker error and show friendly message
        const isAppKeyError =
          apiMsg.toLowerCase().includes("x-app-key") ||
          apiMsg.toLowerCase().includes("app maker") ||
          apiMsg.toLowerCase().includes("ditolak");

        setErrors({
          submit: isAppKeyError
            ? "Sistem belum dikonfigurasi (App Key tidak valid). Silakan hubungi administrator atau gunakan tombol 'Setup App Key' di beranda."
            : apiMsg || "Terjadi gangguan koneksi. Silakan coba lagi beberapa saat lagi.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validate, errors]
  );

  const closeSuccessModal = useCallback(() => {
    setIsSuccessModalOpen(false);
  }, []);

  return {
    formData,
    errors,
    avatarPreview,
    isSubmitting,
    isSuccessModalOpen,
    registeredData,
    handleInputChange,
    handleTermsToggle,
    handleAvatarChange,
    handleAvatarRemove,
    handleSubmit,
    closeSuccessModal,
  };
}
