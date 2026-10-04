import { useState } from "react";
import Spinner from "./SpinnerComponent";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const SignUpComponenet = ({
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  password, setPassword

}) =>{
    const navigate = useNavigate()
    const { showToast } = useToast()
    const [isLoading, setLoading] = useState(false)

    const onSignupSubmit = async (event) =>{
        event.preventDefault();
        setLoading(true)

        try{
            await api.post("/auth/signup",{
                firstName,lastName,email,password
            })
            // token saved to the local storage

            showToast("success", "Verification code sent to your email!")
            navigate("/verify-email", {state:{email}})

        } catch(error){
            const errorMessage = error.response?.data?.message ?? "Something went wrong"

            showToast("error", errorMessage)
        } finally {
            setLoading(false)
        }

    }

    
    return (
      <div className="auth-page auth-simple-page">
        <div className="auth-simple-shell">
          <div className="auth-simple-card">
          <div className="auth-campus-visual" aria-hidden="true">
            <h2>Your campus.<br />Your people.</h2>
          </div>
          <div className="auth-form-panel">
          <Link to="/events" className="auth-simple-brand">
            <span className="auth-simple-mark" aria-hidden="true">M</span>
            Gopher Event
          </Link>
          <div className="auth-simple-body">
            <h1>Create an account</h1>
            <p className="auth-simple-note">Use your @umn.edu email.</p>
            <form className="auth-simple-form" onSubmit={onSignupSubmit}>
              <div className="auth-simple-names">
                <div className="auth-simple-field">
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Goldy" value={firstName} onChange={(event) => setFirstName(event.target.value)} maxLength={30} required />
                </div>
                <div className="auth-simple-field">
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Gopher" value={lastName} onChange={(event) => setLastName(event.target.value)} maxLength={30} required />
                </div>
              </div>
              <div className="auth-simple-field">
                <label htmlFor="email">University email</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="x500@umn.edu" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
              <div className="auth-simple-field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" autoComplete="new-password" placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} maxLength={128} required />
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading && <Spinner />}
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>
            <p className="auth-simple-footer">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          </div>
          </div>
        </div>
      </div>
    );
}

export default SignUpComponenet
