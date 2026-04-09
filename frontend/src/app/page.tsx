import Link from 'next/link';
import { Product } from '@/types';
import { rest } from '@/api/rest';

async function getProducts(page: number = 1, search: string = '') {
  try {
    const res = await rest.get<any>(`/products`, {
      params: { page, search }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0, page: 1, totalPages: 1 };
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const page = typeof sp.page === 'string' ? parseInt(sp.page) : 1;
  const search = typeof sp.search === 'string' ? sp.search : '';

  const data = await getProducts(page, search);
  const products = data.products || [];
  const totalPages = data.totalPages || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ fontSize: '0.85rem', color: '#565959', height: '24px', display: 'flex', alignItems: 'center' }}>
        {search ? (
           <span>Results for <strong style={{ color: 'black' }}>"{search}"</strong></span>
        ) : (
           <span>Showing all products</span>
        ) }
      </div>

      <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {products.map((product: Product) => (
          <Link href={`/products/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="glass-panel" style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s' }}>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7', borderRadius: '4px', marginBottom: '10px' }}>
                 <span style={{ fontSize: '3.5rem' }}>📦</span>
              </div>
              
              <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.4', height: '2.8em', overflow: 'hidden' }}>{product.name}</h3>
              <p style={{ color: '#565959', fontSize: '0.75rem', marginBottom: '10px' }}>{product.category}</p>
              
              <div style={{ flexGrow: 1 }}></div>

              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: '4px' }}>$</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{(product.price).toFixed(2).split('.')[0]}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: '4px' }}>{(product.price).toFixed(2).split('.')[1]}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div style={{ marginTop: '40px', textAlign: 'center', background: 'white', padding: '40px', border: '1px solid #ddd' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>No results for {search}</h2>
          <p style={{ color: '#666' }}>Try checking your spelling or use more general terms</p>
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          {page > 1 ? (
            <Link 
              href={`/?page=${page - 1}${search ? `&search=${search}` : ''}`}
              style={{ textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', border: '1px solid #d5d9d9', background: 'white', color: '#0f1111', fontSize: '0.85rem', boxShadow: '0 2px 5px rgba(213,217,217,.5)' }}
            >
              ← Previous
            </Link>
          ) : (
            <div style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #eee', color: '#ccc', fontSize: '0.85rem' }}>
              ← Previous
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '5px' }}>
             {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Link 
                  key={p}
                  href={`/?page=${p}${search ? `&search=${search}` : ''}`}
                  style={{ 
                    textDecoration: 'none', 
                    minWidth: '36px', 
                    height: '36px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: '4px', 
                    border: p === page ? '1px solid #e77600' : '1px solid transparent',
                    background: 'white',
                    color: p === page ? '#c45500' : '#007185',
                    fontWeight: p === page ? 'bold' : 'normal',
                    fontSize: '0.85rem'
                  }}
                >
                  {p}
                </Link>
             ))}
          </div>

          {page < totalPages ? (
            <Link 
              href={`/?page=${page + 1}${search ? `&search=${search}` : ''}`}
              style={{ textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', border: '1px solid #d5d9d9', background: 'white', color: '#0f1111', fontSize: '0.85rem', boxShadow: '0 2px 5px rgba(213,217,217,.5)' }}
            >
              Next →
            </Link>
          ) : (
            <div style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #eee', color: '#ccc', fontSize: '0.85rem' }}>
              Next →
            </div>
          )}
        </div>
      )}
    </div>
  );
}
