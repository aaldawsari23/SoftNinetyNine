'use client';

import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import { LazyProductImage } from '@/components/ui/LazyProductImage';
import { WHATSAPP_NUMBER } from '@/data/config';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemoveItem = (productId: string) => {
    setRemovingId(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingId(null);
    }, 300);
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    let message = 'مرحباً، أود طلب المنتجات التالية:\n\n';

    items.forEach(item => {
      const name = item.product.name_ar || item.product.name || 'منتج';
      const sku = item.product.sku || item.product.id;
      message += `• ${name}\n`;
      message += `  SKU: ${sku}\n`;
      message += `  الكمية: ${item.quantity}\n`;
      if (item.product.price > 0) {
        message += `  السعر: ${item.product.price} ${item.product.currency}\n`;
      }
      message += '\n';
    });

    const total = getTotalPrice();
    if (total > 0) {
      message += `\nالإجمالي: ${total.toLocaleString('ar-SA')} ريال`;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-background-card border-l border-border shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">سلة التسوق</h2>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-white p-2"
                aria-label="إغلاق"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-4xl mb-3 opacity-50">🛒</div>
                <p className="text-text-secondary">السلة فارغة</p>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.product.id}
                  className={`bg-background rounded-lg p-3 border border-border transition-all duration-300 animate-slide-up ${removingId === item.product.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded overflow-hidden bg-background flex-shrink-0">
                      <LazyProductImage product={item.product} alt={item.product.name_ar || ''} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white line-clamp-2">
                        {item.product.name_ar || item.product.name || 'منتج'}
                      </h3>
                      <p className="text-xs text-text-muted">SKU: {item.product.sku || item.product.id}</p>
                      {item.product.price > 0 && (
                        <p className="text-sm text-primary font-bold mt-1">
                          {item.product.price} {item.product.currency}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="qty-btn text-white"
                        aria-label="تقليل الكمية"
                      >
                        −
                      </button>
                      <span className="text-white font-bold w-10 text-center text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="qty-btn text-white"
                        aria-label="زيادة الكمية"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-all rounded-lg px-3 py-2 hover:bg-red-500/10 active:scale-95"
                      aria-label="حذف من السلة"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-4 animate-slide-up">
              {getTotalPrice() > 0 && (
                <div className="flex justify-between items-center text-lg font-bold animate-fade-in glass-premium p-3 rounded-xl">
                  <span className="text-white">الإجمالي</span>
                  <span className="text-green-400 text-xl">{getTotalPrice().toLocaleString('ar-SA')} ريال</span>
                </div>
              )}
              <button
                onClick={handleWhatsAppOrder}
                className="btn-whatsapp"
                aria-label="إرسال الطلب عبر واتساب"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-lg">إرسال الطلب عبر واتساب</span>
              </button>
              <button
                onClick={clearCart}
                className="w-full py-3 rounded-xl text-sm font-medium text-text-muted hover:text-white border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 transition-all"
                aria-label="إفراغ السلة"
              >
                إفراغ السلة
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
