// ecommerce/src/pages/Home/home.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import styles from './Home.module.css';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  rarity: string;
  chains: string;
  status?: string;
}

interface Brand {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  verified?: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get<Product[]>('http://localhost:3000/products');
        setProducts(productsResponse.data.slice(0, 9)); // Get first 9 products
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className={styles.home}>
      <div className={styles.contentWrapper}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Main Collection</button>
          <Link href="/products" className={styles.tab}>Creators Market</Link>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Clothes are the Spirit of Fashion</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit.</p>
            
            <div className={styles.heroButtons}>
              <Link href="/products" className={styles.exploreBtn}>Explore Now</Link>
              <Link href="/create-product" className={styles.createBtn}>Create</Link>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Brands</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>20k+</span>
                <span className={styles.statLabel}>Fashion Designers</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>60+</span>
                <span className={styles.statLabel}>Fashion Shows</span>
              </div>
            </div>
          </div>

          <div className={styles.gallery}>
            {[
              { src: '/home-pictures/5.png', alt: 'Purple Shoes' },
              { src: '/home-pictures/6.png', alt: 'Yellow Shoes' },
              { src: '/home-pictures/7.png', alt: 'Gold Dress' },
              { src: '/home-pictures/3.png', alt: 'Blue Jacket' },
              { src: '/home-pictures/4.png', alt: 'Shoes Display' },
              { src: '/home-pictures/2.png', alt: 'Green Shoes' },
              { src: '/home-pictures/1.png', alt: 'Character' }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`${styles.galleryItem} ${
                  index === 0 || index === 1 ? styles.small : 
                  index === 2 ? styles.tall : 
                  index === 3 || index === 4 ? styles.medium : 
                  styles.small
                }`}
              >
                <Image 
                  src={item.src} 
                  alt={item.alt} 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.brands}>
          {['Adidas', 'Puma', 'Lacoste'].map((brand) => (
            <Image 
              key={brand}
              src={`/home-pictures/${brand.toLowerCase()}-logo.png`}
              alt={brand}
              width={100}
              height={50}
              className={styles.brandLogo}
            />
          ))}
        </div>

        <div className={styles.featuredProducts}>
          <h2>Featured Products</h2>
          <div className={styles.productGrid}>
            {products.map(product => (
              <div key={product.id} className={styles.productCard}>
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  width={250} 
                  height={250}
                />
                <div className={styles.productInfo}>
                  <h3>{product.title}</h3>
                  <span>{product.price} ETH</span>
                  <button onClick={() => handleLike(product.id)}>
                    {likedProducts.includes(product.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;