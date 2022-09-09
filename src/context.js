import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const clientID = "?client_id=" + process.env.REACT_APP_ACCESS_KEY;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const inputContainer = React.useRef(null);

  //Submit handle
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputContainer.current.value) {
      setQuery(inputContainer.current.value);
      setPage(1);
      setPhotos([]);
    }
  };

  useEffect(() => {
    (async () => {
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
    })();
  }, [page, query]);

  const scrollHandle = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setPage((pages) => pages + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandle);
    return () => window.removeEventListener("scroll", scrollHandle);
  }, []);

  return (
    <AppContext.Provider
      value={{ loading, photos, setPhotos, handleSubmit, inputContainer }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
