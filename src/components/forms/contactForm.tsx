import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, LoaderCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    const serviceID = import.meta.env.VITE_SERVICE_ID!;
    const templateID = import.meta.env.VITE_TEMPLATE_ID!;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY!;

    try {

      await emailjs.send(
        serviceID,
        templateID,
        {
          subject: formData.subject,
          name: formData.name,
          email: formData.email,
          number: formData.phone,
          message: formData.message,
        },
        {
          publicKey: publicKey,
        },
      );

      setSubmitted(true);
      setLoading(false);

    } catch (err) {

      alert("Error: " + JSON.stringify(err));
      setSubmitted(false);

    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <></>
  );
};

export default ContactPage;