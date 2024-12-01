import React from "react";
// import Image from "next/image";
import NavBar from "../components/Navbar.tsx";
import styles from './aboutus.module.css';

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className={styles.genralAbout}>
        <div className={styles.aboutUsContainer}>
          <h5 className={styles.headingSmall}>About us</h5>
          <h1 className={styles.headingLarge}>Who we are</h1>
          <p className={styles.paragraph}>
              Legacy is a renowned fashion powerhouse, known for its innovative
              approach to design and a commitment to delivering high-quality,
              trendsetting pieces...
          </p>
          <button className={styles.moreButton}>More +</button>
        </div>
  
       <div className={styles.detailsContainer}>
        <div className={styles.section}>
          <h5 className={styles.headingSmall}>Since 2020</h5>
          <h1 className={styles.headingLarge}>What we do</h1>
          <p className={styles.paragraph}>
            Legacy specializes in creating stylish, high-quality clothing and
            accessories that cater to modern fashion trends...
          </p>
          <button className={styles.moreButton}>More +</button>
        </div>

        <div className={styles.imageSection}>
          <span>Image</span>
          <img />
        </div>

        <div className={styles.section}>
          <img />
          <h1 className={styles.headingLarge}>When We Started</h1>
          <p className={styles.paragraph}>
            Legacy specializes in creating stylish, high-quality clothing and
            accessories that cater to modern fashion trends...
          </p>
          <button className={styles.moreButton}>More +</button>
        </div>

        <div className={styles.ourMarkers}>
          <div className={styles.markersDescription}>
          <h1 className={styles.headingLarge}>Our Markers</h1>
          <h5 className={styles.headingSmall}>
            ...stylish, high-quality clothing and accessories...
          </h5>
          </div>

          <div className={styles.marker}>
            <span>1</span>
            <img />
            <h3 className={styles.markerName}>David</h3>
            <div className={styles.markerRole}>Co-Founder</div>
          </div>
          <div className={styles.marker}>
            <span>2</span>
            <img />
            <h3 className={styles.markerName}>David</h3>
            <div className={styles.markerRole}>Finance</div>
          </div>
          <div className={styles.marker}>
            <span>3</span>
            <img />
            <h3 className={styles.markerName}>Cory</h3>
            <div className={styles.markerRole}>CEO</div>
          </div>
          <div className={styles.marker}>
            <span>4</span>
            <img />
            <h3 className={styles.markerName}>James</h3>
            <div className={styles.markerRole}>CTO</div>
          </div>
          <div className={styles.marker}>
            <span>5</span>
            <img />
            <h3 className={styles.markerName}>Hamid</h3>
            <div className={styles.markerRole}>COO</div>
          </div>
          <div className={styles.marker}>
            <span>6</span>
            <img />
            <h3 className={styles.markerName}>Ala</h3>
            <div className={styles.markerRole}>Member</div>
          </div>
         </div>

         <footer className={styles.footer}>
          <div className={styles.logo}>Logo</div>
          <h4 className={styles.footerText}>
            ...stylish, high-quality clothing and accessories...
          </h4>
          <div className={styles.contact}>
            <h2>Contact</h2>
            <h3>+22 955552 2255</h3>
            <h3>amleekhimddibi@gmail.com</h3>
          </div>
          <div className={styles.company}>
            <h2>Company</h2>
            <h3>Our Team</h3>
            <h3>Partner With Us</h3>
            <h3>Privacy & Policy</h3>
            <h3>Features</h3>
          </div>
          <div className={styles.about}>
            <h2>About</h2>
            <h3>Product</h3>
            <h3>Resources</h3>
            <h3>Terms & Conditions</h3>
            <h3>FAQ</h3>
          </div>
          </footer>
       </div>
      </div>
    </>
  );
};

export default AboutUs;

