// src/feature/pages/payment/securePaymentPage.tsx
import {
  Shield,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
} from "lucide-react";
import Footer from "../../../components/layout/Footer";

const SecurePaymentPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-linear-to-r from-green-900 to-green-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Secure Payment Methods
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Safe, fast, and convenient payment options for your Brilliance
            orders
          </p>
        </div>
      </section>

      {/* PayShap Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex items-center justify-center mb-8">
              <img
                src="/images/pics/payshap.webp"
                alt="PayShap"
                className="h-24 w-auto"
              />
            </div>

            <h2 className="text-3xl font-bold text-center mb-6">
              PayShap Instant Payments
            </h2>

            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                <strong>PayShap Request</strong> is a PayShap service that lets
                you send or accept instant payment requests from anyone,
                regardless of their bank. Pay or get paid instantly using our
                app — no awkward reminders needed.
              </p>

              <p className="text-lg leading-relaxed">
                Simply use a cellphone number (ShapID) to settle bills with
                friends, family, or businesses. You can also accept payment
                requests sent to you using PayShap Request.
              </p>
            </div>

            {/* PayShap Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <Smartphone className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-lg mb-2">Easy</h3>
                <p className="text-sm text-gray-600">
                  Make and receive payments using a verified cellphone number
                  (ShapID)
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-lg mb-2">Safe</h3>
                <p className="text-sm text-gray-600">
                  Reduces the need for cash and is available on our app
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-lg mb-2">Instant</h3>
                <p className="text-sm text-gray-600">
                  Once accepted, PayShap Request payments reflect immediately
                </p>
              </div>
            </div>

            {/* How to Use */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-center">
                How to Send or Receive a PayShap Request
              </h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                  <span className="text-gray-700 pt-1">Tap Transact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                  <span className="text-gray-700 pt-1">Choose PayShap</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                  <span className="text-gray-700 pt-1">
                    Tap Request a Payment to send or accept a PayShap Request
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </span>
                  <span className="text-gray-700 pt-1">
                    Follow the on-screen prompts
                  </span>
                </li>
              </ol>
            </div>

            {/* Supported Banks */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold mb-4">
                Supported by Major Banks
              </h3>
              <div className="flex justify-center items-center gap-6 flex-wrap">
                <img
                  src="/images/pics/Payshap banks.webp"
                  alt="Supported Banks"
                  className="h-16 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="text-center my-12">
            <p className="text-4xl font-black text-gray-400">OR</p>
          </div>

          {/* EFT Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-8">
              <Building2 className="w-16 h-16 text-blue-600" />
            </div>

            <h2 className="text-3xl font-bold text-center mb-6">
              Electronic Funds Transfer (EFT)
            </h2>

            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed text-center">
                You can also pay via direct bank transfer (EFT). Once you place
                your order, we'll send you our banking details via WhatsApp.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mt-8">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  EFT Payment Process:
                </h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">1.</span>
                    <span>Place your order via WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">2.</span>
                    <span>Receive banking details from Brilliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">3.</span>
                    <span>Make payment using your banking app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">4.</span>
                    <span>Send proof of payment via WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">5.</span>
                    <span>
                      Your order will be processed once payment is confirmed
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-green-600">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-green-600 shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Your Payment is Secure
                </h3>
                <p className="text-gray-600">
                  We never store your banking information. All payments are
                  processed securely through trusted South African banking
                  systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SecurePaymentPage;
