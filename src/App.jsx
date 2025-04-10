import './App.css'
import LaunchPage from './frontend/components/LaunchPage'
import Navbar from './frontend/components/Navbar'
import EventGal from './frontend/components/EventGal';
import GroupTab from './pages/GroupTab';
import EventPage from './frontend/components/EventPage'
import ForumTab from './pages/ForumTab';
import ChatTab from './pages/ChatTab';
import CreateEventTab from './pages/CreateEventTab';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={< LaunchPage />} />
                    <Route path="/events" element={<EventGal />} />
                    <Route path="/groups" element={<GroupTab />} />
                    <Route path="/forum/:programId" element={<ForumTab />} />
                    <Route path="/event" element={<EventPage />} /> 
                    <Route path="/chat/:topicId" element={<ChatTab />} />
                    <Route path="/create-event" element={<CreateEventTab />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
