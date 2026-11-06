
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import PendingTasks from "./pages/PendingTasks";
import CompletedTasks from "./pages/CompletedTasks";
import InProgressTasks from "./pages/InProgressTasks";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>

      {/* Public routes: Only accessible when logged out */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected routes: Only accessible when logged in */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/new" element={<AddTask />} />
          <Route path="/tasks/pending" element={<PendingTasks />} />
          <Route path="/tasks/completed" element={<CompletedTasks />} />
          <Route path="/tasks/in-progress" element={<InProgressTasks />} />
          <Route path="/profile" element={<Profile />} />

        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
