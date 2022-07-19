import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { CardActionArea, CardMedia, Paper, Typography } from "@mui/material";

const axios = require("axios").default;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomerCard({ content, onDelete }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(content);
  }, [content]);

  return (
    <>
      {list.map((item) => (
        <Item key={item._id} sx={{ m: "1rem", width: "30%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              width="300"
              align="center"
              alt=""
              src={item.img}
            />
          </CardActionArea>

          <Typography>{item.name}</Typography>
          <>
            <Link to={"/customer/edit/" + item._id}>
              <Button variant="danger" color="success">
                Edit
              </Button>
            </Link>
            <MDButton
              onClick={() => onDelete(item._id)}
              variant="primary"
              color="error"
            >
              Delete
            </MDButton>
          </>
        </Item>
      ))}
    </>
  );
}

export default CustomerCard;
