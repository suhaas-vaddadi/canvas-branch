import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/Home";
import LaunchScreen from "./pages/LaunchScreen";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LaunchScreen />} />
        <Route path="/instructions" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
