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
  const [isViewing, setIsViewing] = useState(false); // Add viewing state

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
    setDrawerOpen(!drawerOpen);
    if (!drawerOpen) {
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
  };

 

  return (
    <div>
      <Navbar />
      <div className={`brgy-form-container ${isViewing ? 'view-mode' : ''}`}>
        <h2>{brgyName ? `Edit ${brgyName} Information` : "Add Barangay Information"}</h2>

        <ToastContainer />

        {successMessage && (
          <div className="popup-message">
            <p>Success! Barangay Information Added.</p>
          </div>
        )}
          {isViewing ? (
                        
              <div className="brgy-form-view card">
                  <div className="centered-logo">
                  <img 
                    src={logo1 || "../styles/map-icon.png"} 
                    alt="Logo 1" 
                    className="logo-preview" 
                  />
                </div>
                <div className="brgy-view-fields">
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
                <button onClick={toggleDrawer}>Toggle Places</button>
              </div>

       

                {drawerOpen && (
          <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
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
              <button onClick={toggleDrawer}>Close Drawer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrgyForm;
