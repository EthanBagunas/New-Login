import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useAuth from '../hooks/useAuth'; // Assuming this is where your authentication hook is
import useLogout from "../hooks/useLogout"; // Import the useLogout hook
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import swap from './Profile/design/Swap.jpg'; // Import the default image
import useAxiosPrivate from '../hooks/useAxiosPrivate'; 
import defpic from './Profile/design/Default.jpg';
function Home() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth(); // Get authentication status from useAuth
    const logout = useLogout(); 
    const axiosPrivate = useAxiosPrivate(); // Use the authenticated axios instance

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const email = auth?.email;
    // State to store the profile picture
    const [profilePic, setProfilePic] = React.useState(defpic); // Default picture initially

    React.useEffect(() => {
        const fetchProfilePic = async () => {
            if (auth?.id) { // Ensure the id exists in the auth context
                try {
                    const response = await axiosPrivate.get(`/ProfilePage/${auth.id}`); // Use the id from the token
                    setProfilePic(response.data.profilePic || defpic); // Set the profile picture or default
                } catch (error) {
                    console.error('Error fetching profile picture:', error);
                    setProfilePic(defpic); // Set default image on error
                }
            }
        };

        fetchProfilePic();
    }, [auth?.id, axiosPrivate]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFloodMonitoringClick = () => {
        if (auth?.user) {
            navigate('/home');
        } else {
            navigate('/');
        }
    };

    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function to clear backend state
            setAuth({}); // Clear the authentication state
            navigate('/'); // Redirect to the LinkPage after logout
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const handleProfileClick = () => {
        navigate('/ProfilePage'); // Redirect to ProfilePage
        handleClose(); // Close the menu
    };

    const handleSettingsClick = () => {
        navigate('/Profile'); // Redirect to Profile
        handleClose(); // Close the menu
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ color: theme.palette.primary.main, backgroundColor: theme.palette.background.default }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" onClick={handleFloodMonitoringClick} style={{ color: 'black' }}>
                            Flood Monitoring System
                        </Button>
                    </Typography>

                    {auth?.roles ? (
                        <>
                            <Link to='/home'>
                                <Button color='inherit' style={{ color: 'black' }}>Home</Button>
                            </Link>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    {/* Display profile picture if available, otherwise default */}
                                    <img src={profilePic} alt="Profile" style={{ width: 32, height: 32, borderRadius: '50%' }} onError={(e) => { e.target.src = defpic; }} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                 <MenuItem onClick={handleProfileClick}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={profilePic} style={{ width: 32, height: 32, marginRight: 8 }} onError={(e) => { e.target.src = defpic; }} />
                                        <div>
                                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>Profile</Typography>
                                            <Typography variant="body2" color="text.secondary">{email}</Typography>
                                        </div>
                                    </div>
                                </MenuItem>
                                <Divider sx={{ height: '3px', backgroundColor: 'gray' }} />
                                <MenuItem onClick={handleClose} style={{ marginLeft: '34px' }}>
                                    <img src={swap} alt="My Account" style={{ width: 32, height: 32, marginRight: 8 }} />
                                    My account
                                </MenuItem>
                                <Divider sx={{ height: '3px', backgroundColor: 'gray' }} />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem onClick={handleSettingsClick}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Link to='/'>
                                <Button color='inherit' style={{ color: 'black' }}>Login</Button>
                            </Link>
                            <Link to='/signup'>
                                <Button color='inherit' style={{ color: 'black' }}>Signup</Button>
                            </Link>
                            <Link to='/home'>
                                <Button color='inherit' style={{ color: 'black' }}>Map</Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Home;
