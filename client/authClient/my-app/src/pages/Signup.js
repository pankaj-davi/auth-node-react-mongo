import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import AuthCard from "../components/authentication/authCard/authCard";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signup = () => {
    const navigate = useNavigate()
    const [userInputs , setUserInputs] = useState({email : '' , password : ''})
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: '',
    });

  const handleInputsChange = (event) => {
    setUserInputs((pre) => ({
      ...pre,
      [event.target.name] : event.target.value
    }));
    if (event.target.name === 'email') {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: validateEmail(event.target.value),
        }));
    } 
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response =  await axios.post(`${process.env.REACT_APP_API_URL}/signup` , {
        ...userInputs
      })
      if(response.status === 201){
            navigate('/');
       }
    } catch (err) {
      // Handle error
      alert(JSON.stringify(err))
    }
  };

    const SignupContent = {
        wlecomeText :  'Sign up',
        description :  "Sign up with Email address",
        redirect : {
            spanText : "Already have an account? ",
            url : '/',
            buttonText : "login"
        }
    };

    const validateEmail = (email) => {
        if (!email) {
        return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Invalid email format';
        }
        return '';
    };

    return (
        <AuthCard content={SignupContent} >
            <form onSubmit={handleSignup}>
                <TextField
                    name="email"
                    type="email"
                    label="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userInputs.email}
                    onChange={handleInputsChange}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
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
                    Signup
                </Button>
            </form>
        </AuthCard>
    );
};

export default Signup;