import React from 'react';
import styles from './footer.module.css';


const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.logo}>LOGO</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque donec non pellentesque ut.</p>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>About</h4>
          <ul className={styles.footerList}>
            <li className={styles.footerListItem}>Product</li>
            <li className={styles.footerListItem}>Resource</li>
            <li className={styles.footerListItem}>Term & Condition</li>
            <li className={styles.footerListItem}>FAQ</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Company</h4>
          <ul className={styles.footerList}>
            <li className={styles.footerListItem}>Our Team</li>
            <li className={styles.footerListItem}>Partner With Us</li>
            <li className={styles.footerListItem}>Privacy & Policy</li>
            <li className={styles.footerListItem}>Features</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Contact</h4>
          <ul className={styles.footerList}>
            <li className={styles.footerListItem}>+012 3456789</li>
            <li className={styles.footerListItem}>adorableprogrammer@gmail.com</li>
            <div className={styles.socialIcons}>
              <a href="#"><img src="/youtube-icon.svg" alt="YouTube" /></a>
              <a href="#"><img src="/discord-icon.svg" alt="Discord" /></a>
              <a href="#"><img src="/instagram-icon.svg" alt="Instagram" /></a>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;