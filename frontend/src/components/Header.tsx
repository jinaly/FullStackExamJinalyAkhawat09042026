'use client';

import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { rest } from '@/api/rest';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        setCartCount(0);
        return;
      }
      const res = await rest.get<any>('/cart');
      const count = res.data?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;
      setCartCount(count);
    } catch (err) {
      console.error('Error fetching cart count:', err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    setIsClient(true);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      setLoggedIn(true);
      fetchCartCount();
    }

    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    window.location.href = '/login';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(search)}`);
  };

  if (!isClient) return null;

  const hideSearchRoutes = ['/login', '/register', '/reports', '/cart'];
  const shouldHideSearch = hideSearchRoutes.includes(pathname);

  return (
    <header>
      <nav className="glass-nav">
        <Link href="/" className="logo" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NextGen</span>
          <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>Store</span>
        </Link>

        {!shouldHideSearch ? (
          <form onSubmit={handleSearch} className="search-bar" style={{ flex: 1, display: 'flex', maxWidth: '800px', margin: '0 20px' }}>
            <input 
              type="text" 
              placeholder="Search NextGenStore" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                marginBottom: 0, 
                borderRadius: '4px 0 0 4px', 
                border: 'none',
                height: '40px'
              }} 
            />
            <button type="submit" style={{ 
              borderRadius: '0 4px 4px 0', 
              height: '40px', 
              padding: '0 15px',
              border: 'none',
              boxShadow: 'none',
              background: 'var(--primary)',
              cursor: 'pointer'
            }}>
              🔍
            </button>
          </form>
        ) : (
          <div style={{ flex: 1 }}></div>
        )}

        <div className="nav-links">
          {loggedIn ? (
            <>
              <div style={{ color: 'white', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <span>Hello, User</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>Account & Lists</span>
              </div>
              
              <Link href="/reports" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 'bold' }}>
                Reports
              </Link>

              <Link href="/cart" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '5px', position: 'relative' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                   <span style={{ fontSize: '1.5rem' }}>🛒</span>
                   {cartCount > 0 && (
                     <span style={{ 
                       position: 'absolute', 
                       top: '-8px', 
                       right: '-8px', 
                       background: '#e77600', 
                       color: 'white', 
                       borderRadius: '50%', 
                       width: '18px', 
                       height: '18px', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       fontSize: '0.65rem',
                       fontWeight: 'bold',
                       boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                     }}>
                       {cartCount > 99 ? '99+' : cartCount}
                     </span>
                   )}
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', marginTop: '4px' }}>Cart</span>
              </Link>

              <button 
                onClick={handleLogout} 
                style={{ 
                  padding: '6px 12px', 
                  background: 'transparent', 
                  color: 'white', 
                  border: '1px solid #888', 
                  borderRadius: '4px',
                  boxShadow: 'none',
                  cursor: 'pointer'
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}>Products</Link>
              <Link href="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}>Sign In</Link>
              <Link href="/register">
                <button style={{ padding: '8px 16px', background: 'var(--primary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Start here.
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
