import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout.tsx";
import { currentUser } from "./Stores/userStore.ts";
import Login from "./pages/Login.tsx";

function Router() {
  
  const user = currentUser();
 return (<p>oasijdfojewf</p>)
  return (
    
    <BrowserRouter>
    <Routes>
    
    {!user.email && (
      <Route path="*" element={<Login />} />
    )}
        
    {user.email && (
      <Route element={<MainLayout  />}>
      {/* <Route path="projects" element={<ProjectList />} />
      <Route path="projects/:projectId" element={<Project/>} /> */}
      </Route>
    )}
    </Routes>
    </BrowserRouter>
  );
}

export default Router