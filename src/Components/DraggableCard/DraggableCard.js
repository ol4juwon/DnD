import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
const DraggableCard = ({ id, image,tag, index, moveCard }) => {
  const ref = useRef(null);
  const user = useSelector(state => state.auth.user);
  const [{ handlerId }, drop] = useDrop({
    accept: "grid",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }
      // // Dragging upwards
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return;
      // }
      // Time to actually perform the action
      user &&  moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "grid",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <Grid item xs={4} sm={4} md={3} ref={ref} data-handler-id={handlerId}>
      <Card sx={[{ maxWidth: 345, borderRadius: 10 },
      {
        '&:hover': {
          color: 'red',
          backgroundColor: 'white',
          borderColor: "red",
          borderWidth: 1,
        },
      },
      ]}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            
            image={image}
            alt="green iguana"
            sx={[{
              filter: 'grayscale(100%)',
            },
              {
                '&:hover': {
                  filter:'none',
                  color: 'red',
                  backgroundColor: 'orange',
                  borderColor: "red",
                  borderWidth: 1,
                },
              },
            ]}
          />
          <CardContent paddingY={"4px"}>
            {tag.map((item, index) => <Typography key={index} variant="span" textTransform={"capitalize"} color="text.secondary" sx={[
              {backgroundColor: "#ff7100", color: "white", textTransform: "capitalize",paddingX: '15px', paddingY:"10px", margin: '2px', borderRadius: "10px"},
              {'&:hover': {
              color: "orange",
            }}]}>
             {item}
            </Typography>)}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default DraggableCard;
