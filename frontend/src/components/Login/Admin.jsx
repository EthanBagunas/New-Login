import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from '../../api/axios';
import Navbar from '../Navbar';
import Users from './Users';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton'; // For the icon button
import CloseIcon from '@mui/icons-material/Close'; // For the close icon
import './style/Admin.css'; // Import the CSS file
import lockIcon from './style/lock.png'; // Import the image
import useAuth from '../../hooks/useAuth'; 
import successImage from './style/success.png'; // Import your success image
import errorImage from './style/error.png'; // Import your error image
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Admin = () => {
    const { auth } = useAuth(); 
    const [AddViewing, setAddViewing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };
    const CustomToast = ({ message, image }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={image} alt="Toast Image" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          <span>{message}</span>
        </div>
      );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted Form Data:', formData);

        try {
            const response = await axios.post('/adminIn', formData, {
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${auth?.accessToken}`, 
                
                }
            });

            // Handle success response here
            console.log('Response:', response.data);
            // Reset the form data
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
            toast.success(<CustomToast message="successfully added an Admin Account" image={successImage} />);
            setTimeout(() => {
                setAddViewing(false); // Close the form after submission
            }, 3000); 
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error response here, e.g., showing a notification to the user
        }
    };

    const ToggleAddUser = () => {
        setAddViewing(!AddViewing);
    };
  
    return (
        <section>
            <Navbar />
            <ToastContainer /> {/* Ensure ToastContainer is at the top level */}
            <Backdrop
                className="backdrop"
                open={AddViewing} // Show when AddViewing is enabled
                onClick={() => setAddViewing(false)} // Close when clicking on the backdrop
            >
                {AddViewing && (
                    <div
                        className="form-container"
                        onClick={(e) => e.stopPropagation()} // Prevent backdrop from closing when clicking inside the form
                    >
                        {/* Close button at the top-right corner */}
                        <IconButton 
                            onClick={() => setAddViewing(false)}
                            style={{ 
                                position: 'absolute', 
                                top: '10px', 
                                right: '10px',
                                zIndex: 1400 
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <div>
                            <img 
                                src={lockIcon} // Include your lock icon here or use an SVG 
                                alt="lock icon"
                                style={{ width: '40px', marginBottom: '15px' }}
                            />
                            <h2>Register An Admin</h2>
                            <p>Create your account to stay updated and inspired.</p>
                            <form onSubmit={handleFormSubmit}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: '15px' }}>
                                        <label htmlFor="admin-first-name">First Name</label>
                                        <input 
                                            type="text" 
                                            id="admin-first-name" 
                                            name="firstName" 
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </li>
                                    <li style={{ marginBottom: '15px' }}>
                                        <label htmlFor="admin-last-name">Last Name</label>
                                        <input 
                                            type="text" 
                                            id="admin-last-name" 
                                            name="lastName" 
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </li>
                                    <li style={{ marginBottom: '15px' }}>
                                        <label htmlFor="admin-email">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="admin-email" 
                                            name="email" 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </li>
                                    <li style={{ marginBottom: '15px' }}>
                                        <label htmlFor="admin-password">Password</label>
                                        <input 
                                            type="password" 
                                            id="admin-password" 
                                            name="password" 
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </li>
                                    <li>
                                        <button 
                                            type="submit"
                                            className="RegisterAdmin"
                                        >
                                            Register Admin
                                        </button>
                                    </li>
                                </ul>
                            </form>
                        </div>           
                    </div>
                )}
            </Backdrop>
            <h1>Super Admins Page</h1>
            <br />
            <Users />
            <br />
            <div className="flexGrow">
                <button onClick={ToggleAddUser}>
                    {AddViewing ? "Hide Add panel" : "Add admin"}
                </button>
                <button onClick={() => navigate("/Home")}>Home</button>
            </div>
        </section>
    );
}

export default Admin;
