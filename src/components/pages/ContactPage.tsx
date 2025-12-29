import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-neonaccent py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl uppercase text-primary leading-none mb-6">
              CONTACT
            </h1>
            <p className="font-paragraph text-lg text-primary max-w-2xl">
              Get in touch with our team for inquiries, support, or to schedule a service appointment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="w-full py-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-heading text-3xl uppercase text-primary mb-8">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-neonaccent flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg uppercase text-primary mb-1">Phone</h3>
                      <p className="font-paragraph text-base text-primary">+1 (555) 123-4567</p>
                      <p className="font-paragraph text-sm text-primary opacity-70">Mon-Sat, 9AM-7PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-neonaccent flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg uppercase text-primary mb-1">Email</h3>
                      <p className="font-paragraph text-base text-primary">info@mobileshop.com</p>
                      <p className="font-paragraph text-sm text-primary opacity-70">We reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-neonaccent flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg uppercase text-primary mb-1">Location</h3>
                      <p className="font-paragraph text-base text-primary">123 Tech Street</p>
                      <p className="font-paragraph text-base text-primary">Digital City, DC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-neonaccent flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg uppercase text-primary mb-1">Hours</h3>
                      <p className="font-paragraph text-base text-primary">Monday - Friday: 9:00 AM - 7:00 PM</p>
                      <p className="font-paragraph text-base text-primary">Saturday: 10:00 AM - 6:00 PM</p>
                      <p className="font-paragraph text-base text-primary">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary border-2 border-primary p-8"
            >
              <h2 className="font-heading text-3xl uppercase text-primary mb-6">Send Message</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="font-heading text-sm uppercase text-primary block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border-2 border-primary px-4 py-3 font-paragraph text-base text-primary bg-background focus:outline-none focus:border-neonaccent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="font-heading text-sm uppercase text-primary block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border-2 border-primary px-4 py-3 font-paragraph text-base text-primary bg-background focus:outline-none focus:border-neonaccent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="font-heading text-sm uppercase text-primary block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border-2 border-primary px-4 py-3 font-paragraph text-base text-primary bg-background focus:outline-none focus:border-neonaccent transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-heading text-sm uppercase text-primary block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full border-2 border-primary px-4 py-3 font-paragraph text-base text-primary bg-background focus:outline-none focus:border-neonaccent transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground px-8 py-4 font-heading text-sm uppercase hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full bg-neonaccent py-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <h2 className="font-heading text-4xl uppercase text-primary mb-4">Visit Our Store</h2>
            <p className="font-paragraph text-lg text-primary mb-8">
              Stop by our location to explore our products and meet our team in person.
            </p>
            <div className="bg-primary/10 h-96 flex items-center justify-center">
              <p className="font-paragraph text-base text-primary">
                123 Tech Street, Digital City, DC 12345
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
