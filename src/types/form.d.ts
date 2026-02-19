interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

type NotificationType = "success" | "error" | "info" | "warning";
