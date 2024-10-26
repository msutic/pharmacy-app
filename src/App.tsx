import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import { Box } from '@mui/material';
import About from './views/about/About';
import Statistics from './views/statistics/Statistics';
import ProductTable from './views/products/ProductsTable';

const App: React.FC = () => {
  return (
    <Box className="app-container">
      <Sidebar />
      <Box component="main" className="main-content">
        <Routes>
          <Route path="/" element={<ProductTable />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
