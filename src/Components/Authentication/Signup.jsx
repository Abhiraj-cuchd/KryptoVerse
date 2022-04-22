import {React, useState} from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = ({handleClose}) => {

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setalert } = CryptoState();

  const handleSubmit = async () => {
    if(password !== confirmPassword){
        setalert({
          open:true,
          message: "Passwords do not match. Please try again",
          type: 'error'
        });
        return;
      }
      
        try {
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );


          setalert({
            open: true,
            message: `Sign Up succesfull. Welcome ${result.user.email}`,
            type: "success"
          });

          handleClose();
        } catch(e){
          setalert({
            open: true,
            message: e.message,
            type: "error"
          });
          return;
        }
  };


  return (
    <Box  padding={10} style={{display:"flex", flexDirection:"column", gap: "20px", marginTop: 15}}>
      <TextField
        variant='outlined'
        type='email'
        label="Enter Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        fullWidth
      ></TextField>
      <TextField
        variant='outlined'
        type='text'
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      ></TextField>
      <TextField
        variant='outlined'
        type='text'
        label="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      ></TextField>
      <Button
      variant="contained"
      size="large"
      style={{ backgroundColor:"#40DFEF" }}
      onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  )
};

export default Signup