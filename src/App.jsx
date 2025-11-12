import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from "./components/layouts/MainLayout";
import MinimalLayout from "./components/layouts/MinimalLayout";
import NewPost from "./pages/NewPost";


export default function App() {
  return (
    <Routes>
      {/* Engloba las rutas en el layout principal: con Navbar y Footer */}
      <Route element={<MainLayout/>}> 
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<NewPost/>}/>
      </Route>
      {/* Engloba las rutas con un layout minimalista: sin Navbar, para
      las rutas de login y register */}
      <Route element={<MinimalLayout/>}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
      </Route>
    </Routes>
  );
}
