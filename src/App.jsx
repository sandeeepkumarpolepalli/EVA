import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import DeveloperInterviews from './pages/DeveloperInterviews.jsx';
import News from './pages/News.jsx';
import PatchApp from './pages/PatchApp.jsx';
import Reviews from './pages/Reviews.jsx';
import Trends from './pages/Trends.jsx';


function App() {

  return (
    <div>
    <Router>
       <Navbar />
          <Routes>
                     
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/reviews" element={<Reviews/>} />
            <Route path="/developer-interviews" element={<DeveloperInterviews/>} />
            <Route path="/patch-notes" element={<PatchApp/>} />
            <Route path="/trends" element={<Trends/>} />
          </Routes>
    </Router>
    </div>
  )
}

export default App
