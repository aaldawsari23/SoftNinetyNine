import Navbar from '@/components/layout/Navbar';
import SectionNav from '@/components/layout/SectionNav';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import ToastContainer from '@/components/ui/Toast';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <ToastProvider>
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          تخطي إلى المحتوى الرئيسي
        </a>

        <div className="flex flex-col min-h-screen">
          <Navbar />
          <SectionNav />
          <main id="main-content" className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
        </div>
        <ToastContainer />
      </ToastProvider>
    </CartProvider>
  );
}
