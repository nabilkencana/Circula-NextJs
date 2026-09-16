"use client";

import { useState, useCallback } from "react";
import {
  RegisterAdminBankPayload,
  RegisterAdminBankResponse,
} from "@/types/adminAuth";
import { registerAdminBank } from "@/services/adminAuthService";

const INITIAL_FORM_STATE: RegisterAdminBankPayload = {
  namaUnit: "",
  namaPengelola: "",
  telp: "",
  username: "",
  password: "",
  confirmPassword: "",
  setujuKetentuan: false,
};

export function useRegisterAdminUnit() {
  const [formData, setFormData] =
    useState<RegisterAdminBankPayload>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] =
    useState<boolean>(false);
  const [registeredData, setRegisteredData] = useState<
    RegisterAdminBankResponse["data"] | null
  >(null);

  const handleInputChange = useCallback(
    (field: keyof RegisterAdminBankPayload, value: string | boolean) => {
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === "username" && typeof value === "string"
            ? value.toLowerCase().replace(/\s+/g, "")
            : value,
      }));

      // Clear error on change
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.namaUnit.trim()) {
      newErrors.namaUnit = "Nama unit bank sampah wajib diisi.";
    } else if (formData.namaUnit.trim().length < 5) {
      newErrors.namaUnit =
        "Nama unit minimal 5 karakter (cth. Bank Sampah Asri Jaya RW 05).";
    }

    if (!formData.namaPengelola.trim()) {
      newErrors.namaPengelola = "Nama penanggung jawab wajib diisi.";
    } else if (formData.namaPengelola.trim().length < 3) {
      newErrors.namaPengelola = "Nama penanggung jawab minimal 3 karakter.";
    }

    const cleanTelp = formData.telp.replace(/\D/g, "");
    if (!formData.telp.trim()) {
      newErrors.telp = "Nomor kontak operasional wajib diisi.";
    } else if (cleanTelp.length < 8 || cleanTelp.length > 15) {
      newErrors.telp =
        "Nomor kontak tidak valid (minimal 8 digit numerik).";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username akun admin unit wajib diisi.";
    } else if (formData.username.trim().length < 4) {
      newErrors.username = "Username minimal 4 karakter.";
    } else if (!/^[a-z0-9_.]+$/.test(formData.username.trim())) {
      newErrors.username =
        "Hanya huruf kecil, angka, garis bawah (_), dan titik (.).";
    }

    if (!formData.password) {
      newErrors.password = "Kata sandi wajib diisi.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi kata sandi wajib diisi.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Kata sandi dan konfirmasi tidak cocok.";
    }

    if (!formData.setujuKetentuan) {
      newErrors.setujuKetentuan =
        "Anda harus menyatakan kesiapan timbangan terkalibrasi dan kepatuhan SOP 3R.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (!validate()) {
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
          const el = document.getElementById(firstErrorKey);
          if (el) el.focus();
        }
        return;
      }

      setIsSubmitting(true);

      try {
        const res = await registerAdminBank(formData);
        if (res.success && res.data) {
          setRegisteredData(res.data);
          setIsSuccessModalOpen(true);
        } else {
          setErrors({ submit: res.message || "Gagal melakukan pendaftaran." });
        }
      } catch (err) {
        console.error("Admin registration error:", err);
        setErrors({
          submit:
            "Terjadi gangguan koneksi. Silakan coba lagi beberapa saat lagi.",
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
    showPassword,
    showConfirmPassword,
    isSubmitting,
    isSuccessModalOpen,
    registeredData,
    handleInputChange,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
    closeSuccessModal,
  };
}
