// src/pages/Home/Home.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './Home.module.css';
import Footer from '../components/footer';
import Navbar from '../components/Navbar'; 

// Define TypeScript interfaces for type safety
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  status: string;
  rarity: string;
}

interface Brand {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  verified: number;
}

interface Creator {
  id: number;
  name: string;
  bannerImage?: string;
  avatar?: string;
  description?: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get<Product[]>('http://localhost:3001/products/all');
        setProducts(productsResponse.data.slice(0, 9));
        
        const newProducts = productsResponse.data
          .filter(product => product.status === "New")
          .slice(0, 3);
        setTrendingProducts(newProducts);

        const creatorsResponse = await axios.get<Creator[]>('http://localhost:3001/user/all'); 
        setCreators(creatorsResponse.data.slice(0, 3));

        const brandsResponse = await axios.get<Brand[]>('http://localhost:3001/brands/allbrands');
        const verifiedBrands = brandsResponse.data
          .filter(brand => brand.verified === 1)
          .slice(-3); 
        setBrands(verifiedBrands);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className={styles.home}>
      <Navbar/>
      <div className={styles.contentWrapper}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Main Collection</button>
          <button className={styles.tab} onClick={() => router.push('/products')}>Creators Market</button>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Clothes are the Spirit of Fashion</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit.</p>
            
            <div className={styles.heroButtons}>
            <button className={styles.exploreBtn} onClick={() => router.push('/Products/Allproducts')}>
  Explore Now
</button>              <button className={styles.createBtn} onClick={() => router.push('/create-product')}>Create</button>         
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
            <div className={`${styles.galleryItem} ${styles.small}`}>
              <img src="/src/assets/home-pictures/5.png" alt="Purple Shoes" />
            </div>
            <div className={`${styles.galleryItem} ${styles.small}`}>
              <img src="/src/assets/home-pictures/6.png" alt="Yellow Shoes" />
            </div>
            <div className={`${styles.galleryItem} ${styles.tall}`}>
              <img src="/src/assets/home-pictures/7.png" alt="Gold Dress" />
            </div>
            <div className={`${styles.galleryItem} ${styles.medium}`}>
              <img src="/src/assets/home-pictures/3.png" alt="Blue Jacket" />
            </div>
            <div className={`${styles.galleryItem} ${styles.medium}`}>
              <img src="/src/assets/home-pictures/4.png" alt="Shoes Display" />
            </div>
            <div className={`${styles.galleryItem} ${styles.small}`}>
              <img src="/src/assets/home-pictures/2.png" alt="Green Shoes" />
            </div>
            <div className={`${styles.galleryItem} ${styles.small}`}>
              <img src="/src/assets/home-pictures/1.png" alt="Character" />
            </div>
          </div>
        </div>

        <div className={styles.brands}>
          {brands.map(brand => (
            <img key={brand.id} src={brand.logo} alt={brand.name} className={styles.brandLogo} />
          ))}
        </div>

        <div className={styles.about}>
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className={styles.fashionSpeaks}>
          <div className={styles.fashionImage}>
            <img src="https://s3-alpha-sig.figma.com/img/4f3b/4bc5/0336a716d5a69a265c6890a20951754e?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eWqu6QdRhme2OkOnOwylx3QcNbvSIdeI7qkUsjswAAhcABzLRc3E0neIgLSVtbfFAOflIIH7F-uBfcM6igvKVXALi6jsu5pgnZz~0iVBo30iK9X3bKvNkuKkspzTJGnaJr9As-TRw7gOUhgoDH3sOL3vwvz9caoLou~TudSsWUI9Cc8ibpzNEgpwGyfx04ThMvrrdMBG-cAruTGyleJ5difF69apyhPYkuoNycQHr-z39j47YODdizN~V5tjDpSJePFM3AmybDhXUUunhshMcOsOhbnbf9nsofRNUoIEre-sAucdYvCZBHumGlE-ASY8kJOMYU7iUF4Y2NQKeXNosg__" alt="Fashion Statue" />
          </div>
          <div className={styles.fashionContent}>
            <h2>Fashion That Speaks</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
              molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
              accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
              Maecenas eget condimentum velit, sit amet feugiat lectus. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
              scelerisque ante pulvinar.
            </p>
            <button className={styles.showMoreBtn}>Show more</button>
          </div>
        </div>

        <div className={styles.allCollection}>
          <h2>All Collection</h2>
          <p>World's First Layer 2 Fashion Marketplace</p>
          
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/images/tag.png" alt="No Gas Fees" />
              </div>
              <h3>No Gas Fees</h3>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/images/nft.png" alt="Carbon Natural NFTs" />
              </div>
              <h3>Carbon Natural NFTs</h3>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/images/fleshet.png" alt="Fast And Easy Transactions" />
              </div>
              <h3>Fast And Easy Transactions</h3>
            </div>
          </div>
        </div>

        <div className={styles.featuredProducts}>
          <h2>Featured Products</h2>
          <p>Explore our latest collection</p>
          
          <div className={styles.collectionTabs}>
            <button className={`${styles.collectionTab} ${styles.active}`}>All Collections</button>
            <button className={styles.collectionTab}>Verified Brands</button>
            <button className={styles.collectionTab}>Verified Artists</button>
            <button className={styles.collectionTab}>New Drops</button>
            <button className={styles.collectionTab}>Live Shows</button>
          </div>
          
          <div className={styles.AproductGrid}>
  {products.map(product => (
    <div key={product.id} className={styles.AproductCard}>
      <div className={styles.AproductImageContainer}>
        <img src={product.image} alt={product.title} className={styles.AproductImage} />
      </div>
      <div className={styles.AproductInfo}>
        <div className={styles.AproductHeader}>
          <span className={`${styles.rarityBadge} ${product.rarity.toLowerCase().replace(' ', '-')}`}>
            {product.rarity}
          </span>
        </div>
        <div className={styles.AproductTitlePrice}>
          <h2 className={styles.AproductTitle}>{product.title}</h2>
          <span className={styles.AproductPrice}>{product.price.toLocaleString()} ETH</span>
        </div>
        <div className={styles.AproductFooter}>
          <button className={styles.AbuyButton} onClick={() => router.push('/products')}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>

        <div className={styles.newTrending}>
          <h2>New & Trending</h2>
          <p>Most popular digital fashion items</p>
          
          <div className={styles.AproductGrid}>
            {trendingProducts.map(product => (
              <div key={product.id} className={styles.AproductCard}>
                <div className={styles.AproductImageContainer}>
                  <img src={product.image} alt={product.title} className={styles.AproductImage} />
                </div>
                <div className={styles.AproductInfo}>
                  <div className={styles.AproductHeader}>
                    <span className={`${styles.rarityBadge} ${product.rarity.toLowerCase().replace(' ', '-')}`}>
                      {product.rarity}
                    </span>
                  </div>
                  <div className={styles.AproductTitlePrice}>
                    <h2 className={styles.AproductTitle}>{product.title}</h2>
                    <span className={styles.AproductPrice}>{product.price.toLocaleString()} ETH</span>
                  </div>
                  <div className={styles.AproductFooter}>
                    <button className={styles.AbuyButton} onClick={() => router.push('/products')}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.upcomingBrands}>
          <h2>Upcoming Brands</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          
          <div className={styles.brandsGrid}>
            {brands.map(brand => (
              <div key={brand.id} className={styles.brandCard}>
                <div className={styles.brandImage}>
                  <img src={brand.logo || '/default-brand-logo.png'} alt={brand.name} />
                </div>
                <div className={styles.brandProfile}>
                  <img src={brand.logo || '/default-brand-logo.png'} alt={brand.name} className={styles.brandAvatar} />
                  <span className={styles.brandName}>{brand.name} <span className={styles.verified}>✓</span></span>
                </div>
                <p className={styles.brandDescription}>{brand.description || 'No description available.'}</p>
                <button className={styles.followButton}>+ Follow</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.qualityBanner}>
          <div className={styles.bannerContent}>
            <h2>Highest Quality</h2>
            <h2>Collection</h2>
            <button className={styles.getStartedBtn}>Get Started</button>
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Home;