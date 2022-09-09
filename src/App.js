import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
//import data from "./data";
const clientID = "?client_id=" + process.env.REACT_APP_ACCESS_KEY;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const inputContainer = React.useRef(null);

  const hehe = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setPage((pages) => pages + 1);
    }
  };

  const fecthImage = async () => {
    try {
      setLoading(true);
      let url;
      url = query
        ? searchUrl + clientID + "&page=" + page + "&query=" + query
        : mainUrl + clientID + "&page=" + page;
      const data = query
        ? (await (await fetch(url)).json()).results
        : await (await fetch(url)).json();
      const newData = [
        ...photos,
        ...data.map((singleElement) => {
          return {
            id: singleElement.id,
            image: singleElement.urls.regular,
            user_Name: singleElement.user.name,
            user_Image: singleElement.user.profile_image.medium,
            user_Portfolio: singleElement.user.portfolio_url,
            likes: singleElement.likes,
          };
        }),
      ];
      setPhotos(newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputContainer.current.value) {
      setQuery(inputContainer.current.value);
      setPage(1);
      setPhotos([]);
    }
  };

  useEffect(() => {
    fecthImage();
  }, [page, query]);

  useEffect(() => {
    window.addEventListener("scroll", hehe);
    return () => window.removeEventListener("scroll", hehe);
  }, []);

  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="search"
            ref={inputContainer}
          />
          <button className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
