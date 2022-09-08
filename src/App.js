import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import data from "./data";
const clientID = "?client_id=" + process.env.REACT_APP_ACCESS_KEY;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let url;
        url = mainUrl + clientID;
        //const data = await (await fetch(url)).json();
        const newData = data.map((singleElement) => {
          return {
            id: singleElement.id,
            image: singleElement.urls.regular,
            user_Name: singleElement.user.name,
            user_Image: singleElement.user.profile_image.medium,
            user_Portfolio: singleElement.user.portfolio_url,
            likes: singleElement.likes,
          };
        });
        setPhotos(newData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input type="text" className="form-input" placeholder="search" />
          <button className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
