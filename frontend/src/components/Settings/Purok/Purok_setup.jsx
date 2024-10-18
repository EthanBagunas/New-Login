import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import "../styles/AddPurokInfo.css"; 
import Navbar from '../../Navbar';
import useAuth from '../../../hooks/useAuth'; 
import successImage from '../styles/success.png'; // Import your success image
import errorImage from '../styles/error.png'; // Import your error image
import Backdrop from '@mui/material/Backdrop'; // Import Backdrop

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
  const [brgy, setBrgy] = useState([]); // State for barangay data
  const [purok, setPurok] = useState([]); // State for barangay data
  const [informationViewing, setInformationViewing] = useState(false); // State for backdrop visibility

  // Fetch barangay names
  useEffect(() => {
    const fetchBarangays = async () => {
      try {
        const response = await axios.get('/show-brgy', {
          headers: {
            'Authorization': `Bearer ${auth?.accessToken}`, 
          }
        });
        console.log("DATA:", response.data);
        
        // Create a Set to filter unique barangay names
        const uniqueBarangays = new Set(response.data.map(item => item.barangay));
        setBrgy([...uniqueBarangays]); // Convert Set back to an array and set the state
      } catch (error) {
        console.error("Error fetching barangays:", error);
      }
    };

    fetchBarangays();
  }, [auth]);

  useEffect(() => {
    const fetchPurok = async () => {
      try {
        const response = await axios.get('/show-purok', {
          headers: {
            'Authorization': `Bearer ${auth?.accessToken}`, 
          }
        });
        console.log("DATA:", response.data);
        
        // Create a Set to filter unique barangay names
       
        setPurok([response.data]); // Convert Set back to an array and set the state
      } catch (error) {
        console.error("Error fetching barangays:", error);
      }
    };

    fetchPurok();
  }, [auth]);

  const showBarangay = () => {
    setInformationViewing(true); // Show the backdrop
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

  const ClearDate = () => {
    console.log("Showing LGU data...");
    setInformationViewing(false); // Close the backdrop
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
          <button onClick={handleAddPurokInfo}>Add Purok Information</button>
          <button onClick={showBarangay}>Show Barangay</button>
        </div>

        {/* Backdrop for showing barangay information */}
        <Backdrop
          sx={{ 
            color: '#fff', 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          open={informationViewing} // Show when information viewing is enabled
          onClick={() => setInformationViewing(false)} // Close when clicking on the backdrop
        >
          {informationViewing && ( 
            <div
              className="drawer-content"
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                zIndex: 1301,
                color: 'black'  
              }}
            >
              <h2>Available Barangays</h2> 
              <ul>
                {brgy.map((brgy) => ( 
                  <li
                    key={brgy} // Use the barangay name directly as the key
                    className="date-item" // Add this class for styling
                  >
                    {brgy} {/* Display the unique barangay name */}
                  </li>
                ))}
              </ul>
              <button onClick={ClearDate}>Show LGU Data</button>
            </div>
          )}
        </Backdrop>
      </div>
    </div>
  );
}

export default AddPurokInfo;
