import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center"
  },
  carouselItem: {
    textDecoration: "none",
    color: "gold",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white"
  }
});

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function Carousel() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const classes = useStyles();

  const { currency, symbol } = CryptoState();

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };

  const responsive = {
    0: {
      items: 2
    },
    512: {
      items: 4
    }
  };
  console.log(trendingCoins);

  const items = trendingCoins.map(coin => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(3))}
        </span>
      </Link>
    );
  });
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        autoPlayInterval={1000}
        infinite
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
}

export default Carousel;
