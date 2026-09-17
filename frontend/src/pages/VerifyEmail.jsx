import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import VerifyEmailView from "../components/VerifyEmailView";
import { useToast } from "../context/ToastContext";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const { showToast } = useToast();
  const email = location.state?.email || "yourname@umn.edu";
  const inputsRef = useRef([]);

  async function verifyOtp(event) {
    try {
      event.preventDefault();
      setLoading(true);
      const otpCode = inputsRef.current.filter((input) => input !== null).map((input) => input.value).join("");
      const result = await api.post("/auth/verify-otp", { email, otpCode });
      localStorage.setItem("token", result.data.accessToken);
      showToast("success", "OTP verified!");
      navigate("/events");
    } catch (error) {
      showToast("error", error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return <VerifyEmailView email={email} isLoading={isLoading} inputsRef={inputsRef} onSubmit={verifyOtp} />;
};

export default VerifyEmail;
