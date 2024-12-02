import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './Cart.module.css';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/Navbar'; 
import Footer from '../components/footer';

interface Product {
    id: number;
    title: string;
    image: string;
    CartProducts: {
        price: number;
    };
}

interface Cart {
    Products: Product[];
    totalItems: number;
    totalAmount: number;
}

const Cart: React.FC = () => {
    const [cart, setcart] = useState<Cart | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [user, setuser] = useState<string | null>(null);
    const [refresh, setrefresh] = useState<boolean | null>(false);

    const fetchCart = async () => {
        if (!user) return; // Ensure userId is available before fetching the cart
        try {
            const response = await axios.get(`http://localhost:3001/cartP/itemcart/${user}`);
            setcart(response.data);
        } catch (err: any) { 
            console.error('Error fetching cart:', err);
            setError('Failed to fetch cart');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try { 
                
                const decodedToken: any = jwtDecode(token);
                console.log(decodedToken , "deeecoded")
                setuser(decodedToken.id);
            } catch (error) {
                console.error('Error decoding token:', error);
                setError('Invalid token');
            }
        }
    }, []);

    useEffect(() => {
        fetchCart(); // Fetch the cart after userId is set
    }, [user,refresh]);

    const handleConfirmOrder = async () => {
        const result = await Swal.fire({
            title: 'Confirm Order',
            text: 'Are you sure you want to place this order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, confirm order',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await axios.post(`http://localhost:3001/cartP/confirm-order/${user}`);

                Swal.fire({
                    icon: 'success',
                    title: 'Order Confirmed!',
                    text: 'Check your email for order confirmation details.',
                    timer: 2000,
                    showConfirmButton: false,
                });

                setcart({
                    ...cart!,
                    Products: [],
                    totalItems: 0,
                    totalAmount: 0,
                });
            } catch (err: any) { 
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response?.data?.message || 'Failed to confirm order',
                });
            }
        }
    };

    const handleremoveitem = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3001/cartP/deleteitem/${id}`);
            setrefresh(!refresh)
        } catch (err: any) { 
            console.error('Error deleting the product:', err);
            setError('Failed to deleat  the product');
        }    };

    if (error) return <div className={styles.cartError}>{error}</div>;
    if (!cart) return <div className={styles.cartLoading}>Loading...</div>;

    return (
        <div className={styles.AllCartContainer}>
            <Navbar/>
            <div className={styles.cartContainer}>
                <h2>My Cart</h2>
                <div className={styles.cartItems}>
                    {cart.Products.length === 0 ? (
                        <div className={styles.cartEmpty}>Your cart is empty</div>
                    ) : (
                        cart.Products.map((product) => (
                            <div key={product.id} className={styles.cartItem}>
                                <img src={product.image} alt={product.title} className={styles.cartItemImage} />
                                <div className={styles.cartItemDetails}>
                                    <h3>{product.title}</h3>
                                    <p className={styles.cartItemQuantity}>Price: {product.CartProducts.price}</p>
                                </div>
                                <button className={styles.removeItemButton} onClick={() => { handleremoveitem(product.id) }}>
                                    ❌
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div className={styles.cartSummary}>
                    <p>Total Items: {cart.totalItems || 0}</p>
                    <p>Total Amount: {cart.totalAmount || 0} ETH</p>
                    <button 
                        className={styles.confirmOrderButton}
                        onClick={handleConfirmOrder}
                        disabled={!cart.Products || cart.Products.length === 0}
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
            <Footer /> 
        </div>
    );
};

export default Cart;









