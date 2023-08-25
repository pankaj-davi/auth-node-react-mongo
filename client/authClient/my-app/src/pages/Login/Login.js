import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axios from "axios";

import AuthCard from "../../components/authentication/authCard/authCard";
import { setCookiesUtills } from "../../utills/utills";

const Login = () => {
  const [userInputs , setUserInputs] = useState({email : '' , password : ''})
  const [showPassword, setShowPassword] = useState(false);
  const navigation  = useNavigate()
  

  const handleInputsChange = (event) => {
    setUserInputs((pre) => ({
      ...pre,
      [event.target.name] : event.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response =  await axios.post(`${process.env.REACT_APP_API_URL}/login` , {
        ...userInputs
      })
      setCookiesUtills(response?.data);
      console.log(response.data);
      const {accessToken} = response.data;
      console.log(accessToken);
      if(accessToken){
        navigation('/profile')
      }
     
    } catch (err) {
      // Handle error
      alert(JSON.stringify(err))
    }
  };

  const LoginContent = {
    wlecomeText :  "Hi, Welcome Back",
    description :  "Enter your credentials to continue",
    redirect : {
      spanText : "Don't have an account? ",
      url : '/signup',
      buttonText : "signup"
    }
  };
  
  return (
    <AuthCard content={LoginContent}>
      <form onSubmit={handleLogin}>
        <TextField
          name="email"
          label="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userInputs.email}
          onChange={handleInputsChange}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={userInputs.password}
          onChange={handleInputsChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}

        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
          style={{ marginTop: "1rem" }}
        >
          Log In
        </Button>
      </form>
    </AuthCard>
  );
};

export default Login;
