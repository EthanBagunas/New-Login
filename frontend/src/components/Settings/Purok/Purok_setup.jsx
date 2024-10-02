import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import "../styles/AddPurokInfo.css"; 
import Navbar from '../../Navbar';
import useAuth from '../../../hooks/useAuth'; 
import successImage from '../styles/success.png'; // Import your success image
import errorImage from '../styles/error.png'; // Import your error image

function AddPurokInfo() {
  const { auth } = useAuth(); 
  const navigate = useNavigate(); 
  const [purokName, setPurokName] = useState("");
  const [barangay, setBarangay] = useState("");
  const [type, setType] = useState("Residential");
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [purokPresident, setPurokPresident] = useState("");
  const [successMessage, setSuccessMessage] = useState(false); 

  const handleSaveDraft = () => {
    console.log("Draft saved.");
  };

  const validateInputs = () => {
    if (!purokName || !barangay || !province || !region || !purokPresident) {
      toast.error(<CustomToast message="All fields are required." image={errorImage} />);
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

  const handleAddPurokInfo = async () => {
    if (!validateInputs()) {
      return; 
    }

    const formData = {
      purokName,
      barangay,
      type,
      province,
      region,
      purokPresident,
    };

    try {
      const response = await axios.post('/insertPurok', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.accessToken}`, 
        }
      });
      console.log("Response:", response.data);
      setSuccessMessage(true);
      toast.success(<CustomToast message="Purok Information Added Successfully!" image={successImage} />);
      setTimeout(() => {
        navigate('/home');
      }, 2000); 
    } catch (error) {
      console.error("Error adding Purok Info:", error);
      toast.error(<CustomToast message="Failed to add Purok info. Please try again." image={errorImage} />);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="add-purok-info-container">
        <h2>Add Purok Information</h2>

        <ToastContainer /> 

        {successMessage && (
          <div className="popup-message">
            <p>Success! Purok Information Added.</p>
          </div>
        )}

        <div className="form-grid">
          {/* Purok Name */}
          <div className="form-group">
            <label>Purok Name*</label>
            <input
              type="text"
              value={purokName}
              onChange={(e) => setPurokName(e.target.value)}
              placeholder="Enter Purok Name"
            />
          </div>

          {/* Barangay */}
          <div className="form-group">
            <label>Barangay*</label>
            <input
              type="text"
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}
              placeholder="Enter Barangay"
            />
          </div>

          {/* Type */}
          <div className="form-group">
            <label>Type (Residential or Commercial)</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
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

          {/* Purok President */}
          <div className="form-group">
            <label>Purok President*</label>
            <input
              type="text"
              value={purokPresident}
              onChange={(e) => setPurokPresident(e.target.value)}
              placeholder="Enter Purok President's Name"
            />
          </div>
        </div>

        <div className="button-group">
          <button onClick={handleSaveDraft}>Save as draft</button>
          <button onClick={handleAddPurokInfo}>Add Purok Information</button>
        </div>
      </div>
    </div>
  );
}

export default AddPurokInfo;
