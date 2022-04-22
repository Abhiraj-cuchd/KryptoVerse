import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CoinPage from '../src/Pages/CoinPage';
import Header from './Components/Header';
import Homepage from '../src/Pages/Homepage';
import Alert from './Components/Alert';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#030a17',
    color: "white",
    minHeight: "100vh"
  }
}));


function App() {
  
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className= {classes.App} >
        <Header />
        <Routes>
          <Route path='/' exact element={<Homepage/>} />
          <Route path='/coins/:id' exact element={<CoinPage/>} />
        </Routes>
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
