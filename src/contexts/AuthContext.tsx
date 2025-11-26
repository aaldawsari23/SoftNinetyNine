/**
 * Admin Authentication Context
 *
 * Context لإدارة حالة المصادقة في لوحة التحكم
 * حالياً: يستخدم localStorage (مؤقت)
 * مستقبلاً: سيتم الربط بـ Supabase Auth أو NextAuth
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// المستخدم الافتراضي للتطوير
// TODO: استبدل بـ Auth حقيقي من Supabase
const DEMO_ADMIN: User = {
  id: 'admin-1',
  email: 'admin@soft99bikes.com',
  name: 'مدير المتجر',
  role: 'admin',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// بيانات تسجيل الدخول المؤقتة
// TODO: استبدل بـ Auth حقيقي
const DEMO_CREDENTIALS = {
  email: 'admin@soft99bikes.com',
  password: 'admin123', // في الإنتاج، لا تخزن كلمات المرور في الكود!
};

const AUTH_STORAGE_KEY = 'soft99_admin_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل حالة المصادقة من localStorage عند البدء
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const userData = JSON.parse(stored);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * تسجيل الدخول
   * TODO: استبدل بـ Supabase Auth
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // TODO: استبدل بطلب API حقيقي
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });

      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 500));

      // التحقق المؤقت
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        const userData = DEMO_ADMIN;
        setUser(userData);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * تسجيل الخروج
   * TODO: استبدل بـ Supabase Auth
   */
  const logout = () => {
    // TODO: استبدل بـ Supabase Auth
    // await supabase.auth.signOut();

    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook للوصول لحالة المصادقة
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Hook للتحقق من صلاحيات الأدمن
 */
export function useAdminAuth() {
  const auth = useAuth();

  const isAdmin = auth.isAuthenticated && auth.user?.role === 'admin';

  return {
    ...auth,
    isAdmin,
  };
}
