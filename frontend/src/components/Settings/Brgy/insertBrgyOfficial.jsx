import React, { useState } from 'react';
import '../styles/Barangay_Form.css'; // Keep your existing CSS file
import axios from '../../../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Navbar';
import successImage from '../styles/success.png'; 
import errorImage from '../styles/error.png'; 
import useAuth from '../../../hooks/useAuth'; 

const Barangay_Form = () => {
  const { auth } = useAuth(); 
  const location = useLocation();
  const { brgyName: initialBrgyName } = location.state || {};  
  const [brgyName, setBrgyName] = useState(initialBrgyName || "");  

  
  
  const navigate = useNavigate(); 
  const [periodFrom, setPeriodFrom] = useState('');

  const [periodTo, setPeriodTo] = useState('');
  const [barangayChairman, setBarangayChairman] = useState('');
  const [barangaySecretary, setBarangaySecretary] = useState('');
  const [barangayTreasurer, setBarangayTreasurer] = useState('');
  const [councilor1, setCouncilor1] = useState('');
  const [councilor2, setCouncilor2] = useState('');
  const [councilor3, setCouncilor3] = useState('');
  const [councilor4, setCouncilor4] = useState('');
  const [councilor5, setCouncilor5] = useState('');
  const [councilor6, setCouncilor6] = useState('');
  const [councilor7, setCouncilor7] = useState('');
  const [skChairperson1, setSkChairperson1] = useState('');
  const [skChairperson2, setSkChairperson2] = useState('');
  const [skMember1, setSkMember1] = useState('');
  const [skMember2, setSkMember2] = useState('');
  const [skMember3, setSkMember3] = useState('');
  const [skMember4, setSkMember4] = useState('');
  const [skMember5, setSkMember5] = useState('');
  const [skMember6, setSkMember6] = useState('');
  const [skMember7, setSkMember7] = useState('');
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
      const response = await axios.post('/insertBarangay', {
        periodFrom,
        periodTo,
        barangayChairman,
        barangaySecretary,
        barangayTreasurer,
        councilor1,
        councilor2,
        councilor3,
        councilor4,
        councilor5,
        councilor6,
        councilor7,
        skChairperson1,
        skChairperson2,
        skMember1,
        skMember2,
        skMember3,
        skMember4,
        skMember5,
        skMember6,
        skMember7,
        brgyName,
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
    <div>
    <Navbar />
    <ToastContainer />
    <div className="barangay-form-container1">
  
      
      <div className="form-container">
        <h2>Barangay Elected Official</h2>
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
              <label htmlFor="barangayName">Barangay Name</label>
              <input
                type="text"
                id="BarangayName"
                value={brgyName}
                onChange={(e) => setBrgyName(e.target.value)}  // You may keep this, but won't be used if input is readonly
                required
                readOnly // Locks the input, prevents editing
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
              <label htmlFor="barangayChairman">Barangay Chairman:</label>
              <input
                type="text"
                id="barangayChairman"
                value={barangayChairman}
                onChange={(e) => setBarangayChairman(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="barangaySecretary">Barangay Secretary:</label>
              <input
                type="text"
                id="barangaySecretary"
                value={barangaySecretary}
                onChange={(e) => setBarangaySecretary(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="barangayTreasurer">Barangay Treasurer:</label>
              <input
                type="text"
                id="barangayTreasurer"
                value={barangayTreasurer}
                onChange={(e) => setBarangayTreasurer(e.target.value)}
                required
              />
            </div>
          </div>
          <h3>Barangay Councilors</h3>
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
          <h3>SK Officials</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="skChairperson">SK Chairperson:</label>
              <input
                type="text"
                id="skChairperson1"
                value={skChairperson1}
                onChange={(e) => setSkChairperson1(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="skChairperson">SK Chairperson:</label>
              <input
                type="text"
                id="skChairperson2"
                value={skChairperson2}
                onChange={(e) => setSkChairperson2(e.target.value)}
                required
              />
            </div>
          </div>


          <h4>SK Members</h4>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="skMember1">SK Member 1:</label>
              <input
                type="text"
                id="skMember1"
                value={skMember1}
                onChange={(e) => setSkMember1(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="skMember2">SK Member 2:</label>
              <input
                type="text"
                id="skMember2"
                value={skMember2}
                onChange={(e) => setSkMember2(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="skMember3">SK Member 3:</label>
              <input
                type="text"
                id="skMember3"
                value={skMember3}
                onChange={(e) => setSkMember3(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="skMember4">SK Member 4:</label>
              <input
                type="text"
                id="skMember4"
                value={skMember4}
                onChange={(e) => setSkMember4(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="skMember5">SK Member 5:</label>
              <input
                type="text"
                id="skMember5"
                value={skMember5}
                onChange={(e) => setSkMember5(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="skMember6">SK Member 6:</label>
              <input
                type="text"
                id="skMember6"
                value={skMember6}
                onChange={(e) => setSkMember6(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="skMember7">SK Member 7:</label>
              <input
                type="text"
                id="skMember7"
                value={skMember7}
                onChange={(e) => setSkMember7(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <button type="submit">Submit</button>
            <button onClick={() => handleRedirect('/brgy-setup')}>
                                   Barangay Setup
                                </button>
          </div>
        </form>
        
      </div>
    </div>
    </div>
  );
};

export default Barangay_Form;
