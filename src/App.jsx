import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import TaskManagementPage from "./pages/home.jsx";
import LoadingPage from "./pages/inicio.jsx"
import Home from "./components/Home.jsx";
import MyTasks from "./components/MyTasks.jsx";
import Projects from "./components/Projects.jsx";
import Team from "./components/Team.jsx";
import AddTask from "./components/AddTask.jsx";
import Profile from "./pages/Profile.jsx";


function App() {
 
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<TaskManagementPage/>} />
      <Route path="/inicio" element={<LoadingPage/>} />
      <Route path="/HomeUser" element={<Home />} />
        <Route path="/tasks" element={<MyTasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
