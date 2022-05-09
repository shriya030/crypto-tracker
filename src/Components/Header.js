import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles({
  title: {
    flexGrow: 1, // full width
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "800",
    cursor: "pointer"
  }
});

function Header() {
  const classes = useStyles();

  const navigate = useNavigate(); // pushes to a particular route

  const { currency, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      mode: "dark"
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              Cryto Tracker
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15
              }}
              value={currency}
              onChange={e => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
