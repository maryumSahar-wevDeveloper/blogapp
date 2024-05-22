import "./App.css";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import authService from "./appwrite/auth/auth.js";
import { login, logout } from "./store/authSlice";
function App() {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 py-0 px-0">
      <div className="w-full block">
        <Header />
        <main className="py-40">
          <h1 className="bg-gray-400 text-bold">React Mega Project</h1>
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
