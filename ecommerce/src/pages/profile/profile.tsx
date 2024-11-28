import React, { useState } from 'react';
import axios from 'axios';
import styles from './profile.module.css'

export default function Profile() {
  const [imageUrl, setimageUrl] = useState<string>(""); // image URL is a string
  const [image, setimage] = useState<File | null>(null); // image state is either a File or null

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("No image selected");
      return;
    }
    alert("image uploaded successfully")

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'legacy');
    data.append('cloud_name', 'dpqkzgd5z');

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpqkzgd5z/image/upload",
        data
      );
      setimageUrl(response.data.secure_url);
      console.log(response.data);
    } catch (error) {
      console.log("Error uploading image to Cloudinary", error);
    }
  };

  console.log("image url", imageUrl)
  return (
    <div>
      <div className={styles.profilePage}>
        <div className={styles.profileHeader}>
          <div className={styles.coverPhoto}></div>
          <div>
            <img src="" alt="" />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileImageWrapper}>
              <img 
                src={imageUrl || "https://i.sstatic.net/l60Hf.png"} 
                alt="Profile" 
                className={styles.profileImage}
              />
              <form onSubmit={handleImageUpload}>
                <input 
                  type="file" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setimage(e.target.files[0]);
                    }
                  }} 
                />
                <button type="submit">Upload</button>
              </form>
            </div>
            <h1 className={styles.profileName}>John Doe</h1>
          </div>
        </div>
        <div className={styles.profileNavigation}>
          <nav>
            <ul>
              <li><a href="#">Posts</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Friends</a></li>
              <li><a href="#">Photos</a></li>
            </ul>
          </nav>
        </div>
        <div className={styles.profileContent}>
          <p>Welcome to John Doe's profile page!</p>
        </div>
      </div>
    </div>
  );
}
