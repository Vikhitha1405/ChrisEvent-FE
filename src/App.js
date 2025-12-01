import React, { useState, useEffect } from 'react';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    const storedUsername = localStorage.getItem('username');
    
    const [view, setView] = useState(storedUsername ? 'dashboard' : 'login'); 
    const [currentUsername, setCurrentUsername] = useState(storedUsername || '');
    const [hasSubmitted, setHasSubmitted] = useState(false); 

    // Helper function to check submission status with the backend
    const checkSubmissionStatus = async (username) => {
        try {
            // NOTE: This endpoint needs to exist on your server
            const response = await fetch(`http://localhost:8081/check_submission_status?username=${username}`);
            const data = await response.json();
            
            if (data.submitted) {
                setHasSubmitted(true);
                return true;
            }
            setHasSubmitted(false);
            return false;

        } catch (error) {
            console.error("Error checking submission status:", error);
            setHasSubmitted(false); 
            return false;
        }
    };

    // Check submission status when the component mounts or username changes
    useEffect(() => {
        if (storedUsername) {
            checkSubmissionStatus(storedUsername);
        }
    }, [storedUsername]); 

    // This function is passed to the Login component
    const handleLoginSuccess = async (name) => {
        const submitted = await checkSubmissionStatus(name);

        if (submitted) {
            alert(`Welcome back, ${name}. You have already submitted your form! Responses are confidential. Thank you!`);
        } 
        
        // Store session data and switch view regardless, letting Dashboard handle the submitted state
        localStorage.setItem('username', name);
        setCurrentUsername(name);
        setView('dashboard');
    };

    // NEW: Callback function passed to Dashboard after successful form submission
    const handleSubmissionSuccess = () => {
        setHasSubmitted(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        setCurrentUsername('');
        setHasSubmitted(false);
        setView('login'); 
    };

    if (view === 'dashboard') {
        return <Dashboard 
                    username={currentUsername} 
                    onLogout={handleLogout} 
                    hasSubmitted={hasSubmitted}
                    onSubmissionSuccess={handleSubmissionSuccess} // <-- NEW PROP
                />;
    } else {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }
}

export default App;