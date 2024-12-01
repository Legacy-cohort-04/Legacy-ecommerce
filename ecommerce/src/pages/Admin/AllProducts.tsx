import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './AllProducts.module.css';
import classNames from 'classnames';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNavBar from './AdminNavBar';

const AllProducts = () => {
    const router = useRouter();
    const { category: routeCategory } = router.query;

    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [editProduct, setEditProduct] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');

    const displayAllProducts = () => {
        axios
            .get('http://localhost:3000/products')
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
                console.log(response.data, '------------------');
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

    const handleSearch = (search: string) => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
        console.log(filtered, 'filtered',search);
        
    };

    const openEditModal = (product: any) => {
        setEditProduct(product);
        setTitle(product.title);
        setPrice(product.price);
        setDescription(product.description);
        setBrand(product.brand);
        setImage(product.image);
        setQuantity(product.stock);

        setOpenModal(true);
    };

    const addProduct = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post('http://localhost:3000/products/create', {
                title,
                price,
                image: imageUrl,
                rarity: 'Common',
                chains: 'None',
                collection: category,
                stock: parseInt(quantity),
                onSale: false,
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
            .put(`http://localhost:3000/products/${editProduct.id}`, {
                title,
                price,
                image: imageUrl,
                rarity: 'Common',
                chains: 'None',
                collection: category,
                stock: parseInt(quantity),
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
        setDescription('');
        setBrand('');
        setImage(null);
        setQuantity('');
        setImageUrl('');
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
                    .delete(`http://localhost:3000/products/${product.id}`)
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

    return (<>
    <AdminNavBar/>
        <div className={styles['admin-dashboard']}>
            <header className={styles['dashboard-header']}>
                <h1>Admin Dashboard - Products</h1>
                <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => handleSearch(e.target.value)}
                />
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
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles['form-group2']}>
                                <label>Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    required
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
                                <p>{product.description}</p>
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
