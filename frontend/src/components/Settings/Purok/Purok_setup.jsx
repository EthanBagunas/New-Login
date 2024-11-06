import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import "../styles/AddPurokInfo.css"; 
import Navbar from '../../Navbar';
import useAuth from '../../../hooks/useAuth'; 
import successImage from '../styles/success.png';
import errorImage from '../styles/error.png';
import Backdrop from '@mui/material/Backdrop';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';

function AddPurokInfo() {
  const { auth } = useAuth(); 
  const navigate = useNavigate(); 
  const location = useLocation();
  const { brgyName: initialBrgyName } = location.state || {}; 
  const [brgyName, setBrgyName] = useState(initialBrgyName || "");
  const [isReadOnly, setIsReadOnly] = useState(!!initialBrgyName); 

  const [purokName, setPurokName] = useState("");
  const [type, setType] = useState("Residential"); 
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [purokPresident, setPurokPresident] = useState("");
  const [successMessage, setSuccessMessage] = useState(false); 
  const [brgy, setBrgy] = useState([]);
  const [purok, setPurok] = useState([]);
  const [informationViewing, setInformationViewing] = useState(false); 
  const [showForm, setShowForm] = useState(true); // Control form visibility

  useEffect(() => {
    const fetchBarangays = async () => {
      try {
        const response = await axios.get('/show-brgy', {
          headers: {
            'Authorization': `Bearer ${auth?.accessToken}`, 
          }
        });
        
        const uniqueBarangays = new Set(response.data.map(item => item.barangay));
        setBrgy([...uniqueBarangays]); 
      } catch (error) {
        console.error("Error fetching barangays:", error);
      }
    };

    fetchBarangays();
  }, [auth]);

  const showBarangay = () => {
    setInformationViewing(true);
  };

  const validateInputs = () => {
    if (!purokName || !brgyName || !province || !region || !purokPresident) {
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
      brgyName,
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
    setInformationViewing(false);
  };
  const HandlebackClick = () => {
    setShowForm(true); // Hide form when place is clicked
  };
 

  const handlePlaceClick = async (brgy) => {
    try {
      const response = await axios.get(`/purok/${brgy}`, {
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`,
        },
      });
      setPurok(response.data);
      setShowForm(false); // Hide form when place is clicked
    } catch (error) {
      console.error("Error fetching barangay info:", error);
      toast.error(<CustomToast message="Failed to fetch Barangay info. Please try again." image={errorImage} />);
    }
  };

  const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    color: '#333',
  });

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

        {showForm && (
          <div className="form-grid">
            <div className="form-group">
              <label>Purok Name*</label>
              <input
                type="text"
                value={purokName}
                onChange={(e) => setPurokName(e.target.value)}
                placeholder="Enter Purok Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="barangayName">Barangay Name</label>
              <input
                type="text"
                id="BarangayName"
                value={brgyName}
                onChange={(e) => {
                  setBrgyName(e.target.value);
                  if (!initialBrgyName) setIsReadOnly(false);
                }}
                required
                readOnly={isReadOnly}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
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
            <div className="form-group">
              <label>Purok President*</label>
              <input
                type="text"
                value={purokPresident}
                onChange={(e) => setPurokPresident(e.target.value)}
                placeholder="Enter Purok President's Name"
              />
            </div>
            <div className="button-group">
          <button onClick={handleAddPurokInfo}>Add Purok Information</button>
          <button onClick={() => setInformationViewing(true)}>Show Barangay</button>
        </div>    
          </div>
    
        )}
        
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          open={informationViewing}
          onClick={() => setInformationViewing(false)}
        >
          {informationViewing && (
            <div className="drawer-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', color: 'black' }}>
              <h2>Available Barangays</h2>
              <ul>
                {brgy.map((brgy) => (
                  <li key={brgy} onClick={() => handlePlaceClick(brgy)} className="date-item">
                    {brgy}
                  </li>
                ))}
              </ul>
              <button onClick={() => setInformationViewing(false)}>Close</button>
            </div>
          )}
        </Backdrop>

        {!showForm && (
          <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Purok Name</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Province</StyledTableCell>
                  <StyledTableCell>Region</StyledTableCell>
                  <StyledTableCell>Purok President</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purok.map((purokItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{purokItem.purok_name}</TableCell>
                    <TableCell>{purokItem.type}</TableCell>
                    <TableCell>{purokItem.province}</TableCell>
                    <TableCell>{purokItem.region}</TableCell>
                    <TableCell>{purokItem.purok_president}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <br></br>
              <button onClick={ HandlebackClick}>Back to insert</button>
            </Table>
         
          </TableContainer>
        )}
       
      </div>
    </div>
  );
}

export default AddPurokInfo;
