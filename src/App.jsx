import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DeveloperInterviews from './pages/DeveloperInterviews.jsx';
import News from './pages/News.jsx';
import PatchApp from './pages/PatchApp.jsx';
import Reviews from './pages/Reviews.jsx';

import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';



function App() {

  return (
    <div>
    <Router>
       <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            
            <Route path="/reviews" element={<Reviews/>} />
           {/* <Route path="/game/:id" element={<GameDetails />} /> */}
           
            <Route path="/developer-interviews" element={<DeveloperInterviews/>} />
            <Route path="/patch-notes" element={<PatchApp/>} />
          </Routes>
    </Router>
    </div>
  )
}

export default App
