import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Calendar from "./pages/Calendar";
import Rescue from "./pages/Rescue";
import Settings from "./pages/Settings";
import AIAssistant from "./pages/AIAssistant";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Main Pages */}
        <Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard />

</ProtectedRoute>

}

/>
        <Route path="/planner" element={<Planner />} />
        <Route path="/assistant" element={<AIAssistant />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/rescue" element={<Rescue />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;