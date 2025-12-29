import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';
import { MiniCart } from '@/wix-verticals/react-pages/react-router/routes/root';

export default function Layout() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background bg-liquid-ether">
      {/* Header */}
      <header className="w-full bg-secondary sticky top-0 z-40">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-neonaccent" />
              <span className="font-heading text-xl uppercase text-primary">MOBILE SHOP</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className={`font-heading text-sm uppercase transition-opacity ${
                  isActive('/') && location.pathname === '/' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/store" 
                className={`font-heading text-sm uppercase transition-opacity ${
                  isActive('/store') ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Shop
              </Link>
              <Link 
                to="/services" 
                className={`font-heading text-sm uppercase transition-opacity ${
                  isActive('/services') ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Services
              </Link>
              <Link 
                to="/contact" 
                className={`font-heading text-sm uppercase transition-opacity ${
                  isActive('/contact') ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Cart Icon */}
            <div className="flex items-center">
              <MiniCart cartIconClassName="text-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-secondary text-primary mt-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* About */}
            <div>
              <h3 className="font-heading text-lg uppercase mb-4 text-neonaccent">MOBILE SHOP</h3>
              <p className="font-paragraph text-sm opacity-90">
                Your trusted destination for premium mobile devices, accessories, and professional repair services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-lg uppercase mb-4 text-neonaccent">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/store" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                    Shop Products
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading text-lg uppercase mb-4 text-neonaccent">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span className="font-paragraph text-sm opacity-90">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span className="font-paragraph text-sm opacity-90">info@mobileshop.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span className="font-paragraph text-sm opacity-90">123 Tech Street, Digital City</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-12 pt-8">
            <p className="font-paragraph text-sm text-center opacity-70">
              © {new Date().getFullYear()} Mobile Shop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
