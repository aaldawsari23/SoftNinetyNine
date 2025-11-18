'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">تواصل معنا</h1>
            <p className="text-text-secondary text-lg">نحن هنا لمساعدتك في كل ما تحتاجه</p>
          </div>
          <div className="card space-y-8">
            {/* Phone Numbers */}
            <div className="flex items-start gap-4">
              <div className="text-3xl">📱</div>
              <div className="space-y-2">
                <h3 className="text-white font-semibold mb-1">أرقام التواصل</h3>
                <div className="flex flex-col">
                  <a
                    href="https://wa.me/966568663381"
                    className="text-primary hover:text-primary-hover"
                  >
                    📞 إبراهيم عسيري: 0568663381
                  </a>
                  <a
                    href="https://wa.me/966580874790"
                    className="text-primary hover:text-primary-hover"
                  >
                    📞 حسين سهيل: 0580874790
                  </a>
                </div>
              </div>
            </div>
            {/* Working Hours */}
            <div className="flex items-start gap-4">
              <div className="text-3xl">🕒</div>
              <div>
                <h3 className="text-white font-semibold mb-1">أوقات العمل</h3>
                <p className="text-text-secondary">يومياً من 5:30 عصراً حتى 3:00 فجراً</p>
              </div>
            </div>
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="text-3xl">📍</div>
              <div>
                <h3 className="text-white font-semibold mb-1">الموقع</h3>
                <p className="text-text-secondary">جيزان، بجوار مستشفى العميس، المملكة العربية السعودية</p>
                <a
                  href="https://maps.app.goo.gl/t6pyLPj52d18BaPH6?g_st=ipc"
                  className="text-primary hover:text-primary-hover text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  فتح الخريطة
                </a>
              </div>
            </div>
            {/* SnapChat */}
            <div className="flex items-start gap-4">
              <div className="text-3xl">👻</div>
              <div>
                <h3 className="text-white font-semibold mb-1">تابعنا على سناب شات</h3>
                <a
                  href="https://www.snapchat.com/add/h5jk6"
                  className="text-primary hover:text-primary-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  h5jk6
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
