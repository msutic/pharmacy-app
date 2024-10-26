import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Sidebar from './features/sidebar/Sidebar';
import { Box } from '@mui/material';
import Products from './features/products/Products';
import About from './features/about/About';
import Statistics from './features/statistics/Statistics';

const App: React.FC = () => {
  return (
    <Box className="app-container">
      <Sidebar />
      <Box component="main" className="main-content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
