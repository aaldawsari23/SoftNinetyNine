import Link from 'next/link';

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">موقعنا وساعات العمل</h1>
          <p className="text-text-secondary">زرنا في محلنا بجيزان</p>
        </div>

        {/* Working Hours Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-4 rounded-xl">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3">ساعات العمل</h3>
              <div className="bg-background/50 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-muted text-sm">أيام العمل</span>
                  <span className="text-white font-bold">يومياً</span>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-sm">الوقت</span>
                    <span className="text-white font-bold text-lg">5:30 مساءً - 3:00 صباحاً</span>
                  </div>
                </div>
              </div>
              <p className="text-text-muted text-xs mt-3">
                نعمل يومياً بدون عطلة لخدمتكم
              </p>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-4 rounded-xl">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3">العنوان</h3>
              <div className="bg-background/50 rounded-xl p-4 border border-white/10 mb-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <div>
                    <p className="text-white font-bold mb-1">جيزان</p>
                    <p className="text-text-muted text-sm">بجوار مستشفى العميس</p>
                  </div>
                </div>
              </div>

              {/* Map Button */}
              <a
                href="https://maps.app.goo.gl/t6pyLPj52d18BaPH6?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                فتح الخريطة في Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md rounded-2xl p-6 border border-primary/30">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">هل لديك استفسار؟</h3>
            <p className="text-text-secondary mb-4">تواصل معنا عبر الهاتف أو الواتساب</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              اتصل بنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
