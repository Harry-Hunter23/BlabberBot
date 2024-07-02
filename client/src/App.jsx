import "./App.css";
import { Routes, Route } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import SummaryPage from "./Pages/SummaryPage";
import ParagraphGenerator from "./Pages/ParagraphPage";
import ChittiChatbot from "./Pages/ChittiChatbot";
import GenerateSciFiImage from "./Pages/Scifimage";
import ProtectedRoute from "./Components/ProtectedRoute";
import MainPage from "./Pages/MainPage";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/summary"
          element={<ProtectedRoute element={SummaryPage} />}
        />
        <Route
          path="/paragraph"
          element={<ProtectedRoute element={ParagraphGenerator} />}
        />
        <Route
          path="/chatbot"
          element={<ProtectedRoute element={ChittiChatbot} />}
        />
        <Route
          path="/image"
          element={<ProtectedRoute element={GenerateSciFiImage} />}
        />
      </Routes>
    </>
  );
}

export default App;
