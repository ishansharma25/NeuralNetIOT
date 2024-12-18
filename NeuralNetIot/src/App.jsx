import './App.css'
import Pcap_Csv from './Pages/Pcap_Csv'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './Component/NavBar'
import { Footer } from './Component/Footer';
import Home from './Pages/Home'
import Predict from './Pages/Predict';
import DataView from './Pages/DataView';
import Predict_ml from './Pages/Predict_ml';
import MLModelComparison from './Pages/Modelcomparison';
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pcap_csv" element={<Pcap_Csv />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/predict_ml" element={<Predict_ml />} />
          <Route path="/datavisualization" element={<DataView />} />
          <Route path="/Models" element={<MLModelComparison/>}/>
          {/* Redirect to Home by default */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* Footer placed after the routes */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
