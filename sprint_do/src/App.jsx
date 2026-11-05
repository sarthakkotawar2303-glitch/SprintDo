
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

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/new" element={<AddTask />} />
        <Route path="/tasks/pending" element={<PendingTasks />} />
        <Route path="/tasks/completed" element={<CompletedTasks />} />
        <Route path="/tasks/in-progress" element={<InProgressTasks />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
