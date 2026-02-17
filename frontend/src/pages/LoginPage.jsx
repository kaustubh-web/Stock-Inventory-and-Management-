import { useState } from "react";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

export default function LoginPage() {
  const [mode, setMode] = useState("signin");

  return (
    <section className="page">
      <div className="panel login-panel">
        <div className="panel-header">
          <h3>Authentication</h3>
          <div className="auth-switcher">
            <button className="btn" onClick={() => setMode("signin")} type="button">
              Sign In
            </button>
            <button className="btn" onClick={() => setMode("signup")} type="button">
              Sign Up
            </button>
          </div>
        </div>

        <SignedIn>
          <p className="state-text">Already signed in.</p>
          <UserButton />
        </SignedIn>

        <SignedOut>
          {mode === "signin" ? (
            <SignIn fallbackRedirectUrl="/dashboard" />
          ) : (
            <SignUp fallbackRedirectUrl="/dashboard" />
          )}
        </SignedOut>
      </div>
    </section>
  );
}
