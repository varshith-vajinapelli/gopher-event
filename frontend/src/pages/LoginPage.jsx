import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoginView from "../components/LoginView";
import { useToast } from "../context/ToastContext";

const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

  async function loginRequest(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", result.data.accessToken);
      showToast("success", "Welcome back, Gopher!");
      navigate("/events");
    } catch (error) {
      setPassword("");
      const displayMessage = error.code === "ERR_NETWORK"
        ? "Network error. Please check your internet connection or try again later."
        : error.response?.data?.message ?? "Something went wrong. Please try again.";
      showToast("error", displayMessage);
    } finally {
      setLoading(false);
    }
  }

  return <LoginView email={email} password={password} isLoading={isLoading} onEmailChange={setEmail} onPasswordChange={setPassword} onSubmit={loginRequest} />;
};

export default LoginPage;
