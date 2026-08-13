import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Experience from "../pages/Experience";
import Contact from "../pages/Contact";
import AdminLayout from "../admin/AdminLayout";
import Login from "../admin/Login";
import Dashboard from "../admin/Dashboard";
import AdminProjects from "../admin/Projects";
import ProjectForm from "../admin/ProjectForm";
import Skills from "../admin/Skills";
import AdminExperience from "../admin/Experience";
import Messages from "../admin/Messages";
import SimplePage from "../admin/SimplePage";
import { storage } from "../services/storage";

function Guard({children}:{children:React.ReactNode}) {
  return storage.isAdmin() ? children : <Navigate to="/admin/login" replace />;
}

export default function AppRoutes() {
 return <BrowserRouter><Routes>
   <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/>
   <Route path="/experience" element={<Experience/>}/><Route path="/contact" element={<Contact/>}/>
   <Route path="/admin/login" element={<Login/>}/>
   <Route path="/admin" element={<Guard><AdminLayout/></Guard>}>
     <Route index element={<Dashboard/>}/>
     <Route path="projects" element={<AdminProjects/>}/>
     <Route path="projects/new" element={<ProjectForm/>}/>
     <Route path="projects/:id/edit" element={<ProjectForm/>}/>
     <Route path="skills" element={<Skills/>}/>
     <Route path="experience" element={<AdminExperience/>}/>
     <Route path="education" element={<SimplePage title="Education" text="Manage education entries from this section."/>}/>
     <Route path="messages" element={<Messages/>}/>
     <Route path="profile" element={<SimplePage title="Profile" text="Update your public profile information here."/>}/>
     <Route path="settings" element={<SimplePage title="Settings" text="Portfolio and admin settings."/>}/>
   </Route>
   <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></BrowserRouter>;
}
