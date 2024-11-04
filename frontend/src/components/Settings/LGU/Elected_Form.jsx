


import React, { useState } from 'react';
import '../styles/LGUForm.css'; // Keep your existing CSS file
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Navbar';
import successImage from '../styles/success.png'; 
import errorImage from '../styles/error.png'; 
import useAuth from '../../../hooks/useAuth'; 

const Elected_Form = () => {
  const { auth } = useAuth(); 
  const navigate = useNavigate(); 
  const [periodFrom, setPeriodFrom] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const [mayor, setMayor] = useState('');
  const [viceMayor, setViceMayor] = useState('');
  const [councilor1, setCouncilor1] = useState('');
  const [councilor2, setCouncilor2] = useState('');
  const [councilor3, setCouncilor3] = useState('');
  const [councilor4, setCouncilor4] = useState('');
  const [councilor5, setCouncilor5] = useState('');
  const [councilor6, setCouncilor6] = useState('');
  const [councilor7, setCouncilor7] = useState('');
  const [abcPresident, setAbcPresident] = useState('');
  const [skPresident, setSkPresident] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const CustomToast = ({ message, image }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={image} alt="Toast Image" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
      <span>{message}</span>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/insertElect', {
        periodFrom,
        periodTo,
        mayor,
        viceMayor,
        councilor1,
        councilor2,
        councilor3,
        councilor4,
        councilor5,
        councilor6,
        councilor7,
        abcPresident,
        skPresident,
      }, { 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.accessToken}`, 
        }
      });
      console.log("Response:", response.data);
      setSuccessMessage(true);
      
      toast.success(<CustomToast message="Barangay Elected Officials Added Successfully!" image={successImage} />);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    
    } catch (error) {
        toast.error(<CustomToast message="Failed to add Barangay Elected Officials. Please try again." image={errorImage} />);
    }
  };

  const handleRedirect = (path) => {
    navigate(path); // Use navigate for redirection
   
  };
  
  return (
    <div className="elected-form-container">
      <Navbar />
      <ToastContainer />
      <div className="form-container">
        <h2>LGU Elected Official</h2>
        {successMessage && (
          <div className="popup-message">
            <p>Success! Barangay Information Added.</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="periodFrom">Period Covered From:</label>
              <input
                type="date"
                id="periodFrom"
                value={periodFrom}
                onChange={(e) => setPeriodFrom(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="periodTo">Period Covered To:</label>
              <input
                type="date"
                id="periodTo"
                value={periodTo}
                onChange={(e) => setPeriodTo(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mayor">Mayor:</label>
              <input
                type="text"
                id="mayor"
                value={mayor}
                onChange={(e) => setMayor(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="viceMayor">Vice Mayor:</label>
              <input
                type="text"
                id="viceMayor"
                value={viceMayor}
                onChange={(e) => setViceMayor(e.target.value)}
                required
              />
            </div>
          </div>
          <h3>LGU Councilors</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="councilor1">Councilor 1:</label>
              <input
                type="text"
                id="councilor1"
                value={councilor1}
                onChange={(e) => setCouncilor1(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="councilor2">Councilor 2:</label>
              <input
                type="text"
                id="councilor2"
                value={councilor2}
                onChange={(e) => setCouncilor2(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="councilor3">Councilor 3:</label>
              <input
                type="text"
                id="councilor3"
                value={councilor3}
                onChange={(e) => setCouncilor3(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="councilor4">Councilor 4:</label>
              <input
                type="text"
                id="councilor4"
                value={councilor4}
                onChange={(e) => setCouncilor4(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="councilor5">Councilor 5:</label>
              <input
                type="text"
                id="councilor5"
                value={councilor5}
                onChange={(e) => setCouncilor5(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="councilor6">Councilor 6:</label>
              <input
                type="text"
                id="councilor6"
                value={councilor6}
                onChange={(e) => setCouncilor6(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="councilor7">Councilor 7:</label>
              <input
                type="text"
                id="councilor7"
                value={councilor7}
                onChange={(e) => setCouncilor7(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="abcPresident">ABC President:</label>
              <input
                type="text"
                id="abcPresident"
                value={abcPresident}
                onChange={(e) => setAbcPresident(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="skPresident">SK President:</label>
              <input
                type="text"
                id="skPresident"
                value={skPresident}
                onChange={(e) => setSkPresident(e.target.value)}
              />
            </div>
          </div>
          <div className="submit-official">
          <button type="submit" >Submit</button>
          <button onClick={() => handleRedirect('/lgu-setup')}>
                                   LGU-Setup
                                </button>
         </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Elected_Form;
