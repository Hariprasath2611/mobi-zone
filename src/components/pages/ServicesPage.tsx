import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { MobileServices } from '@/entities';
import { motion } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function ServicesPage() {
  const [services, setServices] = useState<MobileServices[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { items } = await BaseCrudService.getAll<MobileServices>('mobileservices');
      setServices(items);
      setLoading(false);
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-24">
        <div className="text-center">
          <p className="font-paragraph text-lg text-primary">Loading services...</p>
        </div>
      </div>
    );
  }

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
              SERVICES
            </h1>
            <p className="font-paragraph text-lg text-primary max-w-2xl">
              Professional mobile repair and maintenance solutions delivered with expertise and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full py-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-paragraph text-lg text-primary">No services available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-secondary border-2 border-primary p-8 hover:bg-neonaccent transition-colors group"
                >
                  {service.serviceImage && (
                    <div className="mb-6 overflow-hidden">
                      <Image
                        src={service.serviceImage}
                        alt={service.serviceName || 'Service'}
                        className="w-full h-48 object-cover"
                        width={400}
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-heading text-2xl uppercase text-primary">
                      {service.serviceName}
                    </h2>
                    {service.isAvailable && (
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 ml-2" />
                    )}
                  </div>

                  {service.description && (
                    <p className="font-paragraph text-base text-primary mb-6">
                      {service.description}
                    </p>
                  )}

                  <div className="space-y-3">
                    {service.price !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-sm uppercase text-primary">Price</span>
                        <span className="font-heading text-xl text-primary">
                          ${service.price.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {service.estimatedDuration && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-sm text-primary">
                          {service.estimatedDuration}
                        </span>
                      </div>
                    )}

                    {!service.isAvailable && (
                      <div className="mt-4 pt-4 border-t border-primary">
                        <span className="font-paragraph text-sm text-primary opacity-70">
                          Currently Unavailable
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full bg-primary text-primary-foreground py-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl uppercase mb-6">Why Choose Us</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-base">Certified technicians with years of experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-base">Quick turnaround times for most repairs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-base">Genuine parts and quality guarantee</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-paragraph text-base">Competitive pricing with transparent quotes</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-3xl uppercase mb-6">Service Process</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="font-heading text-2xl">01</span>
                  <div>
                    <h3 className="font-heading text-lg uppercase mb-1">Diagnosis</h3>
                    <p className="font-paragraph text-sm opacity-90">
                      Bring your device for a free diagnostic assessment
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-heading text-2xl">02</span>
                  <div>
                    <h3 className="font-heading text-lg uppercase mb-1">Quote</h3>
                    <p className="font-paragraph text-sm opacity-90">
                      Receive a transparent quote with estimated completion time
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-heading text-2xl">03</span>
                  <div>
                    <h3 className="font-heading text-lg uppercase mb-1">Repair</h3>
                    <p className="font-paragraph text-sm opacity-90">
                      Our technicians perform the repair with precision
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-heading text-2xl">04</span>
                  <div>
                    <h3 className="font-heading text-lg uppercase mb-1">Pickup</h3>
                    <p className="font-paragraph text-sm opacity-90">
                      Collect your fully functional device with warranty
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
