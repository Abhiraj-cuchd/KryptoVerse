import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {Select} from '@material-ui/core';
import MenuItem from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';
const useStyles = makeStyles(() => ({
  title : {
    flex: 1,
    color: "#40DFEF",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 20
  }
}));

export default function Header() {

  const classes = useStyles();

  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState()

  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main:"#fff",
      },
      type: "dark"
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography onClick={()=> navigate('/')} className={classes.title}> KryptoVerse </Typography>

          <Select 
          variant="outlined"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{
            width:100,
            height:40,
            marginRight:15,
            color: 'white',
            cursor: 'pointer'
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
          {user? <UserSidebar/>: <AuthModal/> }  
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}
