'use client';

import { useState } from 'react';
import { showToast } from '@/utils/toast';
import { MESSAGES } from '@/constants/messages';
import { rest } from '@/api/rest';

export default function AddToCartAction({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await rest.post('/cart/item', { productId, quantity: 1 });
      window.dispatchEvent(new Event('cartUpdated'));
      showToast({ title: MESSAGES.CART_ADD_SUCCESS, type: 'success' });
    } catch (err: any) {
      if (err.response?.status === 401) {
        showToast({ title: MESSAGES.LOGIN_REQUIRED, type: 'error' });
      } else {
        const errorMsg = err.response?.data?.error || MESSAGES.FETCH_ERROR;
        showToast({ title: errorMsg, type: 'error' });
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <button 
        onClick={handleAddToCart} 
        disabled={loading}
        className="w-full rounded-[20px] transition-all bg-[#ffd814] border-[#fcd200] hover:bg-[#f7ca00]"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
