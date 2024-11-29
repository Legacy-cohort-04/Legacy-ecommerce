import React, { useState } from 'react';
import axios from 'axios';
import styles from './profile.module.css';
import Image from 'next/image';
import uploadIcon from './uploadIcon.png';
import defaultProfile from './defaultProfile.png';
import defaultCover from './defaultCover.jpg';

export default function Profile() {
  const [imageUrl, setimageUrl] = useState<string>(""); // Profile image URL
  const [image, setimage] = useState<File | null>(null); // Profile image file

  const [coverUrl, setCoverUrl] = useState<string>(""); // Cover image URL
  const [cover, setCover] = useState<File | null>(null); // Cover image file

  const handleImageUpload = async (file: File, setUrl: React.Dispatch<React.SetStateAction<string>>) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'legacy');
    data.append('cloud_name', 'dpqkzgd5z');

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpqkzgd5z/image/upload",
        data
      );
      setUrl(response.data.secure_url);
      console.log(response.data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
      alert("Image upload failed.");
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.coverSection}>
        <Image
          src={coverUrl || defaultCover} 
          alt="Cover"
          className={styles.coverImage}
          width={1200}  
          height={400}  
        />
        <label htmlFor="coverUpload" className={styles.uploadButton}>
          <Image
            src={uploadIcon || "defaultCover"} 
            alt="Upload-image"
            className={styles.uploadIcon}
            width={24} 
            height={24} 
          />
          <input
            id="coverUpload"
            type="file"
            className={styles.fileInput}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setCover(e.target.files[0]); // Set cover image file
                handleImageUpload(e.target.files[0], setCoverUrl); // Upload cover image, working together too!
              }
            }}
          />
        </label>
      </div>

      <div className={styles.profileInfo}>
        <div className={styles.profileImageWrapper}>
          <Image
            src={imageUrl || defaultProfile} 
            alt="Profile"
            className={styles.profileImage}
            width={150}  // Set width for the profile image
            height={150} // Set height for the profile image
          />
          <label htmlFor="profileUpload" className={styles.uploadButton}>
            <Image
              src={uploadIcon} 
              alt="Upload-image"
              className={styles.uploadIcon}
              width={24}  // Set width for upload icon
              height={24} // Set height for upload icon
            />
            <input
              id="profileUpload"
              type="file"
              className={styles.fileInput}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setimage(e.target.files[0]); // Set profile image file
                  handleImageUpload(e.target.files[0], setimageUrl); // Upload profile image , works together
                }
              }}
            />
          </label>
        </div>
        <h1 className={styles.profileName}>John Doe</h1>
      </div>

      <nav className={styles.profileNavigation}>
        <ul>
          <li><a href="#">Posts</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Friends</a></li>
          <li><a href="#">Photos</a></li>
        </ul>
      </nav>

      <div className={styles.profileContent}>
        <p>Welcome to John Doe's profile page!</p>
      </div>
    </div>
  );
}
