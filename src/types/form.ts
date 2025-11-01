export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type NotificationType = "success" | "error" | "info" | "warning";
