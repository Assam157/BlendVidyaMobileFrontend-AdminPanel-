import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [product, setProduct] = useState({
        username: '', // Updated to use 'username'
        password: ''
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("https://a-a6rx.onrender.com/RegisterPage", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message || "Failed To Submit");
            } else {
                setSuccess(true);
                navigate("/login"); // Navigate to login after successful registration
            }
        } catch (err) {
            setError("NoMessageReceivedFromServer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Register</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>Registration Successful!</p>}
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="username">Username:</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="username"
                        name="username" // Updated to match the backend key
                        value={product.username}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="password">Password:</label>
                    <input
                        style={styles.input}
                        type="password"
                        id="password"
                        name="password"
                        value={product.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            <button
                onClick={() => navigate("/login")} // Navigate to login page
                style={{ ...styles.button, backgroundColor: "#6c757d", marginTop: "1rem" }}
            >
                Go to Login Page
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "1rem",
    },
    form: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "300px",
    },
    inputGroup: {
        marginBottom: "1rem",
    },
    label: {
        display: "block",
        marginBottom: "0.5rem",
        fontSize: "0.9rem",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "0.5rem",
        fontSize: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007BFF",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    error: {
        color: "#ff0000",
        marginBottom: "1rem",
        fontSize: "0.9rem",
    },
    success: {
        color: "#28a745",
        marginBottom: "1rem",
        fontSize: "0.9rem",
    },
};

export default RegisterPage;
