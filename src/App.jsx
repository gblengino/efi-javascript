import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from "./components/layouts/MainLayout";
import MinimalLayout from "./components/layouts/MinimalLayout";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Estadisticas from "./pages/Estadisticas";
import EditPost from "./pages/EditPost";
import Categories from "./pages/Categories";

export default function App() {
  return (
    <Routes>
      {/* Engloba las rutas en el layout principal: con Navbar y Footer */}
      <Route element={<MainLayout/>}> 
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<NewPost/>}/>
        <Route path="/post/:id" element={<Post/>}/>
        <Route path="/posts/edit/:id" element={<EditPost/>}/>
        <Route element={<ProtectedRoute roles={['admin', 'moderator']}/>}>
          <Route path="/stats" element={<Estadisticas/>}/>
        </Route>
        <Route element={<ProtectedRoute roles={['admin']}/>}>
          <Route path="/categories" element={<Categories/>}/>
        </Route>
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
