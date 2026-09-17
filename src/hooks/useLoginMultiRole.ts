"use client";

import { useState, useCallback } from "react";
import { AuthRole, LoginPayload, UserSessionData } from "@/types/auth";
import { loginUser } from "@/services/authService";

export function useLoginMultiRole() {
  const [selectedRole, setSelectedRoleState] = useState<AuthRole>("NASABAH");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginSuccessModalOpen, setLoginSuccessModalOpen] =
    useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<UserSessionData | null>(null);

  const setSelectedRole = useCallback((role: AuthRole) => {
    setSelectedRoleState(role);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.submit;
      return next;
    });
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleRememberMeToggle = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);

  const handleInputChange = useCallback(
    (field: "username" | "password", value: string) => {
      if (field === "username") {
        setUsername(value.toLowerCase().replace(/\s+/g, ""));
      } else {
        setPassword(value);
      }

      if (errors[field] || errors.submit) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          delete next.submit;
          return next;
        });
      }
    },
    [errors]
  );

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = "Username atau ID pengguna wajib diisi.";
    } else if (username.trim().length < 3) {
      newErrors.username = "Username minimal 3 karakter.";
    }

    if (!password) {
      newErrors.password = "Kata sandi wajib diisi.";
    } else if (password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [username, password]);

  const handleLoginSubmit = useCallback(
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

      setIsLoading(true);

      try {
        const payload: LoginPayload = {
          username: username.trim(),
          password,
          role: selectedRole,
          rememberMe,
        };

        const res = await loginUser(payload);
        if (res.success && res.data?.user) {
          setLoggedInUser(res.data.user);
          setLoginSuccessModalOpen(true);
        } else {
          setErrors({
            submit: res.message || "Kombinasi username atau kata sandi tidak valid.",
          });
        }
      } catch (err) {
        console.error("Login submission error:", err);
        const apiMsg = err instanceof Error ? err.message : "";
        setErrors({
          submit: apiMsg || "Terjadi gangguan jaringan. Silakan coba beberapa saat lagi.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [validate, username, password, selectedRole, rememberMe, errors]
  );

  const closeSuccessModal = useCallback(() => {
    setLoginSuccessModalOpen(false);
  }, []);

  return {
    selectedRole,
    username,
    password,
    rememberMe,
    showPassword,
    errors,
    isLoading,
    loginSuccessModalOpen,
    loggedInUser,
    setSelectedRole,
    toggleShowPassword,
    handleRememberMeToggle,
    handleInputChange,
    handleLoginSubmit,
    closeSuccessModal,
  };
}
