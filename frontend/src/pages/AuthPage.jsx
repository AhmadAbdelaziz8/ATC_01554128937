import React, { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import { login, register } from "../services/authService";
import RegisterForm from "../components/Auth/RegisterForm";
import OverlayPanelContent from "../components/Auth/OverlayPanelContent";

export default function AuthPage() {
  const [isLoginPanelActive, setIsLoginPanelActive] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { token } = await login({
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register({
        fullName: registerName,
        email: registerEmail,
        password: registerPassword,
        role: "USER", 
      });
      setIsLoginPanelActive(true); // Switch to login panel after successful registration
      setError("Registration successful! Please log in.");
      window.location.href = "/";

    } catch (err) {
      setError(err.message);
    }
  };

  const togglePanel = () => {
    setIsLoginPanelActive(!isLoginPanelActive);
    setError("");
    setLoginEmail("");
    setLoginPassword("");
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl min-h-[550px] sm:min-h-[500px] overflow-hidden">
        {/* Login Form Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-full md:w-1/2
                        ${
                          isLoginPanelActive
                            ? "left-0 opacity-100 z-20"
                            : "left-0 opacity-0 z-10 md:pointer-events-none"
                        }`}
        >
          <LoginForm
            email={loginEmail}
            setEmail={setLoginEmail}
            password={loginPassword}
            setPassword={setLoginPassword}
            onSubmit={handleLoginSubmit}
            onTogglePanel={togglePanel}
            error={isLoginPanelActive ? error : ""}
          />
        </div>

        {/* Register Form Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-full md:w-1/2
                        ${
                          !isLoginPanelActive
                            ? "left-0 md:left-1/2 opacity-100 z-20"
                            : "left-0 md:left-1/2 opacity-0 z-10 md:pointer-events-none"
                        }`}
        >
          <RegisterForm
            name={registerName}
            setName={setRegisterName}
            email={registerEmail}
            setEmail={setRegisterEmail}
            password={registerPassword}
            setPassword={setRegisterPassword}
            onSubmit={handleRegisterSubmit}
            onTogglePanel={togglePanel}
            error={!isLoginPanelActive ? error : ""}
          />
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 hidden md:block
                        ${
                          isLoginPanelActive
                            ? "transform translate-x-0 rounded-l-xl"
                            : "transform -translate-x-full rounded-r-xl"
                        }`}
        >
          <div
            className={`relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white h-full -left-full w-[200%] transition-transform duration-700 ease-in-out
                          ${
                            isLoginPanelActive
                              ? "transform translate-x-1/2"
                              : "transform translate-x-0"
                          }`}
          >
            {/* Welcome Back Panel */}
            <div
              className={`absolute top-0 left-0 h-full w-1/2 
                        
                        `}
            >
              <OverlayPanelContent
                title="Welcome Back!"
                description="To keep connected with us please login with your personal info"
                buttonText="Sign In"
                onButtonClick={togglePanel}
              />
            </div>

            {/* Hello Friend Panel */}
            <div
              className={
                "absolute top-0 left-1/2 h-full w-1/2 transition-opacity duration-300 ease-in-out"
              }
            >
              <OverlayPanelContent
                title="Hello, Friend!"
                description="Enter your personal details and start your journey with us"
                buttonText="Sign Up"
                onButtonClick={togglePanel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
