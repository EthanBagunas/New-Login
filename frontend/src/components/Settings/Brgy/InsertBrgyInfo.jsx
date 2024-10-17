import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Navbar';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import successImage from '../styles/success.png';
import errorImage from '../styles/error.png';
import mapIcon from '../styles/map-icon.png';
import "../styles/BrgyForm.css";
import IconButton from '@mui/material/IconButton';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Backdrop from '@mui/material/Backdrop'; // Import Backdrop
import { drawerClasses } from "@mui/material";



function BrgyForm() {
  const { auth } = useAuth();
  const [brgyName, setBrgyName] = useState("");
  const [lguType, setLguType] = useState("City");
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [logo1, setLogo1] = useState(null);
  const [logo2, setLogo2] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [places, setPlaces] = useState([]); 
  const [isViewing, setIsViewing] = useState(false); 
  const [dateViewing, setDateViewing] = useState(false);
  const [date, setDates] = useState([]); 
  const [officialData, setOfficialData] = useState(null);
  const [hiddenContainerOpen, setHiddenContainerOpen] = useState(false); // State for hidden container
  

  const logo1InputRef = useRef(null);
  const logo2InputRef = useRef(null);

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
    const isNumberValid = /^\d{7}$/.test(contactNumber);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isNumberValid) {
      toast.error(<CustomToast message="Contact number must be exactly 7 digits." image={errorImage} />);
      return false;
    }

    if (!isEmailValid) {
      toast.error(<CustomToast message="Please enter a valid email address." image={errorImage} />);
      return false;
    }
    if (!logo1) {
      toast.error(<CustomToast message="Please upload Logo 1." image={errorImage} />);
      return false;
    }
    if (!logo2) {
      toast.error(<CustomToast message="Please upload Logo 2." image={errorImage} />);
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

  const handleAddBrgyInfo = async () => {
    if (!validateInputs()) {
      return;
    }

    const formData = new FormData();
    formData.append('brgyName', brgyName);
    formData.append('lguType', lguType);
    formData.append('province', province);
    formData.append('region', region);
    formData.append('logo1', logo1);
    formData.append('logo2', logo2);
    formData.append('contactNumber', contactNumber);
    formData.append('email', email);
    formData.append('website', website);

    try {
      const response = await axios.post('/insertBrgy', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth?.accessToken}`,
        }
      });
      console.log("Response:", response.data);

      setBrgyName("");
      setLguType("City");
      setProvince("");
      setRegion("");
      setLogo1(null);
      setLogo2(null);
      setContactNumber("");
      setEmail("");
      setWebsite("");
      setSuccessMessage(true);

      toast.success(<CustomToast message="Barangay Information Added Successfully!" image={successImage} />);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);

    } catch (error) {
      console.error("Error adding Barangay Info:", error);
      toast.error(<CustomToast message="Failed to add Barangay info. Please try again." image={errorImage} />);
    }
  };

  const toggleDrawer = async () => {
    setDateViewing(false);
    setDrawerOpen(!drawerOpen);
    setHiddenContainerOpen(false);
    if (!drawerOpen) {
      setOfficialData(null); 
      await fetchBarangayNames(); // Fetch barangay names when opening the drawer
    }
  };

   
  const fetchBarangayNames = async () => {
    try {
      const response = await axios.get('/brgy-names', {
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`,
        },
      });
      setPlaces(response.data); // Update the places state with fetched data
    } catch (error) {
      console.error("Error fetching barangay names:", error);
      toast.error(<CustomToast message="Failed to fetch barangay names." image={errorImage} />);
    }
  };
  const toggleDateViewing = async (place) => {
    setDrawerOpen(false); 
    
    fetchBarangayOfficial(place); // Fetch barangay names when opening the drawer

 
  setDateViewing(!dateViewing);
};

const fetchBarangayOfficial = async (place) => {
  try {
    const response = await axios.get(`/brgy-date/${place}`, {
      headers: {
        'Authorization': `Bearer ${auth?.accessToken}`,
      },
    });

    setDates(response.data); // Update the places state with fetched 
  } catch (error) {
    console.error("Error fetching Official Date:", error);
    toast.error(<CustomToast message="Failed to fetch Official Date." image={errorImage} />);
  }
};

  const toggleViewMode = () => {
    setIsViewing(!isViewing);
  };
 
  


  const handlePlaceClick = async (place) => {
    try {
      const response = await axios.get(`/getBrgy/${place}`, {
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`,
        }
      });
      const data = response.data;
      console.log(data); 
      // Populate form with fetched data
      setBrgyName(data.brgyName);
      setLguType(data.type);
      setProvince(data.Province);
      setRegion(data.Region);
      setContactNumber(data.Contact_Number);
      setLogo1(data.Logo1); // No need for prepending
      setEmail(data.Email_Address);
      setWebsite(data.Website);
      // Handle logos if needed (e.g., fetch image URLs and show previews)

      setDrawerOpen(false); // Close drawer after selection
      setIsViewing(true); // Switch to view mode after fetching
    } catch (error) {
      console.error("Error fetching barangay info:", error);
      toast.error(<CustomToast message="Failed to fetch Barangay info. Please try again." image={errorImage} />);
    }
  };

  
  const handleDateClick = async (selectedDate) => {
    try {
      const response = await axios.get(`/getbrgyOfficial/${selectedDate}`, {
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`,
        }
      });
      const data = response.data;
      console.log(data);
  
      setOfficialData(data);
      if (!hiddenContainerOpen) {
        setHiddenContainerOpen(true); // Open the hidden container
      }
  
      setIsViewing(true); // Switch to date view mode
      setDrawerOpen(false);   // Close drawer if open
    } catch (error) {
      console.error("Error fetching barangay info by date:", error);
      toast.error(<CustomToast message="Failed to fetch Barangay official info. Please try again." image={errorImage} />);
    }
  };
  
  const resetForm = () => {
    setBrgyName("");
    setLguType("City");
    setProvince("");
    setRegion("");
    setLogo1(null);
    setLogo2(null);
    setContactNumber("");
    setEmail("");
    setWebsite("");
    setSuccessMessage(false);
    setDrawerOpen(false); // Close drawer after selection
    setIsViewing(false); // Switch to view mode after fetching
    setHiddenContainerOpen(false);
  };
  const toggleHiddenContainer = () => {
    
    setHiddenContainerOpen(!hiddenContainerOpen);
  };  
  const ClearContainer = () => {
    setOfficialData(null); 
    setDateViewing(false);
  };  
  
  

 

  return (
    <div>
      <Navbar />
      <div className={`brgy-form-container ${isViewing ? 'view-mode' : ''}`}>
        <h2>{brgyName ? `Edit ${brgyName} Information` : "Add Barangay Information"}</h2>

                <ToastContainer />
                <Backdrop
                      sx={{ 
                        color: '#fff', 
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)' // Darken the backdrop
                      }}
                      open={dateViewing} // Show when date viewing is enabled
                      onClick={() => setDateViewing(false)} // Close when clicking on the backdrop
                    />
                     <Backdrop
                      sx={{ 
                        color: '#fff', 
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)' // Darken the backdrop
                      }}
                      open={drawerOpen} // Show when date viewing is enabled
                      onClick={() => setDrawerOpen(false)} // Close when clicking on the backdrop
                    />
                {successMessage && (
                  <div className="popup-message">
                    <p>Success! Barangay Information Added.</p>
                  </div>
                )}
                        {isViewing ? (
                <div className="brgy-form-view card" style={{ position: 'relative' }}>
                  <IconButton
                style={{ 
                  position: 'absolute', 
                  left: '-50px',  // Adjust this to position the button to the left
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',  // Optional, adds visibility
                  border: '1px solid #ccc',  // Optional, adds a border for better visibility
                }}
                onClick={toggleHiddenContainer}
              >
                <ArrowBackIosIcon /> {/* Left-facing arrow icon */}
              </IconButton>
                  <div className="centered-logo">
                    <img 
                      src={logo1 || "../styles/map-icon.png"} 
                      alt="Logo 1" 
                      className="logo-preview" 
                    />
                  </div>
                  <div className="brgy-view-fields">
                    {/* Barangay Information Fields */}
                    <div className="brgy-view-field">
                      <strong>Barangay Name:</strong>
                      <p>{brgyName}</p>
                    </div>
                    <div className="brgy-view-field">
                      <strong>Type:</strong>
                      <p>{lguType}</p>
                    </div>
                    <div className="brgy-view-field">
                      <strong>Province:</strong>
                      <p>{province}</p>
                    </div>
                    <div className="brgy-view-field">
                      <strong>Region:</strong>
                      <p>{region}</p>
                    </div>
                    <div className="brgy-view-field">
                      <strong>Contact Number:</strong>
                      <p>{contactNumber}</p>
                    </div>
                    <div className="brgy-view-field">
                      <strong>Email:</strong>
                      <p>{email}</p>
                    </div>
                    <div className="brgy-view-field">
                      <strong>Website:</strong>
                      <p>{website || "N/A"}</p>
                    </div>
                  </div>

          <button className="edit-btn" onClick={toggleViewMode}>Edit Information</button>
          <button onClick={()=> toggleDateViewing(brgyName)}>
            {dateViewing ? "Hide Dates" : "Show Dates"}
          </button>
        
                    {dateViewing && (
                       <div
                         className={`drawer ${dateViewing ? 'open' : ''}`}
                         style={{ zIndex: 1301 }} // Add the z-index here
                       >
                <h2>Available Dates</h2>
                <ul>
                {date.map((date) => (
                <li key={date.period_from} onClick={() => handleDateClick(date.period_from)}>
                  {date.period_from} - {date.period_to} 
                </li>
              ))}
                </ul>
                <div className="button-group">
                    <button onClick={resetForm}>Insert Form</button>
                    <button onClick={ClearContainer}>Clear Offical</button>
                   
                </div>
            </div>
            
        )}
         {hiddenContainerOpen && (
          <div className="brgy-official-container">
            {officialData ? (
              <div className="official-info card">
                <h3>{officialData.brgyName} Official Information</h3>
                <div className="official-view-fields">
                  <div className="official-view-field">
                    <strong>Period From:</strong>
                    <p>{officialData.period_from}</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Period To:</strong>
                    <p>{officialData.period_to}</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Barangay Chair:</strong>
                    <p>{officialData.brgy_chair}</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Barangay Secretary:</strong>
                    <p>{officialData.brgy_sec}</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Barangay Treasurer:</strong>
                    <p>{officialData.brgy_Treas}</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Councilors:</strong>
                    <p>
                      {officialData.brgy_councilor1}, {officialData.brgy_councilor2}, {officialData.brgy_councilor3}, 
                      {officialData.brgy_councilor4}, {officialData.brgy_councilor5}, {officialData.brgy_councilor6}, 
                      {officialData.brgy_councilor7}
                    </p>
                  </div>
                  <div className="official-view-field">
                    <strong>SK Chairs:</strong>
                    <p>
                      {officialData.sk_chair1}, {officialData.sk_chair2}
                    </p>
                  </div>
                  <div className="official-viezw-field">
                    <strong>SK Members:</strong>
                    <p>
                      {officialData.sk_mem1}, {officialData.sk_mem2}, {officialData.sk_mem3}, 
                      {officialData.sk_mem4}, {officialData.sk_mem5}, {officialData.sk_mem6}, 
                      {officialData.sk_mem7}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="official-info card empty-data">
                <h2>Please Select A Date</h2>
                <h3>Official Information</h3>
                <div className="official-view-fields">
                  <div className="official-view-field">
                    <strong>Period From:</strong>
                    <p>empty</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Period To:</strong>
                    <p>empty</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Barangay Chair:</strong>
                    <p>empty</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Barangay Secretary:</strong>
                    <p>empty</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Barangay Treasurer:</strong>
                    <p>empty</p>
                  </div>
                  <div className="official-view-field">
                    <strong>Councilors:</strong>
                    <p>empty</p>
                  </div>
                  <div className="official-view-field">
                    <strong>SK Chairs:</strong>
                    <p>empty</p>
                  </div>
                  <div className="official-view-field">
                    <strong>SK Members:</strong>
                    <p>empty</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        </div>
              ) : (
                <div className="brgy-form-grid">
                  {/* Barangay Name */}
                  <div className="form-group">
                    <label>Barangay Name*</label>
                    <input
                      type="text"
                      value={brgyName}
                      onChange={(e) => setBrgyName(e.target.value)}
                      placeholder="Enter Barangay Name"
                    />
                  </div>

                  {/* City or Municipality */}
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
                  <div className="form-group">
                    <label>Region*</label>
                    <input
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="Enter Region"
                    />
                  </div>

                  {/* Logo Uploads */}
                  <div className="form-group">
                    <label>Logo 1*</label>
                    <div
                      className="upload-area"
                      onDrop={(e) => handleLogoDrop(e, setLogo1)}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => logo1InputRef.current.click()}
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

                  <div className="form-group">
                    <label>Logo 2*</label>
                    <div
                      className="upload-area"
                      onDrop={(e) => handleLogoDrop(e, setLogo2)}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => logo2InputRef.current.click()}
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
                      maxLength={7}
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label>Email Address*</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email Address"
                    />
                  </div>

                  {/* Website */}
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Enter Website (if any)"
                    />
                  </div>
                </div>
              )}

            <div className="button-group">
                <button onClick={handleAddBrgyInfo}>
                  {brgyName ? "Update Barangay Info" : "Add Barangay Info"}
                </button>
                <button onClick={toggleDrawer}>
                {drawerOpen ? "Hide Barangay's" : "Show Barangay's"}
                
                  </button>
                  
               
              </div>
              
                {drawerOpen && (
                  <div
                  className={`drawer ${drawerOpen ? 'open' : ''}`}
                  style={{ zIndex: 1301 }} // Add the z-index here
                >
            <img src={mapIcon} alt="Map Icon" style={{ width: '50px', height: '50px', marginBottom: '10px' }} />
            <h2>BARANGAY</h2>
            <ul>
              {places.map((place) => (
                <li key={place.brgyName} onClick={() => handlePlaceClick(place.brgyName)}>
                  {place.brgyName}
                </li>
              ))}
            </ul>
            <div className="button-group">
              <button onClick={resetForm}>Insert Form</button>
            </div>
          </div>
        )}
          
               
      </div>
      
           
    </div>
  );
}

export default BrgyForm;
