import React from "react";

const Photo = ({ image, likes, user_Name, user_Image, user_Portfolio }) => {
  console.log(likes);
  return (
    <article className="photo">
      <img src={image} alt="" />
      <div className="photo-info">
        <div>
          <h4>{user_Name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={user_Portfolio}>
          <img src={user_Image} alt="" className="user-img" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
