"use client";

import Link from 'next/link';

export default function ParkingPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">مواقف آمنة للإيجار</h1>
            <p className="text-text-secondary text-lg">
              نوفر لك مساحات مخصصة وآمنة لحفظ دراجتك النارية بأسعار تناسب الجميع
            </p>
          </div>
          <div className="card space-y-8">
            {/* Rates */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">الأسعار</h2>
              <ul className="space-y-2 text-text-secondary text-lg">
                <li>السعر الأسبوعي: <span className="text-green-500 font-semibold">اتصل للاستفسار</span></li>
                <li>السعر الشهري: <span className="text-green-500 font-semibold">اتصل للاستفسار</span></li>
              </ul>
            </div>
            {/* Booking */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">للاستفسار والحجز</h2>
              <p className="text-text-secondary mb-3">
                يرجى التواصل معنا عبر الواتساب للحجز أو طرح أي استفسار.
              </p>
              <a
                href="https://wa.me/966568663381"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block w-full text-center py-3 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                تواصل عبر واتساب
              </a>
            </div>
            {/* Terms */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">الشروط والأحكام</h2>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>أوقات عمل المحل لاستلام وتسليم الدراجات: يومياً من 5:30 عصراً حتى 3:00 فجراً.</li>
                <li>الدفع مقدمًا.</li>
                <li>الأسعار قابلة للتغيير حسب الموسم أو الطلب.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}