import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import "../styles/AddLGUInfo.css"; 
import Navbar from '../../Navbar';
import useAuth from '../../../hooks/useAuth'; 
import successImage from '../styles/success.png'; // Import your success image
import errorImage from '../styles/error.png'; // Import your error image

function AddLGUInfo() {
  const { auth } = useAuth(); 
  const navigate = useNavigate(); 
  const [lguName, setLguName] = useState("");
  const [lguType, setLguType] = useState("City");
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [logo1, setLogo1] = useState(null);
  const [logo2, setLogo2] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [showForm, setShowForm] = useState(true); // To toggle form visibility
  const [lguData, setLguData] = useState(null); // To store fetched LGU data

  const logo1InputRef = useRef(null);
  const logo2InputRef = useRef(null);

  useEffect(() => {
    // Fetch existing LGU data on component load
    const fetchLguData = async () => {
      try {
        const response = await axios.get('/showLgu', {
          headers: {
            'Authorization': `Bearer ${auth?.accessToken}`, 
          }
        });
        console.log("LGU Data Fetched:", response.data); 
        if (response.data) {
          setLguData(response.data); // Store fetched data
          setShowForm(false); // Hide form if data exists
        }
      } catch (error) {
        console.error("Error fetching LGU data:", error);
      }
    };
    
    fetchLguData();
  }, [auth]);

  const handleLogoUpload = (e, logoSetter) => {
    const file = e.target.files[0];
    logoSetter(file);
  };

  const handleLogoDrop = (e, logoSetter) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    logoSetter(file);
  };

  const handleRemoveLogo = (logoSetter) => {
    logoSetter(null);
  };

  const validateInputs = () => {
    const isNumberValid = /^\d{11}$/.test(contactNumber); 
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
    
    if (!isNumberValid) {
      toast.error(<CustomToast message="Contact number must be exactly 11 digits." image={errorImage} />);
      return false;
    }
    
    if (!isEmailValid) {
      toast.error(<CustomToast message="Please enter a valid email address." image={errorImage} />);
      return false;
    }
    if (!logo1) {
      toast.error(<CustomToast message="Please upload logo 1." image={errorImage} />);
      return false;
    }
    if (!logo2) {
      toast.error(<CustomToast message="Please upload logo 2." image={errorImage} />);
      return false;
    }

    return true; 
  };

  const CustomToast = ({ message, image }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={image} alt="Toast Image" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
      <span>{message}</span>
    </div>
  );

  const handleAddLGUInfo = async () => {
    if (!validateInputs()) {
      return; 
    }

    const formData = new FormData();
    formData.append('username', lguName);
    formData.append('type', lguType);
    formData.append('province', province);
    formData.append('region', region);
    formData.append('logo1', logo1);
    formData.append('logo2', logo2);
    formData.append('number', contactNumber);
    formData.append('email', email);
    formData.append('website', website);

    try {
      const response = await axios.post('/insertLgu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth?.accessToken}`, 
        }
      });

      console.log("Response:", response.data);
      // Show success toast notification
      toast.success(<CustomToast message="LGU Information Added Successfully!" image={successImage} />);
      setTimeout(() => {
        navigate('/home'); // Redirect to home after successful addition
      }, 3000);

      // Store inserted data and hide the form
      setLguData(response.data); 
     
    } catch (error) {
      console.error("Error adding LGU Info:", error);
      toast.error(<CustomToast message="Failed to add LGU info. Please try again." image={errorImage} />);
    }
  };

  const handleUploadClick = (inputRef) => {
    inputRef.current.click();
  };

  const handleEditLGUInfo = () => {
    setLguName(lguData.LGU_Name); // Populate LGU Name
    setLguType(lguData.Type); // Populate LGU Type
    setProvince(lguData.Province); // Populate Province
    setRegion(lguData.Region); // Populate Region
    setContactNumber(lguData.Contact_Number); // Populate Contact Number
    setEmail(lguData.Email_Address); // Populate Email
    setWebsite(lguData.Website); // Populate Website
    setShowForm(true); // Show the form
  };

  return (
    <div>
      <Navbar />
      <ToastContainer /> {/* Ensure ToastContainer is at the top level */}

      {showForm ? (
        <div className="add-lgu-info-container">
          <h2>Add LGU Information</h2>

          <div className="form-grid">
            {/* LGU Name */}
            <div className="form-group">
              <label>LGU Name*</label>
              <input
                type="text"
                value={lguName}
                onChange={(e) => setLguName(e.target.value)}
                placeholder="Enter LGU Name"
              />
            </div>

            {/* LGU Type */}
            <div className="form-group">
              <label>Type (City or Municipality)</label>
              <select value={lguType} onChange={(e) => setLguType(e.target.value)}>
                <option value="City">City</option>
                <option value="Municipality">Municipality</option>
              </select>
            </div>

            {/* Province */}
            <div className="form-group">
              <label>Province*</label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Enter Province"
              />
            </div>

            {/* Region */}
            <div className="form-group">
              <label>Region*</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Enter Region"
              />
            </div>

            {/* Logo 1 Upload */}
            <div className="form-group">
              <label>Logo 1*</label>
              <div
                className="upload-area"
                onDrop={(e) => handleLogoDrop(e, setLogo1)}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => handleUploadClick(logo1InputRef)}
              >
                <input 
                  type="file" 
                  onChange={(e) => handleLogoUpload(e, setLogo1)} 
                  hidden 
                  ref={logo1InputRef}
                />
                <p>Drag & drop or click to upload</p>
              </div>
              {logo1 && (
                <div className="upload-preview">
                  <img src={URL.createObjectURL(logo1)} alt="Logo 1 Preview" />
                  <button onClick={() => handleRemoveLogo(setLogo1)}>X</button>
                </div>
              )}
            </div>

            {/* Logo 2 Upload */}
            <div className="form-group">
              <label>Logo 2*</label>
              <div
                className="upload-area"
                onDrop={(e) => handleLogoDrop(e, setLogo2)}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => handleUploadClick(logo2InputRef)}
              >
                <input 
                  type="file" 
                  onChange={(e) => handleLogoUpload(e, setLogo2)} 
                  hidden 
                  ref={logo2InputRef}
                />
                <p>Drag & drop or click to upload</p>
              </div>
              {logo2 && (
                <div className="upload-preview">
                  <img src={URL.createObjectURL(logo2)} alt="Logo 2 Preview" />
                  <button onClick={() => handleRemoveLogo(setLogo2)}>X</button>
                </div>
              )}
            </div>

            {/* Contact Number */}
            <div className="form-group">
              <label>Contact Number*</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter Contact Number"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>

            {/* Website */}
            <div className="form-group">
              <label>Website*</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Enter Website"
              />
            </div>
          </div>

          <button onClick={handleAddLGUInfo}>Add LGU Info</button>
        </div>
      ) : (
        <div className="lgu-data-container">
            <h2>Existing LGU Information</h2>
            {lguData && (
              <div className="lgu-data">
                <div className="logo-container">
                  <img src={lguData.Logo1} alt="Logo 1" className="logo1" />
                  <img src={lguData.Logo2} alt="Logo 2" className="logo2" />
                </div>
                <div className="lgu-info">
                  <div className="lgu-info-row">
                    <label className="lgu-label">LGU Name:</label>
                    <span>{lguData.LGU_Name}</span>
                  </div>
                  <div className="lgu-info-row">
                    <label className="lgu-label">Type:</label>
                    <span>{lguData.Type}</span>
                  </div>
                  <div className="lgu-info-row">
                    <label className="lgu-label">Province:</label>
                    <span>{lguData.Province}</span>
                  </div>
                  <div className="lgu-info-row">
                    <label className="lgu-label">Region:</label>
                    <span>{lguData.Region}</span>
                  </div>
                  <div className="lgu-info-row">
                    <label className="lgu-label">Contact Number:</label>
                    <span>{lguData.Contact_Number}</span>
                  </div>
                  <div className="lgu-info-row">
                    <label className="lgu-label">Email:</label>
                    <span>{lguData.Email_Address}</span>
                  </div>
                  <div className="lgu-info-row">
                    <label className="lgu-label">Website:</label>
                    <span>{lguData.Website}</span>
                  </div>
                </div>
                <div className="button-container">
                  <button onClick={handleEditLGUInfo}>Edit LGU Info</button>
                </div>
              </div>
            )}
          </div>
      )}
    </div>
  );
}

export default AddLGUInfo;
