"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = {
      empresa: e.target.empresa.value,
      nombre: e.target.nombre.value,
      email: e.target.email.value,
      mensaje: e.target.mensaje.value,
    };

    try {
      const res = await fetch("../../api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Mensaje enviado con éxito" });
        e.target.reset();
      } else {
        setStatus({ type: "error", message: "Error al enviar el mensaje" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Error de conexión. Inténtalo de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 opacity-90"></div>
        <div className="relative bg-gradient-to-r from-primary-500/20 via-primary-600/20 to-primary-700/20 backdrop-blur-sm rounded-2xl p-8 border border-primary-400/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                Contacta con Nosotros
              </h1>
              <p className="text-xl text-primary-100 font-medium">
                Comparte tus  problemas o sugerencias con nuestro equipo
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Envíanos un Mensaje</h2>
            <p className="text-gray-300">Completa el formulario y nos pondremos en contacto contigo pronto.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  placeholder="Nombre de tu empresa"
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                placeholder="Describe tu consulta, problema o sugerencia..."
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0"></div>
            </button>
          </form>

          {/* Status Message */}
          {status && (
            <div className={`mt-6 p-4 rounded-xl border ${
              status.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-300' 
                : 'bg-red-500/10 border-red-500/20 text-red-300'
            }`}>
              <div className="flex items-center">
                <svg className={`w-5 h-5 mr-3 ${
                  status.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  {status.type === 'success' ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  )}
                </svg>
                <span className="font-medium">{status.message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          {/* Contact Info Cards */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Información de Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">controlinventario@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="text-white font-medium">+54 (299) 523-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Dirección</p>
                  <p className="text-white font-medium">Antártida Argentina 523 Neuquén</p>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time Card */}
          <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-primary-500/20 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white">Tiempo de Respuesta</h4>
            </div>
            <p className="text-primary-200 text-sm">
              Nos comprometemos a responder a tu mensaje en un plazo máximo de 24 horas durante días hábiles.
            </p>
          </div>

          {/* FAQ Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-white mb-3">Preguntas Frecuentes</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <p className="font-medium text-white">¿Cuánto tiempo toma el soporte?</p>
                <p>Respuesta en 24 horas hábiles</p>
              </div>
              <div>
                <p className="font-medium text-white">¿Ofrecen soporte técnico?</p>
                <p>Sí, tenemos especialistas disponibles</p>
              </div>
              <div>
                <p className="font-medium text-white">¿Es gratuito el soporte?</p>
                <p>El soporte básico es completamente gratuito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
