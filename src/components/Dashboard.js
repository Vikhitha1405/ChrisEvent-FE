import React, { useState } from "react";
import './Dashboard.css';

// 1. Color Palette (Using Dark Page with Light Card)
const COLORS = {
    // Page Background
    DARK_BLUE_PRIMARY: '#0d1b2a',    // Main Page Background
    
    // Card Background
    CARD_BACKGROUND: '#ffffff',      // Web Form Card Background (White)

    // Accents & Text
    LIGHT_BLUE_ACCENT: '#11a6c4ff', // Primary accent color (Header text on dark BG)
    NEON_GREEN: '#46c146ff',       // Input text color & Success button
    TEXT_DARK: '#333333',          // Text color on the White Card
    TEXT_LIGHT: '#f1f5f9',          // Text on the Dark Page
    TEXT_ACCENT: '#a0a0a0',         // Subdued text (for descriptions/placeholders)
    LOGOUT_RED: '#f44336',          // Red for logout/warning
    PRIMARY_BUTTON: '#46c146ff',    // Submit button color (Neon Green)
    INPUT_BG: '#f9f9f9',            // Input field background (Light Gray on white card)
    INPUT_BORDER: '#dddddd',        // Subtle border for inputs
};

// 2. Style Objects (CRUCIAL CHANGES for positioning)
const styles = {
    // Base container
    dashboardContainer: {
        minHeight: '100vh',
        backgroundColor: COLORS.DARK_BLUE_PRIMARY,
        color: COLORS.TEXT_LIGHT,
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    },
    
    // Header section: Sets up the full-width area.
    // Use relative positioning so logo/logout can be absolutely placed within it.
    headerBanner: {
        width: '100%',
        position: 'relative', // Crucial: sets the context for absolute positioning
        padding: '30px 0 20px 0', 
        color: COLORS.TEXT_LIGHT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the content (like the subtitle) by default
        maxWidth: '1200px', 
    },
    
    // Logo (ABSOLUTELY POSITIONED to the far left)
    logo: {
        position: 'absolute',
        left: '0px', // Pushes it to the far left of the headerBanner
        top: '35px', // Aligns with the welcome text vertically
        width: '90px',
        height: 'auto',
        zIndex: 10,
    },
    
    // Logout Button (ABSOLUTELY POSITIONED to the far right)
    logoutButton: {
        position: 'absolute',
        right: '0px', // Pushes it to the far right of the headerBanner
        top: '35px',
        background: COLORS.LOGOUT_RED, 
        color: 'white', 
        padding: '10px 20px', 
        borderRadius: '6px', 
        border: 'none', 
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 10,
    },

    // Welcome Text (Rests in the center of the flow)
    headerText: {
        fontSize: '2em',
        fontWeight: 'bold',
        margin: '0', // Ensures text remains centered
        textAlign: 'center',
    },
    headerSubText: {
        fontSize: '1em',
        color: COLORS.TEXT_ACCENT,
        marginTop: '10px',
        textAlign: 'center',
        maxWidth: '500px', // Keeps subtitle neat and centered
    },
    
    // Floating Card Container for Form/Success (No change)
    card: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto 60px auto',
        padding: '40px',
        backgroundColor: COLORS.CARD_BACKGROUND, 
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        position: 'relative',
    },
    // Grid for 2-column layout (No change)
    formGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px 30px',
        marginBottom: '20px',
        '@media (maxWidth: 600px)': {
            gridTemplateColumns: '1fr',
        }
    },
    // Input/Select Field Style (No change)
    inputField: {
        width: '100%',
        padding: '12px',
        backgroundColor: COLORS.INPUT_BG,
        color: COLORS.TEXT_DARK,
        border: `1px solid ${COLORS.INPUT_BORDER}`,
        borderRadius: '6px',
        boxSizing: 'border-box',
    },
    // Label Style (No change)
    label: {
        display: 'block',
        marginBottom: '6px',
        color: COLORS.TEXT_DARK, 
        fontWeight: '600',
        fontSize: '0.9em',
    },
    // Submit Button Style (No change)
    submitButton: {
        padding: '14px 25px',
        background: COLORS.PRIMARY_BUTTON,
        color: COLORS.DARK_BLUE_PRIMARY,
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '8px',
        display: 'block',
        width: '100%',
        marginTop: '30px',
        fontSize: '1.1em',
        transition: 'background 0.3s ease',
    },
    // Success/Thank You styles (No change)
    successHeading: {
        color: COLORS.NEON_GREEN,
        fontSize: '2.5em',
        marginBottom: '10px',
    },
    successText: {
        color: COLORS.TEXT_DARK,
        marginTop: '20px',
        fontSize: '1.1em',
        lineHeight: '1.6',
    }
};

// Dashboard component
function Dashboard({ username, onLogout, hasSubmitted, onSubmissionSuccess }) {
    const [answers, setAnswers] = useState({
        q1: "", q2: "", q3: "", q4: "", q5: "",
        q6: "", q7: "", q8: "", q9: "", q10: "",
    });

    const questions = [
        { key: "q1", label: "1) Who is the biggest foodie?" },
        { key: "q2", label: "2) Best dressing sense?" },
        { key: "q3", label: "3) Who cracks the funniest jokes?" },
        { key: "q4", label: "4) Most likely to be late?" },
        { key: "q5", label: "5) Best at office pranks?" },
        { key: "q6", label: "6) Who is the morning person?" },
        { key: "q7", label: "7) Most likely to win in karaoke?" },
        { key: "q8", label: "8) Who is the coffee addict?" },
        { key: "q9", label: "9) Most organized desk?" },
        { key: "q10", label: "10) Who is the office superstar?" },
    ];

    const handleChange = (e, key) => {
        setAnswers({ ...answers, [key]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (hasSubmitted) {
            alert("You have already submitted this form!");
            return; 
        }

        const isAnyEmpty = Object.values(answers).some(answer => answer.trim() === "");
        if (isAnyEmpty) {
            alert("Please answer all 10 mandatory questions before submitting.");
            return;
        }

        const answersArray = questions.map(q => {
            const question_no = parseInt(q.key.substring(1));
            const answer = answers[q.key];
            return [question_no, answer];
        });

        const payload = {
            username: username, 
            answers: answersArray
        };

        console.log("Data sent to server:", payload);

        fetch("https://chrisevent-be.onrender.com/submit_answers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    onSubmissionSuccess(); 
                } else {
                    alert("Submission Failed: " + data.message);
                }
            })
            .catch(error => {
                console.error("Network or Fetch Error:", error);
                alert("An error occurred while connecting to the server.");
            });
    };

    // --- CONDITIONAL RENDERING: SUCCESS VIEW ---
    if (hasSubmitted) {
        return (
            <div style={styles.dashboardContainer}>
                {/* Header Banner (Logo Top Left, Text Center, Logout Top Right) */}
                <div style={styles.headerBanner}>
                    <img 
                        src="/eventpic3.png" 
                        alt="Event Logo" 
                        style={styles.logo} // ABSOLUTE LEFT
                    />
                    <button onClick={onLogout} className="logout-button" style={styles.logoutButton}>
                        Logout
                    </button>

                    {/* Centered Text */}
                    <h1 style={styles.headerText}>Thank You, {username.charAt(0).toUpperCase() + username.slice(1)}!</h1>
                    <p style={styles.headerSubText}>Your valuable input ensures the office awards are fair and fun.</p>
                </div>

                {/* Main Thank You Card Body */}
                <div style={{ ...styles.card, padding: '50px 30px', textAlign: 'center' }}>
                    <h1 style={styles.successHeading}>Submission Complete! 🎉</h1>
                    <p style={styles.successText}>
                        Your responses for the **MerryMix Office Awards** have been securely recorded. 
                        You have successfully completed the nomination process.
                    </p>
                    <p style={styles.successText}>
                        The name that appears most frequently will be the winner of the **ADT category**. 
                        Winners will be revealed on the event day.
                    </p>
                </div>
            </div>
        );
    }
    // --- END CONDITIONAL RENDERING ---

    // --- Component Render (Form View) ---
    return (
        <div style={styles.dashboardContainer}>
            {/* Header Banner (Logo Top Left, Text Center, Logout Top Right) */}
            <div style={styles.headerBanner}>
                {/* Logo */}
                <img 
                    src="/eventpic3.png" 
                    alt="Event Logo" 
                    style={styles.logo} // ABSOLUTE LEFT
                />

                {/* Logout Button */}
                <button onClick={onLogout} className="logout-button" style={styles.logoutButton}>
                    Logout 
                </button>

                {/* Centered Text (This is what determines the center) */}
                <h1 style={styles.headerText}>Welcome, {username.charAt(0).toUpperCase() + username.slice(1)}</h1>
                <p style={styles.headerSubText}>
                   This Google Form contains a set of funny questions! I request everyone to answer honestly. The name that appears most frequently will be the winner of the ADT category. Winners will be revealed on the event day. Don’t worry—it’s just for fun, and your responses will remain confidential.
                </p>
            </div>

            {/* Form Card Area (Centered) */}
            <form onSubmit={handleSubmit} style={styles.card}>
                <h3 style={{ color: COLORS.TEXT_DARK, textAlign: 'center', marginBottom: '30px', fontSize: '1.5em', fontWeight: '600' }}>
                    The MerryMix Office Awards 🏆
                </h3>

                {/* 2-Column Grid Layout */}
                <div style={styles.formGrid}>
                    {questions.map((q) => {
                        return (
                            <div key={q.key}>
                                <label htmlFor={q.key} style={styles.label}>
                                    {q.label}
                                </label>
                                <input
                                    id={q.key}
                                    type="text"
                                    value={answers[q.key]}
                                    onChange={(e) => handleChange(e, q.key)}
                                    style={styles.inputField}
                                    placeholder="Enter colleague's name..."
                                    required
                                />
                            </div>
                        );
                    })}
                </div>
                
                {/* Submission Note */}
                <p style={{ color: COLORS.TEXT_ACCENT, fontSize: '0.9em', textAlign: 'center', marginTop: '10px' }}>
                    *All 10 nominations must be filled out to successfully submit the form.
                </p>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="submit-button" 
                    style={styles.submitButton}
                >
                    Submit All Nominations
                </button>
            </form>
        </div>
    );
}

export default Dashboard;