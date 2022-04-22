import React from 'react'
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    selectbutton: {
        border: "1px solid #40DFEF",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: "#40DFEF",
        color: "black" ,
        fontWeight: 700 ,
        "&:hover": {
          backgroundColor: "black",
          color: "white",
        },
        width: "22%",
        //   margin: 5,
      },
});

const SelectButton = ({children, selected, onClick}) => {
    
    const classes = useStyles();
  return (
    <span
    onClick={onClick}
    className={classes.selectbutton}
    >{children}</span>
  );
};

export default SelectButton