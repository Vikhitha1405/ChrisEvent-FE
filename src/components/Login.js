import React, { useState } from 'react';
import './Login.css'; // <-- CSS now contains all responsive and animation styles

// Color Palette
const COLORS = {
    // Background colors for the form card
    DARK_BLUE_PRIMARY: '#0d1b2a',    // Main dark background for the form side (Right)
    DARK_BLUE_SECONDARY: '#1a2a3c',  // Slightly lighter dark blue for the "Welcome Back" side (Left)
    // Accent colors
    NEON_GREEN: '#46c146ff',         // Vibrant green for accents/buttons
    // Text colors
    TEXT_LIGHT: '#11a6c4ff',         // Light text color (Blue)
    TEXT_ACCENT: '#a0a0a0',          // Slightly darker light text for descriptions/hints
    // Input colors
    INPUT_BG: 'transparent',         // Transparent background for input fields
};

function Login({ onLoginSuccess }) { 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // CHECK FIXED PASSWORD
        if (password !== "Parro@123") {
            setMessage("Invalid password. Try again.");
            return;
        }

        // IF PASSWORD IS CORRECT → SAVE TO DB
        fetch("https://chrisevent-be.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            onLoginSuccess(username); 
        })
        .catch(err => {
             console.log(err);
             setMessage("An error occurred during login.");
        });
    };

    // --- Reusable Styles for Cleaner JSX ---
    const inputGroupStyle = {
        position: 'relative',
        marginBottom: '40px',
        width: '100%',
        opacity: 0, // Start invisible for animation
        transform: 'translateX(50px)', // Start off-screen right for animation
    };

    const inputFieldStyle = {
        width: '100%',
        padding: '12px 12px 12px 40px',
        border: 'none', 
        borderBottom: `2px solid ${COLORS.TEXT_ACCENT}`,
        backgroundColor: COLORS.INPUT_BG,
        color: COLORS.TEXT_LIGHT,
        borderRadius: '0px', 
        boxSizing: 'border-box',
        fontSize: '1em',
        transition: 'border-color 0.3s ease',
    };
    
    const inputIconStyle = {
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: COLORS.TEXT_ACCENT,
        fontSize: '1.2em',
    };
    
    const buttonStyle = {
        width: '100%', 
        padding: '12px', 
        backgroundColor: COLORS.NEON_GREEN,
        color: COLORS.DARK_BLUE_PRIMARY, 
        fontWeight: 'bold',
        border: 'none', 
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.1em',
        marginTop: '20px',
        transition: 'background-color 0.3s ease, transform 0.2s ease', 
        opacity: 0, // Start invisible for animation
        transform: 'translateX(50px)', // Start off-screen right for animation
    };

    // --- Main Component Render ---
    return (
        // Full Screen Wrapper (Moved primary container styles to CSS)
        <div className="login-wrapper" style={{
            backgroundColor: COLORS.DARK_BLUE_PRIMARY, 
            fontFamily: 'Arial, sans-serif'
        }}>
            
            {/* Login Card Container (Moved primary layout styles to CSS) */}
            <div 
                className="card-container login-card" // Combined animation and layout classes
            >
                {/* Left Panel: Welcome Back! */}
                <div 
                    className="slide-in-left left-panel" // Added 'left-panel' class for CSS targeting
                    style={{
                        backgroundColor: COLORS.DARK_BLUE_SECONDARY,
                        color: COLORS.TEXT_LIGHT,
                    }}
                >
                    {/* Company Logo */}
                    <img 
                        src="/eventpic3.png" // Assuming eventpic3.jpeg is in the 'public' folder
                        alt="Company Logo" 
                        style={{
                            width: '150px', 
                            height: 'auto', 
                            marginBottom: '25px', 
                            borderRadius: '5px', 
                        }}
                    />

                    <h1 style={{
                        fontSize: '3.5em',
                        marginBottom: '15px',
                        fontWeight: '900',
                        color: COLORS.TEXT_LIGHT,
                        textAlign: 'left',
                        lineHeight: '1.1',
                    }}>Christmas Event!</h1>
                    <p style={{
                        fontSize: '1em',
                        lineHeight: '1.6em',
                        color: COLORS.TEXT_ACCENT,
                        textAlign: 'left',
                    }}>
                        
                    </p>
                </div>

                {/* Right Panel: Login Form */}
                <div 
                    className="right-panel" // Added 'right-panel' class for CSS targeting
                    style={{
                        backgroundColor: COLORS.DARK_BLUE_PRIMARY,
                        color: COLORS.TEXT_LIGHT,
                    }}
                >
                    
                    <h2 
                        className="slide-in-right-header" // Class for the header slide-in
                        style={{
                            fontSize: '2.5em',
                            marginBottom: '40px',
                            color: COLORS.TEXT_LIGHT,
                            fontWeight: 'normal',
                        }}
                    >Login</h2>
                    
                    <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '300px' }}>
                        
                        {/* Username Input */}
                        <div className="slide-in-right-input-1" style={inputGroupStyle}> 
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={inputFieldStyle}
                            />
                            <span style={inputIconStyle}>👤</span> 
                        </div>

                        {/* Password Input */}
                        <div className="slide-in-right-input-2" style={inputGroupStyle}> 
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={inputFieldStyle}
                            />
                            <span style={inputIconStyle}>🔒</span>
                        </div>

                        {/* Login Button (Neon Green) */}
                        <button 
                            type="submit" 
                            style={buttonStyle}
                            className="login-button slide-in-right-button" // Class for animation and hover
                        >
                            Login
                        </button>
                    </form>

                    {/* Message Area */}
                    {message && <p style={{ 
                        marginTop: "20px", 
                        color: COLORS.NEON_GREEN, 
                        fontWeight: "bold"
                    }}>{message}</p>}
                </div>

                {/* Diagonal overlay (The "cut" effect) */}
                <div className="diagonal-overlay" style={{
                    backgroundColor: COLORS.DARK_BLUE_PRIMARY,
                }}></div>

            </div>
        </div>
    );
}

export default Login;