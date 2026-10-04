import { Link } from "react-router-dom";

const LoginView = ({ email, password, isLoading, onEmailChange, onPasswordChange, onSubmit }) => (
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
        <h1>Log in</h1>
        <form className="auth-simple-form" onSubmit={onSubmit}>
          <div className="auth-simple-field">
            <label htmlFor="email">University email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="x500@umn.edu" value={email} onChange={(event) => onEmailChange(event.target.value)} required />
          </div>
          <div className="auth-simple-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => onPasswordChange(event.target.value)} required />
          </div>
          <button type="submit" disabled={isLoading}>{isLoading ? "Logging in..." : "Log in"}</button>
        </form>
        <p className="auth-simple-footer">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
      </div>
      </div>
    </div>
  </div>
);

export default LoginView;
