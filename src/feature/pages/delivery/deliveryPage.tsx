import { Truck, Package, Clock, MapPin, CheckCircle } from "lucide-react";
import Footer from "../../../components/layout/Footer";

const DeliveryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-linear-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <Truck className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Delivery Information
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Fast, reliable delivery across South Africa. Your style delivered to
            your doorstep.
          </p>
        </div>
      </section>

      {/* Delivery Details */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Free Delivery */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Free Delivery
            </h3>
            <p className="text-gray-600 text-center">
              Enjoy free delivery on all orders over <strong>R500</strong>. Shop
              more, save more!
            </p>
          </div>

          {/* Delivery Time */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Processing Time
            </h3>
            <p className="text-gray-600 text-center">
              Orders are processed within <strong>2-3 business days</strong>.
              You'll receive tracking information via WhatsApp.
            </p>
          </div>

          {/* Delivery Coverage */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 mx-auto">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Nationwide Coverage
            </h3>
            <p className="text-gray-600 text-center">
              We deliver to all major cities and towns across South Africa via
              trusted courier services.
            </p>
          </div>

          {/* Secure Packaging */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6 mx-auto">
              <Package className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Secure Packaging
            </h3>
            <p className="text-gray-600 text-center">
              All items are carefully packaged to ensure they arrive in perfect
              condition.
            </p>
          </div>

          {/* Tracking */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 mx-auto">
              <Truck className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Track Your Order
            </h3>
            <p className="text-gray-600 text-center">
              Receive real-time tracking updates via WhatsApp once your order
              ships.
            </p>
          </div>

          {/* Customer Support */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6 mx-auto">
              <CheckCircle className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              24/7 Support
            </h3>
            <p className="text-gray-600 text-center">
              Have questions about your delivery? Contact us anytime via
              WhatsApp or email.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">
                How long does delivery take?
              </h3>
              <p className="text-gray-600">
                Standard delivery takes 5-7 business days after processing.
                Major cities may receive orders faster.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">
                Do you deliver to my area?
              </h3>
              <p className="text-gray-600">
                We deliver nationwide across South Africa. If you're unsure,
                contact us via WhatsApp with your area code.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">
                What if my order is delayed?
              </h3>
              <p className="text-gray-600">
                In rare cases of delays, we'll notify you immediately via
                WhatsApp. You can also track your order using the provided
                tracking number.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">
                Can I change my delivery address?
              </h3>
              <p className="text-gray-600">
                Yes, but only before your order ships. Contact us immediately
                via WhatsApp if you need to update your address.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeliveryPage;
