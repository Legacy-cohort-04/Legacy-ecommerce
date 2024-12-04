import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {FiSearch,FiShoppingCart,FiBell,FiMessageSquare,FiChevronDown,FiLogOut} from "react-icons/fi";
import styles from "./Navbar.module.css";
import ChatWidget from '../chat/ChatWidget';
import axios from "axios";


const Navbar: React.FC = () => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string>("https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData.id) {
      router.push("/");
      return;
    }
    const savedAvatar =
      userData.avatar || localStorage.getItem(`userAvatar_${userData.id}`);
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      try {
        const response = await axios.get(`http://localhost:3001/products/search?query=${value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <div className={styles.navContainer}>
      <a onClick={() => router.push("/Home/home")} className={styles.logo}>
      <img src="/images/legacy.png"  className={styles.logo} alt="" />
        </a>
        <div className={styles.navCenter}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="search"
              className={styles.searchBar}
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
            />
            {searchResults.length > 0 && searchTerm && (
              <div className={styles.searchResults}>
                {searchResults.map((product: any) => (
                  <div 
                    key={product.id} 
                    className={styles.searchResultItem}
                    onClick={() => {
                      setSearchTerm("");
                      setSearchResults([]);
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className={styles.searchResultImage}
                    />
                    <div className={styles.searchResultInfo}>
                      <div className={styles.searchResultTitle}>{product.title}</div>
                      <div className={styles.searchResultPrice}>{product.price} ETH</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <nav className={styles.navLinks}>
          <a onClick={() => router.push("/Home/home")} style={{ cursor: "pointer" }}>
          Home
            </a>
            <a onClick={() => router.push("/Products/Allproducts")} style={{ cursor: "pointer" }}>
              Explore <FiChevronDown />
            </a>
            <a onClick={() => router.push("/Home/PersonalCollection")} style={{ cursor: "pointer" }}>
              Personal Collection
            </a>
            <a href="#drops">Drops</a>
            <a onClick={() => router.push("/about")} className={styles.moreLink} style={{ cursor: "pointer" }}>
              More <FiChevronDown />
            </a>
          </nav>
        </div>
        <div className={styles.navRight}>

          <button 
            className={styles.iconButton} 
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <FiMessageSquare size={20} />
          </button>
          <button className={styles.walletBtn} onClick={() => router.push("/Products/Cart")}>
            <FiShoppingCart size={18} />
          </button>
          <img
            onClick={() => router.push("/profile/profile")}
            src={avatar}
            alt="Profile"
            className={styles.profileImg}
          />
          <button className={styles.iconButton} onClick={handleLogout}>
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Navbar;
