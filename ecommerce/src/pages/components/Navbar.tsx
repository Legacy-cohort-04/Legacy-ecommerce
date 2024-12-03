import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {FiSearch,FiShoppingCart,FiBell,FiMessageSquare,FiChevronDown,FiLogOut} from "react-icons/fi";
import styles from "./Navbar.module.css";
import ChatWidget from '../chat/ChatWidget';


const Navbar: React.FC = () => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string>("/default-avatar.png");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const savedAvatar =
      userData.avatar || localStorage.getItem(`userAvatar_${userData.id}`);
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/index");
    window.location.reload();
  };

  return (
    <>
      <div className={styles.navContainer}>
      <a onClick={() => router.push("/Home/home")} className={styles.logo}>
      Logo
        </a>
        <div className={styles.navCenter}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="search"
              className={styles.searchBar}
              value={searchQuery}
               />
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
          <button className={styles.iconButton}>
            <FiBell size={20} />
          </button>
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
