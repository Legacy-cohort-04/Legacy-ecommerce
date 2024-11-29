import React, { useState } from 'react';
import axios from 'axios';
import styles from './profile.module.css'

export default function Profile() {
  const [imageUrl, setimageUrl] = useState<string>(""); // image URL is a string
  const [image, setimage] = useState<File | null>(null); // image state is either a File or null

   ////// this the cover image states ////////////// 

   const [coverUrl, setCoverURl] = useState<string>(""); 
   const [cover, setCover] = useState<File | null>(null);

   ////// this the cover image states ////////////// 


   
  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("No image selected");
      return;
    }
    alert("image uploaded successfully")

    const data = new FormData();
    data.append('file', image);  ////  (image state ) // image now is preparing to be uploaded to the  cloudinary 
    data.append('upload_preset', 'legacy');
    data.append('cloud_name', 'dpqkzgd5z');

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpqkzgd5z/image/upload",   /// image uploaded 
        data
      );
      setimageUrl(response.data.secure_url); //// we are setting the image received from the cloudinary in the imageUrl 
      console.log(response.data);    //// the imageUrl is the iameg being diplayed in the html 
    } catch (error) {
      console.log("Error uploading image to Cloudinary", error);
    }
  };

  console.log("image url", imageUrl)
  return (
    <div>
      <div className={styles.profilePage}>
        <div className={styles.profileHeader}>
          <div className={styles.coverPhoto}> this the cover image
          <img src="" alt="" />

          <form onSubmit={handleImageUpload} >
          <input 
            type="file" 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {  /// here is saying if the we take a picture from our desktop 
                setimage(e.target.files[0]);   /// / (image state )  // thsi is the 1 st one
              }
            }} 
    />
    <button type="submit">Upload</button>   
  </form>
             </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileImageWrapper}>
              <img 
                src={imageUrl || "https://i.sstatic.net/l60Hf.png"}  //// I need to declare the string of the image because the next does that 
                alt="Profile" 
                className={styles.profileImage}
              />
              <form onSubmit={handleImageUpload} >
                <input 
                  type="file" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {    /// here is saying if the we take a picture from our desktop 
                      setimage(e.target.files[0]);   /// / (image state )  // thsi is the 1 st one
                    }
                  }} 
                />
                <button type="submit">Upload</button>   
              </form>
            </div>
            <h1 className={styles.profileName}>John Doe</h1>
          </div>
           </div>
          
        <div className={styles.profileContent}>
          <p>Welcome to John Doe's profile page!</p>
        </div>

        <div className={styles.profileNavigation}>
          <nav className= {styles.navigationToProfile}>
            <ul className= {styles.ulNvigationProfile}>
              <li className= {styles.liNavigationProfile}><a href="#">Posts</a></li>
              <li className= {styles.liNavigationProfile}><a href="#">About</a></li>
              <li className= {styles.liNavigationProfile}><a href="#">Friends</a></li>
              <li className= {styles.liNavigationProfile}><a href="#">Photos</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
