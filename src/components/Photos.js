import React from "react";
import Photo from "./Photo";
import { useGlobalContext } from "../context";
const Photos = () => {
  const { photos, loading } = useGlobalContext();
  return (
    <section className="photos">
      <div className="photos-center">
        {photos.map((photo, index) => {
          return <Photo key={index} {...photo} />;
        })}
      </div>
      {loading && <h2 className="loading">Loading...</h2>}
    </section>
  );
};

export default Photos;
