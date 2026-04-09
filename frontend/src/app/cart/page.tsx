'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { showToast } from '@/utils/toast';
import { MESSAGES } from '@/constants/messages';
import { Cart, CartItem } from '@/types';
import { rest } from '@/api/rest';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await rest.get<Cart>('/cart');
      setCart(res.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        showToast({ title: MESSAGES.LOGIN_REQUIRED, type: 'error' });
        router.push('/login');
      } else {
        setError('Failed to fetch cart');
      }
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: any) => {
    try {
      await rest.post('/cart/item', { productId, quantity: 0 });
      window.dispatchEvent(new Event('cartUpdated'));
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    try {
      await rest.post<any>('/orders/checkout');
      window.dispatchEvent(new Event('cartUpdated'));
      showToast({ title: MESSAGES.ORDER_SUCCESS, type: 'success' });
      setCart(null);
      router.push('/');
    } catch (err: any) {
      const msg = err.response?.data?.error || MESSAGES.ORDER_FAILURE;
      showToast({ title: msg, type: 'error' });
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#565959' }}>
      Loading your cart...
    </div>
  );
  
  if (error) return (
    <div style={{ padding: '20px', margin: '20px', border: '1px solid #c40000', borderRadius: '4px', background: '#fffafa', color: '#c40000' }}>
      {error}
    </div>
  );

  const cartItems = cart?.items || [];
  const isEmpty = cartItems.length === 0;

  let totalAmount = 0;
  cartItems.forEach((item: CartItem) => {
    if (item.productId) {
      totalAmount += item.productId.price * item.quantity;
    }
  });

  return (
    <div className="cart-page-wrapper" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '20px', alignItems: 'start' }}>
      
      <div style={{ background: 'white', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '4px' }}>Shopping Cart</h1>
        <div style={{ fontSize: '0.85rem', color: '#007185', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            Deselect all items
        </div>
        
        {isEmpty ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Your Cart is empty.</h2>
            <Link href="/" style={{ color: '#007185', textDecoration: 'none', fontWeight: '500' }}>Explore products</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cartItems.map((item: CartItem) => item.productId && (
              <div key={item.productId._id} style={{ display: 'flex', gap: '20px', padding: '15px 0', borderBottom: '1px solid #ddd' }}>
                 <div style={{ width: '120px', height: '120px', background: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', flexShrink: 0 }}>
                    <span style={{ fontSize: '4rem' }}>📦</span>
                 </div>
                 
                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#0f1111' }}>{item.productId.name}</h4>
                    <div style={{ fontSize: '0.75rem', color: '#007600', fontWeight: 'bold' }}>In Stock</div>
                    <div style={{ fontSize: '0.75rem', color: '#565959' }}>Eligible for FREE Shipping</div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                        <div style={{ fontSize: '0.85rem', background: '#f0f2f2', padding: '2px 10px', borderRadius: '8px', border: '1px solid #d5d9d9' }}>
                           Qty: {item.quantity}
                        </div>
                        <div style={{ width: '1px', height: '14px', background: '#ddd' }}></div>
                        <button 
                          style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            color: '#007185', 
                            fontSize: '0.75rem', 
                            cursor: 'pointer',
                            padding: 0
                          }}
                          onClick={() => removeItem(item.productId._id)}
                        >
                          Delete
                        </button>
                    </div>
                 </div>

                 <div style={{ textAlign: 'right', minWidth: '80px' }}>
                    <div className="price" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                       {(item.productId.price * item.quantity).toFixed(2).split('.')[0]}
                       <span style={{ fontSize: '0.7rem' }}>.{(item.productId.price * item.quantity).toFixed(2).split('.')[1]}</span>
                    </div>
                 </div>
              </div>
            ))}
            
            <div style={{ textAlign: 'right', marginTop: '15px', fontSize: '1.15rem' }}>
              Subtotal ({cartItems.length} items): <strong style={{ fontWeight: 'bold' }}>${totalAmount.toFixed(2)}</strong>
            </div>
          </div>
        )}
      </div>

      {!isEmpty && (
        <div style={{ background: 'white', padding: '20px', border: '1px solid #ddd', borderRadius: '4px', position: 'sticky', top: '20px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#007600', marginBottom: '15px', fontSize: '0.85rem' }}>
              <span style={{ fontSize: '1rem' }}>✅</span>
              Your order qualifies for FREE Shipping
           </div>
           
           <div style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              Subtotal ({cartItems.length} items): <strong style={{ fontWeight: 'bold' }}>${totalAmount.toFixed(2)}</strong>
           </div>
           
           <button 
             onClick={handleCheckout} 
             style={{ 
               width: '100%', 
               background: '#ffd814', 
               border: '1px solid #fcd200', 
               borderRadius: '20px', 
               padding: '10px', 
               fontWeight: 'bold',
               cursor: 'pointer',
               boxShadow: '0 2px 5px rgba(213,217,217,.5)'
             }}
           >
              Proceed to Checkout
           </button>
        </div>
      )}
    </div>
  );
}
