import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Grid, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import OtpTimer from 'otp-timer';
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiOtpInput } from 'mui-one-time-password-input'

const toast_style= {
  position: 'bottom-right',
  closeOnClick: true,
  pauseOnHover: true
}
const validateOtp = async (otp, form, navigate, axiosPrivate) => {
  try {
    const response = await axiosPrivate.post(`/validateotp/${otp}`, form);
    if (response.status === 200) {
      toast.success(response.data.message, toast_style);
       setTimeout(() => { navigate('/', { replace: true });}, 2000);
    } else {
      toast.error(response.data.message, toast_style); 
    }
  } catch (error) {
    toast.error('OTP verification failed. Please try again.');
    console.error(error);
  }
};

const RegistrationOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const formData = location.state?.formData;
  const [otp, setOtp] = useState('')

  useEffect(() => {
    if (otp.length === 6) {
      validateOtp(otp, formData, navigate,axiosPrivate);
    }
  }, [otp]);

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  const [showTimer, setShowTimer] = useState(true);

  // TODO: just call the handleFormSubmit in ./Signup
  const handleResend = (status) => {
    const axiosPrivate = useAxiosPrivate();
    setShowTimer(status);
    if (formData.password !== formData.passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }
    axiosPrivate.post(`/sendotp`, formData)
      .then(response => {
        toast.success('OTP sent successfully! Redirecting...');
      })
      .catch(error => {
        console.error(error);
        toast.error('An error occurred. Please try again.');
      });
  };

  const paperStyle = {
    padding: 20,
    height: 250,
    width: 400,
    margin: '20px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '7%',
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <div>
          <h5>We've sent a One-Time Password to the contact number you've provided</h5>
          <br />
          <MuiOtpInput value= {otp} onChange={handleChange} length={6} />
            <br />
            <Grid container justifyContent="center">
            
            {showTimer && <OtpTimer seconds={10} resend={() => handleResend(true)} textColor= {"#000000"} background={"#33D1E6"} text="Resending OTP in ..." />}
            </Grid>
            
        </div>
      </Paper>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false}closeOnClick/>
    </Grid>
  );
};

export default RegistrationOtp;

/*
<Button
            style={{ textAlign: 'center' }}
            backgroundColor={"#33D1E6"}
            onClick={() => validateOtp(otp, formData, navigate)}
            >
            Submit
            </Button>
*/