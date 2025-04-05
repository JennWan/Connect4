import './App.css'
import LaunchPage from './frontend/components/LaunchPage'
import Navbar from './frontend/components/Navbar'
import EventGal from './frontend/components/EventGal';
import ForumTab from './pages/ForumTab';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={< LaunchPage />} />
                    <Route path="/events" element={<EventGal />} />
                    <Route path="/forum" element={<ForumTab />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
