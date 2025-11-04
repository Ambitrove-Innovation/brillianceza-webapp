"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  CheckCircle,
  Loader2,
  Instagram,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Footer from "../../../components/layout/Footer";
import { sendContactMessage } from "../../../utils/whatsappService";

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
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
        { publicKey }
      );

      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } catch (err) {
      alert("Error: " + JSON.stringify(err));
      setLoading(false);
    }
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    sendContactMessage(formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Split Section (Black & White) */}
      <section className="flex flex-col md:flex-row min-h-screen">
        {/* Left: Info / Black Side */}
        <div className="md:w-1/2 bg-black text-white flex flex-col justify-center px-8 py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-black via-neutral-900 to-gray-800 opacity-90"></div>
          <div className="relative z-10 max-w-lg mx-auto text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Let’s Create{" "}
              <span className="text-gray-400">Something Brilliant</span>
            </h1>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Whether you’re asking about your order, our collections, or
              collaboration — we’re always here to connect.
            </p>

            <div className="space-y-6 text-gray-200">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-6 h-6 text-white" />
                <a
                  href="mailto:brilliance.clothing.za@gmail.com"
                  className="hover:underline text-sm">
                  brilliance.clothing.za@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-6 h-6 text-white" />
                <a href="tel:0686311388" className="hover:underline text-sm">
                  068 631 1388
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex justify-center md:justify-start gap-6 mt-10">
              <a
                href="https://www.instagram.com/brilliance_za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition">
                <Instagram size={28} />
              </a>
              <a
                href="https://www.tiktok.com/@brilliance_za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Form / White Side */}
        <div className="md:w-1/2 bg-white text-black flex items-center justify-center px-8 py-20 md:py-32">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
              Send Us a Message
            </h2>

            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:outline-none"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:outline-none"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:outline-none resize-none"
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="flex-1 bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" /> Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Email
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition">
                  <Phone className="w-5 h-5" /> WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;