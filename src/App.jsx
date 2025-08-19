
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profie";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='login' replace />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  );
}
