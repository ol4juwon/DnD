import React, { useCallback, useEffect, useState } from "react";
import update from "immutability-helper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DraggableCard from "../Components/DraggableCard/DraggableCard";
import imageData from "../utils/mock/images";
import SearchProvider from "../Providers/search";
import Navbar from "../Components/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState([]);
  const user = useSelector((state) => state?.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [filtered, setFiltered] = useState([...imageData]);
  const [cards, setCards] = useState(filtered);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback(
    (card, index) => {
      return (
        <DraggableCard
          key={index}
          index={index}
          id={card.id}
          tag={card.tags}
          image={card.src}
          moveCard={moveCard}
        />
      );
    },
    [moveCard]
  );
  const filter = useCallback(
    async (keyword) => {
      console.info(keyword);

      const fx = cards.filter((image) =>
        image.tags.some(function (tag) {
          // Check if the tag contains the desired tag or partial match
          return tag.includes(keyword);
        })
      );
      console.log(fx);
      setCards(fx);
    },
    [cards]
  );
  useEffect(() => {
    if (searchTerm.length > 0) {
      filter(searchTerm);
    }
  }, [filter, searchTerm]);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
    setIsLoading(false);
      
    }, 1000);
  },[])
  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Box sx={{ backgroundColor: "#96939B" }}></Box>
      {isLoading && (
        <Box
          sx={{
            mt: 15,
            mx: 5,
            backgroundColor: "#96939B",
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" size={120} sx={{color: "white", width:"20%"}} />
        </Box>
      )}
      {!isLoading && (
        <Box sx={{ mt: 15, mx: 5, backgroundColor: "#96939B" }}>
          <Grid
            container
            sx={{ backgroundColor: "#96939B" }}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {/* {images.map((item, index) => renderCard(item, index))} */}
            {cards.map((card, i) => renderCard(card, i))}
            {/* {filtered &&filtered.map((card, i) => renderCard(card, i))} */}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Home;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
