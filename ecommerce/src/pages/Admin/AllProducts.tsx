import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './AllProducts.module.css';
import classNames from 'classnames';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNavBar from './AdminNavBar';
import { log } from 'console';

const AllProducts = () => {
    const router = useRouter();
    const { category: routeCategory } = router.query;

    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [editProduct, setEditProduct] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [status, setStatus] = useState<string>('Available');
    const [rarity, setRarity] = useState<string>('Common');
    const [onSale, setOnSale] = useState<boolean>(false);
    const [search, setSearch] = useState('');

    const displayAllProducts = () => {
        axios
            .get('http://localhost:3001/products')
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
            });
    };

    useEffect(() => {
        displayAllProducts();
    }, []);

    useEffect(() => {
        if (category) {
            const filtered = products.filter(product => product.collection === category);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [category, products]);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [search, products]);

    const openEditModal = (product: any) => {
        setEditProduct(product);
        setTitle(product.title);
        setPrice(product.price.toString());
        setImage(product.image);
        setQuantity(product.stock.toString());
        setCategory(product.collection);
        setStatus(product.status);
        setRarity(product.rarity);
        setOnSale(product.onSale);

        setOpenModal(true);
    };

    const addProduct = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post('http://localhost:3001/products/create', {
                title,
                price: parseFloat(price),
                image: imageUrl,
                rarity,
                collection: category,
                stock: parseInt(quantity),
                status,
                onSale,
            })
            .then(() => {
                displayAllProducts();
                setOpenModal(false);
                resetForm();
            })
            .catch((err) => {
                console.error('Error adding product:', err);
            });
    };

    const handleImageUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) return;

        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'brandseller');
        data.append('cloud_name', 'dog9364lq');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dog9364lq/image/upload',
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            const uploadedImageUrl = response.data.secure_url;
            setImageUrl(uploadedImageUrl);
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    };

    const handleEditProduct = (e: React.FormEvent) => {
        e.preventDefault();        
        
        axios
            .put(`http://localhost:3001/products/${editProduct.id}`, {
                title,
                price: parseFloat(price),
                image: imageUrl,
                status,
                rarity,
                collection: category,
                stock: parseInt(quantity),
                onSale
            })
            .then(() => {
                displayAllProducts();
                setOpenModal(false);
                resetForm();
            })
            .catch((err) => {
                console.error('Error updating product:', err);
            });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editProduct) {
            handleEditProduct(e);
        } else {
            addProduct(e);
        }
    };

    const resetForm = () => {
        setEditProduct(null);
        setTitle('');
        setPrice('');
        setImage(null);
        setQuantity('');
        setImageUrl('');
        setCategory('');
        setStatus('Available');
        setRarity('Common');
        setOnSale(false);
    };

    const deleteProduct = (product: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${product.title}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:3001/products/${product.id}`)
                    .then(() => {
                        Swal.fire('Deleted!', `${product.title} has been deleted successfully.`, 'success');
                        displayAllProducts();
                    })
                    .catch((err) => {
                        console.error('Error deleting product:', err);
                    });
            }
        });
    };

    return (
        <>
            <AdminNavBar search={search} setSearch={setSearch} />
            <div className={styles['admin-dashboard']}>
                <header className={styles['dashboard-header']}>
                    <h1>Admin Dashboard - Products</h1>
                    <button
                        className={classNames(styles.btnnn, styles['btnnn-primaryyy'])}
                        onClick={() => {
                            setEditProduct(null);
                            setOpenModal(true);
                            resetForm();
                        }}
                    >
                        Add New Product
                    </button>
                </header>

                <div className={styles['products-and-form-container']}>
                    {openModal && (
                        <div className={styles['product-form-sidebar']}>
                            <form onSubmit={handleSubmit}>
                                <h2>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <div className={styles['form-group2']}>
                                    <label className={styles.labell}>Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={styles['form-group2']}>
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={styles['form-group2']}>
                                    <label>Image URL</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                    />
                                    <button className={styles['upload-button']} onClick={handleImageUpload}>
                                        Upload
                                    </button>
                                </div>
                                <div className={styles['form-group2']}>
                                    <label>Stock</label>
                                    <input
                                        type="text"
                                        name="stock"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <div className={styles['form-group2']}>
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={styles['form-group2']}>
                                    <label>Status</label>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Not Available">Not Available</option>
                                        <option value="New">New</option>
                                    </select>
                                </div>
                                <div className={styles['form-group2']}>
                                    <label>Rarity</label>
                                    <select
                                        name="rarity"
                                        value={rarity}
                                        onChange={(e) => setRarity(e.target.value)}
                                    >
                                        <option value="Common">Common</option>
                                        <option value="Uncommon Rare">Uncommon Rare</option>
                                        <option value="Ultra Rare">Ultra Rare</option>
                                        <option value="Secret Rare">Secret Rare</option>
                                    </select>
                                </div>
                                <div className={styles['modal-actions']}>
                                    <button type="submit" className={classNames(styles.btnnn, styles['btn-primary'])}>
                                        {editProduct ? 'Update Product' : 'Add Product'}
                                    </button>
                                    <button
                                        type="button"
                                        className={classNames(styles.btnnn, styles['btnnn-cancelll'])}
                                        onClick={() => setOpenModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className={styles['product-grid']}>
                        {(filteredProducts.length > 0 ? filteredProducts : products).map((product: any) => (
                            <div key={product.id} className={styles['product-card']}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className={styles['product-image']}
                                />
                                <div className={styles['product-info']}>
                                    <h2>{product.title}</h2>
                                    <span className={styles.price}>${product.price}</span>
                                    <div className={styles.actions}>
                                        <button
                                            onClick={() => openEditModal(product)}
                                            className={classNames(styles.btnnn, styles['btn-edittt'])}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(product)}
                                            className={classNames(styles.btnnn, styles['btn-deleteee'])}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllProducts;
