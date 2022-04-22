import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
const Crypto = createContext();


const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("INR");
    const [symbol, setsymbol] = useState("₹");
    const [coins, setcoins] = useState([]);
    const [loading, setloading] = useState(false);
    const [user, setuser] = useState(null)
    const [alert, setalert] = useState({
      open: false,
      message: "",
      type: "success"
    });
    const [watchList, setwatchList] = useState();

    useEffect(() => {
      onAuthStateChanged(auth, user=> {
        if (user)setuser(user);
        else setuser(null);
      });
    }, [])
    

    const fetchCoins = async() => {
      setloading(true);
      const { data } = await axios.get(CoinList(currency));

      setcoins(data)
      setloading(false);
  };
    
    useEffect(() => {
      if (currency === 'INR') setsymbol("₹");
      else if (currency === 'USD') setsymbol("$")
    }, [currency]);



  return (
    <Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setalert, user, watchList}}>
        {children}
    </Crypto.Provider>
  )
};

export default CryptoContext


export const CryptoState = () => {
    return useContext(Crypto);
}