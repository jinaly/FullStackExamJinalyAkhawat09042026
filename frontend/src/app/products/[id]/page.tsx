import Link from 'next/link';
import AddToCartAction from './AddToCartAction';
import { rest } from '@/api/rest';

async function getProduct(id: any) {
  try {
    const res = await rest.get<any>(`/products/${id}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div style={{ background: 'white', padding: '40px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '15px' }}>Product not found</h1>
        <Link href="/" style={{ color: '#007185', textDecoration: 'none' }}>Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 0.8fr', gap: '30px', background: 'white', padding: '25px', borderRadius: '8px', border: '1px solid #ddd' }}>
      
      <div className="product-image-section" style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
         <div style={{ position: 'sticky', top: '20px', background: '#f7f7f7', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
            <span style={{ fontSize: '10rem' }}>📦</span>
         </div>
      </div>

      <div className="product-info-section" style={{ padding: '0 10px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '12px' }}>
          {product.name}
        </h1>
        <div style={{ color: '#007185', fontSize: '0.875rem', marginBottom: '15px', fontWeight: '500' }}>
          Visit the {product.category} Store
        </div>

        <div className="price-details" style={{ marginBottom: '25px' }}>
           <div className="price" style={{ fontSize: '2.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'baseline' }}>
              {product.price.toFixed(2).split('.')[0]}
              <span style={{ fontSize: '0.85rem', alignSelf: 'flex-start', marginTop: '8px' }}>{product.price.toFixed(2).split('.')[1]}</span>
           </div>
           <div style={{ color: '#565959', fontSize: '0.85rem', marginTop: '4px' }}>Inclusive of all taxes</div>
        </div>

        <div className="product-description-box" style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '25px', border: '1px solid #eee' }}>
           <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Product Category: {product.category}</h4>
           <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#333', fontStyle: 'italic' }}>{product.description}</p>
        </div>

        <div className="bullet-points">
           <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', fontWeight: 'bold' }}>About this item</h4>
           <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.8', color: '#111' }}>
              <li>Professional grade performance with sustainable manufacturing.</li>
              <li>Ergonomically designed for maximum comfort and ease of use.</li>
              <li>Engineered using high-quality materials for long-lasting durability.</li>
              <li>Full compatibility with all modern {product.category} standards.</li>
           </ul>
        </div>
      </div>

      <div className="buy-box" style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px 20px', height: 'fit-content', position: 'sticky', top: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <div className="price" style={{ fontSize: '1.75rem', marginBottom: '12px' }}>{(product.price).toFixed(2).split('.')[0]}<span style={{ fontSize: '0.85rem' }}>{(product.price).toFixed(2).split('.')[1]}</span></div>
        <div style={{ color: '#007600', fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px' }}>In Stock</div>
        
        <div style={{ fontSize: '0.85rem', color: '#565959', marginBottom: '20px', lineHeight: '1.6' }}>
           <div style={{ color: '#111' }}>Fastest delivery <span style={{ fontWeight: 'bold' }}>Tomorrow, April 10</span>. Order within <span style={{ color: '#007600' }}>8 hrs 15 mins</span></div>
           <div style={{ marginTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <span>Ships from</span>
                 <span style={{ color: '#111' }}>NextGenStore</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <span>Sold by</span>
                 <span style={{ color: '#111' }}>NextGenStore</span>
              </div>
           </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
           <AddToCartButton productId={product._id} />
        </div>

        <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px', fontSize: '0.8rem', color: '#007185' }}>
           <div style={{ cursor: 'pointer' }}>❤ Add to Wish List</div>
        </div>
      </div>
    </div>
  );
}

function AddToCartButton({ productId }: { productId: string }) {
  return <AddToCartAction productId={productId} />;
}
