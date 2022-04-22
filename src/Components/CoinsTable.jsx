import { React, useEffect, useState} from 'react'
import { CoinList } from '../config/api';
import axios from "axios";
import { CryptoState } from '../CryptoContext';
import { createTheme, ThemeProvider, Container, Typography, TextField, TableContainer, LinearProgress,
    Table, TableHead, TableRow, TableCell, TableBody, makeStyles, } from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import Pagination from "@material-ui/lab/Pagination";
import { numberWithCommas } from './Banner/Carousel';

const useStyles = makeStyles(() => ({
    row: {
        backgroundColor: "#030a17",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
          "& .MuiPaginationItem-root": {
              color: "gold",
          }
      },
}));


const CoinsTable = () => {

    const [search, setsearch] = useState("");
    const [page, setpage] = useState(1)

    const { currency , symbol, coins, loading, fetchCoins} = CryptoState();

    

    const navigate = useNavigate();
    const classes = useStyles();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark"
        },
    });

    

    useEffect(() => {
        fetchCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        ));
    };
   
  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: "center"}}>
            <Typography
            variant= "h4"
            style={{
                margin: 18,
                fontFanily: "Montserrat"
            }}
            >
                Cyptocurrency Prices by Market Cap
            </Typography>
            <TextField label="Search for a Crypto Currency..." 
            variant='outlined'
            style={{
                marginBottom: 20,
                width: "100%"
            }}
            onChange={(e)=> setsearch(e.target.value)}/>
            <TableContainer>
                {loading ? (<LinearProgress style={{ backgroundColor: "gold" }}/>): (
                    <Table>
                        <TableHead style={{ backgroundColor: "#40DFEF" }} >
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head)=>(
                                    <TableCell
                                        style={{
                                            color: "black",
                                            fontWeight: "700",
                                            fontFamily: "Montserrat"
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "": "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch().slice((page -1) * 10, (page -1) * 10 + 10).map((row) => {
                                const profit = row.price_change_percentage_24h > 0;

                                return (
                                    <TableRow
                                    onClick={() => navigate(`coins/${row.id}`)}
                                    className={classes.row}
                                    key={row.name}
                                    >
                                        <TableCell
                                        component='th'
                                        scope="row"
                                        style={{
                                            display:"flex",
                                            gap: 15
                                        }}
                                        >
                                            <img 
                                                src={row?.image}
                                                alt={row.name}
                                                height="50"
                                                style={{ marginBottom: 10 }}
                                            />
                                            <div
                                                style={{ display: "flex", flexDirection: "column" }}>
                                                <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                                    
                      <TableCell
                          align="right">
                          {symbol}{""}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                            align="right"
                            style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500
                            }}
                        >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                            )}M
                        </TableCell>
                                       
                        </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )}
                
            </TableContainer>
            <Pagination
            style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}
                classes={{ ul: classes.pagination}}
                onChange={(_, value) => {
                    setpage(value);
                    window.scroll(0,450);
                }}
                count = {Number((handleSearch().length/10).toFixed(0))} 
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable