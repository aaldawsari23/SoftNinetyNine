'use client';

import { useState } from 'react';

// قائمة أنواع الدراجات الشائعة في السعودية
const motorcycleBrands = [
  { id: 'honda', name: 'Honda هوندا' },
  { id: 'yamaha', name: 'Yamaha ياماها' },
  { id: 'suzuki', name: 'Suzuki سوزوكي' },
  { id: 'kawasaki', name: 'Kawasaki كاواساكي' },
  { id: 'ktm', name: 'KTM كي تي إم' },
  { id: 'harley', name: 'Harley-Davidson هارلي' },
  { id: 'bmw', name: 'BMW بي إم دبليو' },
  { id: 'ducati', name: 'Ducati دوكاتي' },
  { id: 'other', name: 'أخرى' },
];

// خدمات الصيانة
const maintenanceServices = [
  { id: 'oil-change', name: 'تغيير زيت وفلتر', needsParts: true },
  { id: 'brake-pads', name: 'تغيير صوف (فحمات)', needsParts: true },
  { id: 'brake-discs', name: 'تغيير أقمشة (أقراص)', needsParts: true },
  { id: 'valve-adjust', name: 'وزن بلوف', needsParts: false },
  { id: 'clutch-plates', name: 'تغيير صحون كلتش', needsParts: true },
  { id: 'chain', name: 'تغيير جنزير', needsParts: true },
  { id: 'chain-sprocket', name: 'تغيير جنزير + سبروكت', needsParts: true },
  { id: 'medium-service', name: 'صيانة متوسطة (تصفية)', needsParts: false },
  { id: 'heavy-service', name: 'صيانة ثقيلة (توضيب - فك مكينة)', needsParts: false },
  { id: 'other', name: 'مشكلة أخرى (وصف حر)', needsParts: false },
];

export default function MaintenancePage() {
  const [step, setStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    motorcycleBrand: '',
    otherBrand: '',
    model: '',
    year: '',
    serviceType: '',
    partsSource: 'shop', // 'shop', 'customer', 'external'
    otherIssue: '',
    preferredDate: '',
    notes: '',
  });

  const selectedService = maintenanceServices.find(s => s.id === formData.serviceType);
  const needsParts = selectedService?.needsParts;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // هنا يمكن الربط مع Firebase أو API
    const whatsappMessage = `
*حجز صيانة جديد*

*العميل:* ${formData.customerName}
*الجوال:* ${formData.customerPhone}

*الدراجة:*
- الماركة: ${formData.motorcycleBrand === 'other' ? formData.otherBrand : motorcycleBrands.find(b => b.id === formData.motorcycleBrand)?.name}
- الموديل: ${formData.model || '-'}
- السنة: ${formData.year || '-'}

*نوع الخدمة:*
${maintenanceServices.find(s => s.id === formData.serviceType)?.name}
${formData.serviceType === 'other' ? `\nالوصف: ${formData.otherIssue}` : ''}

${needsParts ? `*القطع:* ${
  formData.partsSource === 'shop' ? 'شراء من المحل' :
  formData.partsSource === 'customer' ? 'معي القطع' :
  'من مصدر خارجي'
}` : ''}

*الموعد المفضل:* ${formData.preferredDate || 'أي وقت'}

*ملاحظات:* ${formData.notes || '-'}
    `.trim();

    const whatsappUrl = `https://wa.me/966568663381?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">حجز موعد صيانة</h1>
          <p className="text-text-secondary">خدمة صيانة احترافية لدراجتك النارية</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s === step
                      ? 'bg-primary text-white scale-110'
                      : s < step
                      ? 'bg-green-500 text-white'
                      : 'bg-background/50 text-text-muted border border-white/10'
                  }`}
                >
                  {s < step ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 md:w-24 h-1 ${
                      s < step ? 'bg-green-500' : 'bg-background/50'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 md:gap-16 mt-2">
            <span className={`text-xs ${step >= 1 ? 'text-primary font-semibold' : 'text-text-muted'}`}>
              البيانات
            </span>
            <span className={`text-xs ${step >= 2 ? 'text-primary font-semibold' : 'text-text-muted'}`}>
              الخدمة
            </span>
            <span className={`text-xs ${step >= 3 ? 'text-primary font-semibold' : 'text-text-muted'}`}>
              التفاصيل
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          {/* Step 1: Customer Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">معلوماتك</h2>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">الاسم *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-background/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="أدخل اسمك"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">رقم الجوال *</label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full bg-background/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="05xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">ماركة الدراجة *</label>
                <select
                  required
                  value={formData.motorcycleBrand}
                  onChange={(e) => setFormData({ ...formData, motorcycleBrand: e.target.value })}
                  className="w-full bg-background/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">اختر الماركة</option>
                  {motorcycleBrands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {formData.motorcycleBrand === 'other' && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">اسم الماركة</label>
                  <input
                    type="text"
                    value={formData.otherBrand}
                    onChange={(e) => setFormData({ ...formData, otherBrand: e.target.value })}
                    className="w-full bg-background/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="مثال: Triumph"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">الموديل</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-background/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="مثال: CBR1000RR"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">السنة</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-background/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="2023"
                    min="1980"
                    max="2030"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
              >
                التالي
              </button>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">نوع الخدمة</h2>

              <div className="space-y-2">
                {maintenanceServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: service.id })}
                    className={`w-full text-right px-4 py-3 rounded-xl transition-all ${
                      formData.serviceType === service.id
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-background/50 text-white border border-white/10 hover:border-primary/30'
                    }`}
                  >
                    {service.name}
                  </button>
                ))}
              </div>

              {formData.serviceType === 'other' && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-white mb-2">وصف المشكلة *</label>
                  <textarea
                    required
                    value={formData.otherIssue}
                    onChange={(e) => setFormData({ ...formData, otherIssue: e.target.value })}
                    className="w-full bg-background/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                    placeholder="اكتب وصف تفصيلي للمشكلة..."
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-background/50 text-white px-6 py-3 rounded-xl font-bold border border-white/10 hover:bg-background transition-all"
                >
                  السابق
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.serviceType}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  التالي
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Parts & Details */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">التفاصيل النهائية</h2>

              {/* Parts Source - Only if service needs parts */}
              {needsParts && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">مصدر القطع *</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, partsSource: 'shop' })}
                      className={`w-full text-right px-4 py-3 rounded-xl transition-all ${
                        formData.partsSource === 'shop'
                          ? 'bg-primary text-white'
                          : 'bg-background/50 text-white border border-white/10 hover:border-primary/30'
                      }`}
                    >
                      شراء من المحل (سنقترح القطع المناسبة)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, partsSource: 'customer' })}
                      className={`w-full text-right px-4 py-3 rounded-xl transition-all ${
                        formData.partsSource === 'customer'
                          ? 'bg-primary text-white'
                          : 'bg-background/50 text-white border border-white/10 hover:border-primary/30'
                      }`}
                    >
                      معي القطع جاهزة
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, partsSource: 'external' })}
                      className={`w-full text-right px-4 py-3 rounded-xl transition-all ${
                        formData.partsSource === 'external'
                          ? 'bg-primary text-white'
                          : 'bg-background/50 text-white border border-white/10 hover:border-primary/30'
                      }`}
                    >
                      سأحضرها من مكان آخر
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-white mb-2">الموعد المفضل</label>
                <input
                  type="datetime-local"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-background/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-xs text-text-muted mt-1">أوقات العمل: 5:30 مساءً - 3:00 صباحاً</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">ملاحظات إضافية</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-background/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                  placeholder="أي ملاحظات أو طلبات خاصة..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-background/50 text-white px-6 py-3 rounded-xl font-bold border border-white/10 hover:bg-background transition-all"
                >
                  السابق
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  إرسال عبر واتساب
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Info Box */}
        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-100">
              <p className="font-semibold mb-1">ملاحظة:</p>
              <p>سيتم إرسال طلب الحجز عبر واتساب وسيقوم فريقنا بالتواصل معك لتأكيد الموعد وتوفر القطع.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
