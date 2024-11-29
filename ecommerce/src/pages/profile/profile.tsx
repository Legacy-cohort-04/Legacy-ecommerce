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

  const [showEdit, setShowEdit] = useState<Boolean>(false)
  const [showEditProfile, setShowEditProfile] = useState<Boolean>(false)

  const [editMode, setEditMode] = useState("personalInfo"); // Tracks editing section

  ////// edit profile name and email and password //////

  


  
  ////// edit profile name and email and password //////



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


  console.log('showEditProfile::::::', showEditProfile)
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
        <h1 className={styles.profileName}>John smith</h1>
        <h3 className={styles.profileGmail}>johnSmith22@gmail.com</h3>
        {!showEdit ? (
        <div
          className={styles.editProfile}
          onClick={() => setShowEdit(true)}
        >
          Edit Profile
        </div>
      ) : (
        <div className={styles.editProfileModal}>
          {/* Close Button */}
          <button
            className={styles.closeButton}
            onClick={() => setShowEdit(false)}
          >
            Close
          </button>

          {/* Edit Mode Buttons */}
          <div className={styles.editOptions}>
            <button
              onClick={() => setEditMode("personalInfo")}
              className={editMode === "personalInfo" ? styles.activeButton : ""}
            >
              Edit Personal Information
            </button>
            <button
              onClick={() => setEditMode("password")}
              className={editMode === "password" ? styles.activeButton : ""}
            >
              Edit Password
            </button>
          </div>

          {/* Edit Content */}
          <div className={styles.editContent}>
            {editMode === "personalInfo" && (
              <div className={styles.editSection}>
                <label htmlFor="username">Edit Username</label>
                <input type="text" id="username" placeholder="Enter new username" />
                <label htmlFor="email">Edit Email</label>
                <input type="email" id="email" placeholder="Enter new email" />
              </div>
            )}
            {editMode === "password" && (
              <div className={styles.editSection}>
                <label htmlFor="password">New Password</label>
                <input type="password" id="password" placeholder="Enter new password" />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter new password"
                />
              </div>
            )}
          </div>
        </div>
      )}   
          </div>
           <div className={styles.pageWrapper}>
       <div className={styles.allPostsOntheSide}>
         <a href="#">All Products</a>
         <div className={styles.imageBox}>Image 1</div>
         <div className={styles.imageBox}>Image 2</div>
         <div className={styles.imageBox}>Image 3</div>
         {/* Add more images dynamically later */}
       </div>
       <div className={styles.allPosts}>
         <div className={styles.post}>
           <h2>Post Title</h2>
           <p>This is a sample post content.</p>
         </div>
         <div className={styles.post}>
           <h2>Another Post</h2>
           <p>This is another post content.</p>
         </div>
         {/* Add more posts dynamically */}
       </div>
     </div>

      
    </div>
  );
}
