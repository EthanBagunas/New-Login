import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Grid, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import OtpTimer from 'otp-timer';
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validateOtp = async (otp, form, nav) => {
  const axiosPrivate = useAxiosPrivate();
  try {
    const response = await axiosPrivate.post(`/validateotp/${otp}`, form);
    if (response.status === 200) {
      toast.success(response.data.message, toast_style);
       setTimeout(() => { nav('/', { replace: true });}, 2000);
    } else {
      toast.error(response.data.message, toast_style); 
    }
  } catch (error) {
    toast.error('OTP verification failed. Please try again.');
    console.error(error);
  }
};

const RegistrationOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state.formData;

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

  useEffect(() => {
    // You can add additional logic here if needed
  }, [formData]);

  const paperStyle = {
    padding: 20,
    height: 100,
    width: 300,
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
          <input
            type="text"
            id="otpInput"
            placeholder="Enter the OTP Here..."
            size={35}
          />
          <br />
          {showTimer && <OtpTimer seconds={10} resend={() => handleClick(true)} text="Resending OTP in ..." />}
          <Button
            style={{ textAlign: 'center' }}
            color="secondary"
            onClick={() => validateOtp(document.getElementById('otpInput').value, formData, navigate)}
          >
            Submit
          </Button>
        </div>
      </Paper>
      <ToastContainer />
    </Grid>
  );
};

export default RegistrationOtp;
