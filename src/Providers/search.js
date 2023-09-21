import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "@mui/material";
import imageData from "../utils/mock/images";

const SearchProvider = ({ children }) => {
  const [images, setImages] = useState([...imageData]);
  const [filtered, setFiltered] = useState(images);
  const [searchTerm, setSearchTerm] = useState("");
  const filter = useCallback(
    async (keyword)=> {
        console.info(keyword)
    
        const fx = images.filter((image) => image.tags.some(function(tag) {
            // Check if the tag contains the desired tag or partial match
            return tag.includes(keyword);
          }))
        console.log(fx);
        setFiltered(fx);
      },
    [],
  )

  useEffect(()=>{
    if(searchTerm.length > 0){
        filter(searchTerm);
    }
  },[filter, searchTerm])
  return (
    <>
      {children({
        images,
        filtered,
        searchTerm,
        setSearchTerm,

      })}
    </>
  );
};

export default SearchProvider;
