import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CartDrawer from '../cart/CartDrawer'
import { CartProvider } from '@/contexts/CartContext'
import { useCart } from '@/contexts/CartContext'

// Mock window.open
const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen,
})

// Mock the product data
jest.mock('@/data/products', () => ({
  products: [],
  categories: [],
  brands: [],
}))

jest.mock('@/data/config', () => ({
  WHATSAPP_NUMBER: '966568663381',
}))

// Helper component to add items to cart
function CartTestHelper({ children }: { children: React.ReactNode }) {
  const { addToCart } = useCart()

  // Add test product on mount
  React.useEffect(() => {
    addToCart(
      {
        id: 'test-prod-1',
        sku: 'TEST001',
        name_ar: 'زيت موتول',
        category_id: 'c1',
        brand_id: 'b13',
        type: 'part',
        price: 150,
        currency: 'ريال',
        status: 'published',
        description: 'زيت محرك',
        created_at: '2025-01-15T00:00:00Z',
      },
      2
    )
  }, [addToCart])

  return <>{children}</>
}

describe('CartDrawer - WhatsApp Order Tests', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear()
    localStorage.clear()
  })

  it('should generate correct WhatsApp URL with cart items', async () => {
    render(
      <CartProvider>
        <CartTestHelper>
          <CartDrawer isOpen={true} onClose={() => {}} />
        </CartTestHelper>
      </CartProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('زيت موتول')).toBeInTheDocument()
    })

    const whatsappButton = screen.getByText('إرسال الطلب عبر واتساب')
    fireEvent.click(whatsappButton)

    expect(mockWindowOpen).toHaveBeenCalledTimes(1)
    const callUrl = mockWindowOpen.mock.calls[0][0]

    // Verify WhatsApp URL structure
    expect(callUrl).toContain('https://wa.me/966568663381')
    expect(callUrl).toContain('مرحباً، أود طلب المنتجات التالية')
    expect(callUrl).toContain('زيت موتول')
    expect(callUrl).toContain('TEST001')
    expect(callUrl).toContain('الكمية: 2')
    expect(callUrl).toContain('السعر: 150 ريال')
  })

  it('should calculate total price correctly', async () => {
    render(
      <CartProvider>
        <CartTestHelper>
          <CartDrawer isOpen={true} onClose={() => {}} />
        </CartTestHelper>
      </CartProvider>
    )

    await waitFor(() => {
      // Total should be 150 * 2 = 300
      expect(screen.getByText('300 ريال')).toBeInTheDocument()
    })
  })

  it('should show empty cart message when no items', () => {
    render(
      <CartProvider>
        <CartDrawer isOpen={true} onClose={() => {}} />
      </CartProvider>
    )

    expect(screen.getByText('السلة فارغة')).toBeInTheDocument()
  })

  it('should not call window.open when cart is empty', () => {
    render(
      <CartProvider>
        <CartDrawer isOpen={true} onClose={() => {}} />
      </CartProvider>
    )

    // Try to click WhatsApp button (shouldn't exist)
    const whatsappButton = screen.queryByText('إرسال الطلب عبر واتساب')
    expect(whatsappButton).not.toBeInTheDocument()
    expect(mockWindowOpen).not.toHaveBeenCalled()
  })

  it('should update quantity correctly', async () => {
    render(
      <CartProvider>
        <CartTestHelper>
          <CartDrawer isOpen={true} onClose={() => {}} />
        </CartTestHelper>
      </CartProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    // Find increment button
    const incrementButtons = screen.getAllByText('+')
    fireEvent.click(incrementButtons[0])

    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  it('should remove item from cart', async () => {
    render(
      <CartProvider>
        <CartTestHelper>
          <CartDrawer isOpen={true} onClose={() => {}} />
        </CartTestHelper>
      </CartProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('زيت موتول')).toBeInTheDocument()
    })

    const removeButton = screen.getByText('حذف')
    fireEvent.click(removeButton)

    await waitFor(() => {
      expect(screen.queryByText('زيت موتول')).not.toBeInTheDocument()
      expect(screen.getByText('السلة فارغة')).toBeInTheDocument()
    })
  })

  it('should clear entire cart', async () => {
    render(
      <CartProvider>
        <CartTestHelper>
          <CartDrawer isOpen={true} onClose={() => {}} />
        </CartTestHelper>
      </CartProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('زيت موتول')).toBeInTheDocument()
    })

    const clearButton = screen.getByText('إفراغ السلة')
    fireEvent.click(clearButton)

    await waitFor(() => {
      expect(screen.queryByText('زيت موتول')).not.toBeInTheDocument()
      expect(screen.getByText('السلة فارغة')).toBeInTheDocument()
    })
  })

  it('should close drawer when close button is clicked', () => {
    const onClose = jest.fn()
    render(
      <CartProvider>
        <CartDrawer isOpen={true} onClose={onClose} />
      </CartProvider>
    )

    const closeButton = screen.getByLabelText('إغلاق')
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
