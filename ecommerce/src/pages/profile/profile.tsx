import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./profile.module.css";
import Image from "next/image";
import uploadIcon from "./uploadIcon.png";
import defaultProfile from "./defaultProfile.png";
import defaultCover from "./defaultCover.jpg";

export default function Profile() {
  const [imageUrl, setimageUrl] = useState<string>(""); // Profile image URL
  const [image, setimage] = useState<File | null>(null); // Profile image file

  const [coverUrl, setCoverUrl] = useState<string>(""); // Cover image URL
  const [cover, setCover] = useState<File | null>(null); // Cover image file

  const [postUrll, setPostUrl] = useState<string>("");
  console.log("postUrll", postUrll);
  const [post, setpost] = useState<File | null>();

  const [showEdit, setShowEdit] = useState<Boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<Boolean>(false);

  const [editMode, setEditMode] = useState("personalInfo"); // Tracks editing section

  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  const [oneComment, setOneComment] = useState<string>("");
  const [rerenderComment, setrerenderComment] = useState<Boolean>(false);

  const [onePost, setonePost] = useState<string>("");

  ////// edit profile name and email and password upadate requests //////

  ////// edit profile name and email and password  update requests //////

  ///// updating user Image /////////
  const updateUserImage = async () => {
    try {
      const result = await axios.put("http://localhost:3001/user/userImage/1", {
        image: imageUrl,
      });

      console.log(result.data);
    } catch (err) {
      console.log("error updating user info", err);
    }
  };

  const handleImageUpload = async (
    file: File,
    setUrl: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "legacy");
    data.append("cloud_name", "dpqkzgd5z");
    updateUserImage(); ///updating user image
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

  //////////// getting post and posting posts //////////

  interface Request {
    params: {
      id: string;
    };
  }

  interface Response {
    send: (body: any) => void;
    status: (statusCode: number) => Response;
  }

  //   const user = localStorage.getItem("user");
  // if (user) {
  //   const iduser = JSON.parse(user).id;
  //   // Continue with using `iduser`
  // } else {
  //   // Handle the case when there is no user in localStorage
  //   console.error("User not found in localStorage");
  // }

  // const user = localStorage.getItem("user");

  // let iduser: string | undefined;

  // if (user) {
  //   const parsedUser = JSON.parse(user);
  //   iduser = parsedUser?.id; // Safely access the 'id' property
  // } else {
  //   console.error("User not found in localStorage");
  // }

  const gettingPosts = async () => {
    try {
      const result = await axios.get(`http://localhost:3001/posts/allPost/1`);
      setPosts(result.data);
      console.log("there are the posts ", result.data);
    } catch (err) {
      console.error("Error getting posts:", err);
    }
  };

  console.log("posts😂😂😂", posts);

  ////// posting comment //////////
  const postingComment = async () => {
    try {
      const result = await axios.post(
        `http://localhost:3001/comment/oneComment/12`,
        {
          content: oneComment,
        }
      );
      console.log("posting comment", result.data);
      setrerenderComment(!rerenderComment);
    } catch (err) {
      console.log(err);
    }
  };

  //////////// getting post and posting posts //////////

  const postingPost = async () => {
    try {
      const result = await axios.post(
        "http://localhost:3001/posts/createPost",
        {
          content: onePost,
          image: postUrll, // Image URL from Cloudinary
          UserId: "1",
        }
      );
      //   setrerenderComment(!rerenderComment)
      console.log("Post created:", result.data);
      // You can add logic to update the posts list or re-render as necessary
    } catch (err) {
      console.error("Error posting the post:", err);
    }
  };

  ///// last name State
  const [editlastName, setediLastName] = useState<string>("");
  const [editUsername, seteditUsername] = useState<string>("");
  const [editUserEmail, seteditUserEmail] = useState<string>("");

  const [userInfo, setUserInfo] = useState<any>({});

  const updateUser = async () => {
    try {
      const result = await axios.put(
        "http://localhost:3001/user/updateUser/1",
        {
          email: editUserEmail,
          firstName: editUsername,
          lastName: editlastName,
        }
      );

      console.log(result.data);
    } catch (err) {
      console.log("error updating user info", err);
    }
  };

  // getting user info

  const getUserInfo = async () => {
    try {
      const result = await axios.get(`http://localhost:3001/user/oneuser/1`);

      console.log("getUserInfo:", result.data);
      setUserInfo(result.data);
    } catch (err) {
      console.log("error getting user user info", err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);



  const [view,setView] = useState<Boolean>(false);

  const deletePost = async (postID: String)=>{
    try {
      const result = await axios.delete(`http://localhost:3001/posts/${postID}`)
      console.log(result.data)
      setView(!view)
    } 
    catch (err) {
      console.log(err)
    }
    
  }

  useEffect(() => {
    gettingPosts();
  }, [view]);


  console.log("showEditProfile::::::", showEditProfile);
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
            width={150} // Set width for the profile image
            height={150} // Set height for the profile image
          />
          <label htmlFor="profileUpload" className={styles.uploadButton}>
            <Image
              src={uploadIcon}
              alt="Upload-image"
              className={styles.uploadIcon}
              width={24} // Set width for upload icon
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
        <h1 className={styles.profileName}>{userInfo.firstName}</h1>
        <h1 className={styles.profileName}>{userInfo.lastName}</h1>
        <h3 className={styles.profileGmail}>{userInfo.email}</h3>

        <h4 className={styles.profileDescription}>
          {" "}
          John is a passionate and driven individual with a natural curiosity
          for learning and a talent for creative problem-solving. He has a keen
          eye for detail, coupled with an ability to see the bigger picture,
          which allows him to excel in both collaborative and independent
          environments. John is known for his positive attitude and excellent
          communication skills, making him a reliable and approachable team
          player. Outside of work, he enjoys exploring new hobbies, connecting
          with people from diverse backgrounds, and contributing to his
          community through volunteer work. John’s dedication and adaptability
          make him a valuable asset in any setting.
        </h4>

        {!showEdit ? (
          <div className={styles.editProfile} onClick={() => setShowEdit(true)}>
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
                className={
                  editMode === "personalInfo" ? styles.activeButton : ""
                }
              >
                Edit Personal Information
              </button>
            </div>

            {/* Edit Content */}
            <div className={styles.editContent}>
              {editMode === "personalInfo" && (
                <div className={styles.editSection}>
                  <label htmlFor="username">Edit first Name</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="username"
                    onChange={(e) => {
                      seteditUsername(e.target.value);
                    }}
                  />

                  <label htmlFor="userLastName">Edit Last name</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="lastname"
                    onChange={(e) => {
                      setediLastName(e.target.value);
                    }}
                  />

                  <label htmlFor="email">Edit Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter new email"
                    onChange={(e) => {
                      seteditUserEmail(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateUser();
                    }}
                  >
                    edit profile
                  </button>

                  <label htmlFor="">post Image</label>
                  <input
                    type="file"
                    // className={styles.fileInput}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setpost(e.target.files[0]); // Set profile image file
                        handleImageUpload(e.target.files[0], setPostUrl); // Upload profile image , works together
                      }
                    }}
                  />

                  <label htmlFor="">enter content to the image you added</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setonePost(e.target.value);
                    }}
                  />

                  <button
                    onClick={() => {
                      postingPost();
                    }}
                  >
                    amazing post
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.pageWrapper}>
        <div className={styles.allPostsOntheSide}>
          <a href="#">All Products</a>
          {posts.map((post, index) => (
            <div key={index} className={styles.imageBox}>
              <img
                src={post.image}
                alt={`Post Preview ${index + 1}`}
                className={styles.sidebarPostImage}
              />
              <p className={styles.sidebarPostContent}>
                {post.content.slice(0, 30) || "Post Preview"}
              </p>
              <button onClick={()=>{
                        deletePost(post.id)
              }} >del</button>
            </div>
          ))}
        </div>
        <div className={styles.allPosts}>
          {posts.map((elem, index) => (
            <>
              <div className={styles.ProfileInsideProfile}>
                <img
                  src={imageUrl}
                  alt="profileImageInpost"
                  className={styles.profileImageInpost}
                />
                <h5 className={styles.userName}> User Name </h5>
              </div>
              <div key={index} className={styles.post}>
                <img
                  src={elem.image}
                  alt="postImages"
                  className={styles.postImage}
                />
                <p className={styles.postContent}>
                  {elem.content || "This is a sample post content."}
                </p>
              </div>
              <div className={styles.commentSection}>
                <input
                  type="text"
                  className={styles.postCommentInput}
                  placeholder="Write a comment..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // here I"m going to take the comment
                    setOneComment(e.target.value);
                  }}
                />
                <button
                  className={styles.postCommentButton}
                  onClick={() => {
                    postingComment();
                  }}
                >
                  Post Comment
                </button>
                {comments.map((comment, index) => (
                  <div key={index} className={styles.OneComment}>
                    <h5>{comment.user}</h5>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
