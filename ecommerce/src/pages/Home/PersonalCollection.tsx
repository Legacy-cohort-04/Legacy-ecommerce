import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PersonalCollection.module.css';
import Navbar from '../components/Navbar';

// Define the interface for a product
interface Product {
    id: number;
    title: string;
    image: string;
    price: string;
    rarity: string;
}

// Define the interface for a favorite product
interface FavoriteProduct {
    id: number;
    added_at: string;
    UserId: number;
    products: Product[]; // Add products property
}

const PersonalCollection: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

            try {
                const response = await axios.get(`http://localhost:3001/favourites/user/${userId}/favourites`);
                setFavorites([response.data]);
                console.log(response.data, 'dattttttaaaaaaaaaaa');
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className={styles.collection}>
            <Navbar />
            <h1>Your Personal Collection</h1>
            {favorites.length === 0 ? (
                <p>No favorites found. Start liking products to see them here!</p>
            ) : (
                <div className={styles.productGrid}>
                    {favorites.map((favorite) => (
                        favorite.products.map((product) => (
                            <div key={product.id} className={styles.productCard}>
                                <div className={styles.imageContainer}>
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className={styles.productInfo}>
                                    <div className={styles.productHeader}>
                                        <span className={styles.rarityBadge}>
                                            {product.rarity || 'Common'}
                                        </span>
                                    </div>
                                    <div className={styles.titlePriceContainer}>
                                        <h2 className={styles.productTitle}>{product.title}</h2>
                                        <span className={styles.productPrice}>
                                            {product.price} ETH
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            )}
        </div>
    );
};

export default PersonalCollection;