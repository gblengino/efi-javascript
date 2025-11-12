import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/registrarse" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm/>}/>
    </Routes>
  );
}
