import {
  Box,
  List,
  ListItemText,
  ListItemButton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Sidebar.scss';

import MedicationIcon from '@mui/icons-material/Medication';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="sidebar">
      <Typography className="title" variant="h6">
        Pharmacy Dashboard
      </Typography>
      <List>
        <ListItemButton
          className="menu-item"
          onClick={() => navigate('/products')}
        >
          <MedicationIcon className="icon" />
          <ListItemText primary="Products" className="listItemText" />
        </ListItemButton>
        <ListItemButton
          className="menu-item"
          onClick={() => navigate('/statistics')}
        >
          <BarChartIcon className="icon" />
          <ListItemText primary="Statistics" className="listItemText" />
        </ListItemButton>
        <ListItemButton
          className="menu-item"
          onClick={() => navigate('/about')}
        >
          <InfoIcon className="icon" />
          <ListItemText primary="About" className="listItemText" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
