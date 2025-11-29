#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productsPath = join(__dirname, '../public/data/products.json');

// قراءة الملف
const products = JSON.parse(readFileSync(productsPath, 'utf-8'));

console.log(`📦 جاري تحديث ${products.length} منتج...\n`);

let updatedCount = 0;
let hiddenCount = 0;

// قائمة المنتجات الصغيرة التي يجب إخفاؤها
const hideKeywords = [
  'رمان بلي',
  'وردة زيت',
  'شطرطون',
  'كلبسات',
  'اربطة بلاستيك',
  'بيت فيوز',
  'كتاوت',
  'جلدة ترس',
  'جلدة غطاء',
  'محبس بنزين',
  'فلتر بنزين',
  'حزام بطارية',
  'لمبة لوحة',
  'سلك كلتش',
  'سلك فرامل',
  'سلك عداد',
  'سلك بنزين'
];

products.forEach((product, index) => {
  const specs = product.specifications || {};
  let updated = false;

  // 1. زيوت (c1) - إضافة الحجم واللزوجة للعنوان
  if (product.category_id === 'c1') {
    const viscosity = specs.viscosity || '';
    const volume = specs.volume || '';
    const manufacturer = specs.manufacturer || '';

    if (viscosity && volume) {
      // استخراج اسم السلسلة من الاسم الحالي (مثل 7100, 300V, 5100)
      const seriesMatch = product.name.match(/(7100|300V|5100|R9000|Metric|Power1)/i);
      const series = seriesMatch ? seriesMatch[1] : '';

      product.name = `زيت ${manufacturer} ${series} ${viscosity} ${volume}`.trim();
      product.name_en = product.name;

      // تحديث الوصف القصير
      const oilType = specs.oil_type || 'Synthetic';
      product.short_description = `زيت محرك 4T ${oilType} ${viscosity} حجم ${volume} للدراجات النارية`;

      updated = true;
    }
  }

  // 2. فلاتر (c2) - إضافة كود الشركة للعنوان
  if (product.category_id === 'c2') {
    const model = specs.model || '';
    const manufacturer = specs.manufacturer || '';
    const filterType = specs.filter_type || '';

    if (model && manufacturer) {
      const isOilFilter = filterType.toLowerCase().includes('oil');
      const isAirFilter = filterType.toLowerCase().includes('air');

      if (isOilFilter) {
        product.name = `فلتر زيت ${manufacturer} ${model}`;
      } else if (isAirFilter) {
        product.name = `فلتر هواء ${manufacturer} ${model}`;
      } else {
        product.name = `فلتر ${manufacturer} ${model}`;
      }

      product.name_en = product.name;
      product.short_description = `${product.name} للدراجات النارية، ترشيح عالي وحماية أفضل للمحرك`;

      updated = true;
    }
  }

  // 3. بواجي (c3) - إضافة كود البوجي للعنوان
  if (product.category_id === 'c3') {
    const model = specs.model || '';
    const manufacturer = specs.manufacturer || '';
    const plugType = specs.plug_type || '';

    if (model && manufacturer) {
      let suffix = '';
      if (plugType.toLowerCase().includes('iridium')) {
        suffix = ' (إيريديوم)';
      }

      product.name = `بوجي ${manufacturer} ${model}${suffix}`;
      product.name_en = product.name;
      product.short_description = `بوجي ${manufacturer} موديل ${model}${plugType ? ` (${plugType})` : ''} للدراجات النارية`;

      updated = true;
    }
  }

  // 4. كفرات (c5) - إضافة المقاس للعنوان
  if (product.category_id === 'c5') {
    const size = specs.size || '';
    const manufacturer = specs.manufacturer || '';
    const model = specs.model || '';

    // تحديد نوع المنتج (كفر، تيوب، بلف)
    if (product.name.includes('كفر') && size && manufacturer) {
      // كفرات
      const position = product.name.includes('امامي') ? 'امامي' :
                      product.name.includes('خلفي') ? 'خلفي' : '';

      // استخراج اسم الموديل من الاسم الحالي (مثل S22, Power 5)
      const modelMatch = product.name.match(/(S22|Power \d+|Road \d+|Pilot|Sportmax)/i);
      const modelName = modelMatch ? modelMatch[1] : '';

      product.name = `كفر ${manufacturer} ${modelName} ${size}${position ? ' ' + position : ''}`.trim();
      product.name_en = product.name;

      const treadPattern = specs.tread_pattern || 'Sport';
      product.short_description = `كفر ${manufacturer} ${modelName} مقاس ${size} نمط ${treadPattern}`;

      updated = true;
    } else if (product.name.includes('لستك') || product.name.includes('تيوب')) {
      // تيوبات داخلية
      if (size) {
        product.name = `لستك داخلي ${size}`;
        product.name_en = product.name;
        product.short_description = `أنبوب داخلي مقاس ${size} مناسب لكفرات الدراجات النارية بنفس المقاس`;

        updated = true;
      }
    } else if (product.name.includes('بلف')) {
      // بلفات
      const valveType = product.name.includes('مستقيم') ? 'مستقيم' :
                       product.name.includes('زاوية') ? 'زاوية' : '';

      product.name = `بلف تيوبلس${valveType ? ' ' + valveType : ''}`;
      product.name_en = product.name;
      product.short_description = `بلف تيوبلس${valveType ? ' ' + valveType : ''} مناسب للجنوط التيوبلس للدراجات النارية`;

      updated = true;
    }
  }

  // 5. إخفاء المنتجات الصغيرة
  const shouldHide = hideKeywords.some(keyword => product.name.includes(keyword));

  if (shouldHide && product.is_available) {
    product.is_available = false;
    product.status = 'draft';
    hiddenCount++;
    updated = true;
  }

  if (updated) {
    updatedCount++;
  }
});

// حفظ الملف المحدث
writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf-8');

console.log(`✅ تم تحديث ${updatedCount} منتج`);
console.log(`🔒 تم إخفاء ${hiddenCount} منتج صغير`);
console.log(`\n💾 تم حفظ الملف في: ${productsPath}`);
