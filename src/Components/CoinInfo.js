import axios from "axios";
import React, { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Line } from "react-chartjs-2";
import SelectButton from "./SelectButton";
import Chart from "chart.js/auto";
import { chartDays } from "../config/data";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 440,
      sm: 740,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});

const useStyles = makeStyles({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0
    }
  }
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff"
    },
    mode: "dark"
  }
});

function CoinInfo({ coin }) {
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);
  const { currency } = CryptoState();

  const fetchChartData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    // console.log(data); // has date and price 0 - date, 1 - price
    setFlag(true);
    setChartData(data.prices);
  };

  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const classes = useStyles();
  console.log(typeof chartData);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!chartData | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            thickness={1}
            size={250}
          />
        ) : (
          <>
            <Line
              data={{
                labels: chartData.map(coin => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: chartData.map(coin => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D"
                  }
                ]
              }}
              options={{
                elements: {
                  point: {
                    radius: 1
                  }
                }
              }}
            />
            {/* To remove those small circles */}
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%"
              }}
            >
              {chartDays.map(day => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}

        {/* buttons */}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
