import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import styles from './Create.module.css';

interface ProductFormData {
  title: string;
  price: string;
  image: string;
  status: 'New' | 'Available' | 'Not Available';
  rarity: 'Secret Rare' | 'Uncommon Rare' | 'Ultra Rare';
  chains: string;
  collection: 'Shoes' | 'Dresses' | 'Coats' | 'Shirts' | 'Pants';
  stock: string;
  onSale: boolean;
}

const INITIAL_FORM_DATA: ProductFormData = {
  title: '',
  price: '',
  image: '',
  status: 'Available',
  rarity: 'Secret Rare',
  chains: 'ETH',
  collection: 'Shoes',
  stock: '0',
  onSale: false
};

const CreateProduct: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      if (!formData.title || !formData.price || !formData.image || 
          !formData.rarity || !formData.chains || !formData.collection) {
        alert('Please fill in all required fields');
        return;
      }

      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        image: formData.image,
        status: formData.status,
        rarity: formData.rarity,
        chains: formData.chains,
        collection: formData.collection,
        stock: parseInt(formData.stock),
        onSale: formData.onSale
      };

      console.log('Sending data:', productData);

      const response = await axios.post(
        'http://localhost:3001/products/create', 
        productData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        console.log('product', response.data);
        router.push('/Products/Allproducts');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data) {
        console.log('Server error details:', axiosError.response.data);
      }
      alert(
        axiosError.response?.data?.message || 
        'Error creating product. Please check all required fields.'
      );
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'speakeasy');
      data.append('cloud_name', 'dc9siq9ry');
      
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dc9siq9ry/image/upload', 
          data
        );
        setFormData(prev => ({
          ...prev,
          image: response.data.secure_url
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      }
    }
  };

  return (
    <div className={styles['create-product']}>
      <div className={styles['create-product__wrapper']}>
        <form className={styles['create-product__form']} onSubmit={handleSubmit}>
          <h2 className={styles['create-product__title']}>Create New Product</h2>
          
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className={styles['create-product__input']}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className={styles['create-product__input']}
            step="0.01"
            min="0"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles['create-product__input']}
            required
          >
            <option value="New">New</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>

          <select
            name="rarity"
            value={formData.rarity}
            onChange={handleChange}
            className={styles['create-product__input']}
            required
          >
            <option value="Secret Rare">Secret Rare</option>
            <option value="Uncommon Rare">Uncommon Rare</option>
            <option value="Ultra Rare">Ultra Rare</option>
          </select>

          <input
            type="text"
            name="chains"
            placeholder="Chains (e.g., ETH)"
            value={formData.chains}
            onChange={handleChange}
            className={styles['create-product__input']}
            required
          />

          <select
            name="collection"
            value={formData.collection}
            onChange={handleChange}
            className={styles['create-product__input']}
            required
          >
            <option value="Shoes">Shoes</option>
            <option value="Dresses">Dresses</option>
            <option value="Coats">Coats</option>
            <option value="Shirts">Shirts</option>
            <option value="Pants">Pants</option>
          </select>

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className={styles['create-product__input']}
            min="0"
            required
          />

          <div className={styles['create-product__image-section']}>
            <input
              type="file"
              id="product-image"
              onChange={handleImageUpload}
              className={styles['create-product__image-input']}
              accept="image/*"
            />
            <button
              type="button" 
              className={styles['create-product__image-button']}
              onClick={() => document.getElementById('product-image')?.click()}
            >
              <i className="fas fa-image" /> Add Image
            </button>
            {formData.image && (
              <img 
                src={formData.image} 
                alt="Preview" 
                className={styles['create-product__image-preview']} 
              />
            )}
          </div>

          <div className={styles['create-product__checkbox-group']}>
            <label className={styles['create-product__checkbox-label']}>
              <input
                type="checkbox"
                name="onSale"
                checked={formData.onSale}
                onChange={handleChange}
                className={styles['create-product__checkbox']}
              />
              On Sale
            </label>
          </div>

          <button type="submit" className={styles['create-product__submit']}>
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;