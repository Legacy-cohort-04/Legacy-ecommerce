import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './Allproducts.module.css'; 
import Sidebar from "./ProductsBar/ProductsBar";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  rarity: string;
  chains: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const navigate = useRouter();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/products", {
        params: filters,
      });
      setProducts(data);
    } catch {
      setError("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters: Record<string, any>) =>
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));

  const handleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleOwner = async (id: number) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/products/increment/${id}`
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error incrementing owner count:", error);
    }
  };

  const handleAddToCart = async (productId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const result = await Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to add products to the cart",
        showCancelButton: true,
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      });
      if (result.isConfirmed) navigate.push("/");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/cart/add",
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: "Product successfully added to your cart",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding to the cart",
      });
    }
  };

  const handleRarityChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    handleFilterChange({ rarity: e.target.value });
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    handleFilterChange({ sort: e.target.value });

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
          <div className={styles.AllProductsContainer}>

      <div className={styles.productListContainer}>
        <div className={styles.sidebarContainer}>
          <Sidebar onFilterChange={handleFilterChange} />
        </div>
        <div className={styles.contentSection}>
          <div className={styles.headerBar}>
            <div className={styles.headerLeft}>
              <div className={styles.totalItems}>{products.length} items</div>
            </div>
            <div className={styles.headerFilters}>
              <select
                className={styles.headerFilterButton}
                onChange={handleRarityChange}
              >
                <option value="" className={styles.text}>
                  All Items
                </option>
                <option value="Secret Rare" className={styles.text}>
                  Secret Rare
                </option>
                <option value="Uncommon Rare" className={styles.text}>
                  Uncommon Rare
                </option>
                <option value="Ultra Rare" className={styles.text}>
                  Ultra Rare
                </option>
              </select>
              <select
                className={styles.headerFilterButton}
                onChange={handleSortChange}
              >
                <option value="" className={styles.text}>
                  Sort By
                </option>
                <option value="price_asc" className={styles.text}>
                  Price: Low to High
                </option>
                <option value="price_desc" className={styles.text}>
                  Price: High to Low
                </option>
                <option value="newest" className={styles.text}>
                  Newest First
                </option>
              </select>
            </div>
          </div>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageContainer}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productHeader}>
                    <span
                      className={`${styles.rarityBadge} ${product.rarity
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {product.rarity}
                    </span>
                    <span className={styles.chains}>{product.chains}</span>
                  </div>
                  <div className={styles.productTitlePrice}>
                    <h2 className={styles.productTitle}>{product.title}</h2>
                    <span className={styles.productPrice}>
                      {product.price.toLocaleString()} ETH
                    </span>
                  </div>
                  <div className={styles.productFooter}>
                    <button
                      className={`${styles.likeButton} ${
                        likedProducts.includes(product.id) ? styles.liked : ""
                      }`}
                      onClick={() => handleLike(product.id)}
                    >
                      {likedProducts.includes(product.id) ? "❤️" : "🤍"}
                    </button>
                    <button
                      className={styles.buyButton}
                      onClick={() => {
                        handleOwner(product.id);
                        handleAddToCart(product.id);
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

    </>
  );
};

export default ProductList;