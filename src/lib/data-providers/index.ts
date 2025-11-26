/**
 * Data Providers Entry Point
 *
 * نقطة الدخول الرئيسية لمزودي البيانات
 * يمكن التبديل بين المزود المحلي ومزود API من هنا
 */

import { DataProvider, ProviderConfig } from './types';
import { localProvider } from './localProvider';

/**
 * المزود النشط حالياً
 * TODO: عند ربط الباك-إند، استبدل بـ API provider
 */
let activeProvider: DataProvider = localProvider;

/**
 * الحصول على المزود النشط
 */
export function getDataProvider(): DataProvider {
  return activeProvider;
}

/**
 * تعيين المزود النشط
 * يستخدم للتبديل بين المزود المحلي ومزود API
 */
export function setDataProvider(provider: DataProvider): void {
  activeProvider = provider;
}

/**
 * إنشاء مزود بناءً على الإعدادات
 * TODO: إضافة API provider عند التفعيل
 */
export function createProvider(config: ProviderConfig): DataProvider {
  switch (config.source) {
    case 'local':
      return localProvider;

    case 'api':
      // TODO: إنشاء وتفعيل API provider
      throw new Error('API provider not implemented yet. Use local provider for now.');

    default:
      throw new Error(`Unknown provider source: ${config.source}`);
  }
}

// تصدير المزود المحلي كخيار افتراضي
export { localProvider } from './localProvider';
export * from './types';

// تصدير المزود النشط كـ default
export default getDataProvider;
