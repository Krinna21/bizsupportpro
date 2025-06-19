import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import TicketsPage from "./pages/TicketsPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import AboutPage from "./pages/AboutPage";
import "./App.css";

function App() {
  const [modal, setModal] = useState(null);

  const handleLoginOpen = () => setModal("login");
  const handleRegisterOpen = () => setModal("register");
  const handleModalClose = () => setModal(null);

  return (
    <BrowserRouter basename="/bizsupportpro">
      <div className="app">
        <Header onLoginClick={handleLoginOpen} onRegisterClick={handleRegisterOpen} />

        {modal === "login" && (
          <LoginModal
            onClose={handleModalClose}
            onSwitch={() => setModal("register")}
          />
        )}
        {modal === "register" && (
          <RegisterModal
            onClose={handleModalClose}
            onSwitch={() => setModal("login")}
          />
        )}

        <Navigation />

        <main className="app__main">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  onLoginClick={handleLoginOpen}
                  onRegisterClick={handleRegisterOpen}
                />
              }
            />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
