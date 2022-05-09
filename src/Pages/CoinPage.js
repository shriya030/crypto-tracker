import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import CoinInfo from "../Components/CoinInfo";
import { Typography } from "@mui/material";
import parse from "html-react-parser";
import "../App.css";
import numberWithCommas from "../Components/Banner/Carousel";

const useStyles = makeStyles({
  container: {
    display: "flex",
    "@media (max-width: 900px)": {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  sidebar: {
    width: "30%",
    "@media (max-width: 900px)": {
      width: "100%"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey"
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify"
  }
});

function CoinPage() {
  const { id } = useParams(); // Only variable that is there in our url
  const [coin, setCoin] = useState("");
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const classes = useStyles();
  console.log(coin);
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography
          variant="h3"
          className={classes.heading}
          style={{ fontFamily: "Montserrat" }}
        >
          {coin?.name}
        </Typography>

        <Typography
          variant="subtitle1"
          className={classes.description}
          style={{ fontFamily: "Montserrat" }}
        >
          {parse(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              className={classes.heading}
              style={{ fontFamily: "Montserrat", fontWeight: "bold" }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              className={classes.heading}
              style={{ fontFamily: "Montserrat", fontWeight: "bold" }}
            >
              Curernt Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol} {numberWithCommas(coin.current_price)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              className={classes.heading}
              style={{ fontFamily: "Montserrat", fontWeight: "bold" }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
        </div>
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
}

export default CoinPage;
