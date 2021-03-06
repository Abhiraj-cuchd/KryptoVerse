import React from 'react';
import { makeStyles,  } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import {CryptoState} from '../../CryptoContext';
import { auth } from "../../firebase";
import { signOut } from 'firebase/auth';


const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace"
  },
  profile: {
    flex:1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%"
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#40DFEF",
    objectFit: "contain"

  },
  logout : {
    backgroundColor: "#40DFEF",
    marginTop: 10
  },
  watchlist: {
    flex:1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display:"flex",
    flexDirection: "column",
    alignItems:"center",
    gap: 12,
    overflow: "scroll"
  }
});



export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setalert } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setalert({
      open: true,
      type: "success",
      message: "Logout Succesful !"
    });

    toggleDrawer();
    
  };


  return (
    <div>
      {[ 'right',].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
          style={{
            height: 38,
            width: 38,
            marginLeft: 15,
            cursor: "pointer",
            backgroundColor: "#40DFEF"
          }}
          src={user.photoURL}
          alt={user.displayName || user.email} 
          />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                    className={classes.picture}
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                 />
                 <span
                 style={{
                   width: "100%",
                   fontSize: 20,
                   textAlign: "center",
                   fontWeight: "bolder",
                   wordWrap: "break-word",
                 }}
                 >
                   {user.displayName || user.email}
                 </span>
                 <div className={classes.watchlist}>
                   <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                     Watchlist
                   </span>
                 </div>
              </div>
              <Button
              variant= "contained"
              className={classes.logout}
              onClick={logOut}
              > Log Out </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}