import { useMemo, useState } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignIn,
  SignUp,
  SignedOut,
} from "@clerk/clerk-react";

export default function LoginPage() {
  const [mode, setMode] = useState("signin");

  const clerkAppearance = useMemo(
    () => ({
      variables: {
        colorPrimary: "#0f4e73",
        colorBackground: "#ffffff",
        colorInputBackground: "#f7f9fc",
        colorInputText: "#101827",
        colorText: "#101827",
        colorTextSecondary: "#5f6f82",
        borderRadius: "10px",
      },
      elements: {
        card: {
          boxShadow: "none",
          border: "0",
          padding: "0",
          background: "transparent",
        },
        headerTitle: {
          fontSize: "1.15rem",
          fontWeight: 700,
        },
        headerSubtitle: {
          fontSize: "0.9rem",
        },
        socialButtonsBlockButton: {
          border: "1px solid #d4dde7",
          background: "#ffffff",
        },
        formButtonPrimary: {
          background: "linear-gradient(135deg, #0a4f73, #1a6a8f)",
          fontWeight: 700,
        },
        formFieldInput: {
          border: "1px solid #d4dde7",
        },
        footerActionText: {
          color: "#5f6f82",
        },
      },
    }),
    []
  );

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <section className="auth-intro">
          <p className="auth-kicker">Stock Inventory</p>
          <h2>Secure Workspace Access</h2>
          <p>
            Sign in to manage products, monitor stock movement, and maintain a
            clean inventory ledger.
          </p>
          <ul className="auth-points">
            <li>Track stock in real time</li>
            <li>View low-stock alerts and movement history</li>
            <li>Manage catalog updates in one console</li>
          </ul>
        </section>

        <section className="panel auth-panel">
          <div className="panel-header">
            <h3>{mode === "signin" ? "Sign In" : "Create Account"}</h3>
            <div className="auth-switcher">
              <button
                className={mode === "signin" ? "btn auth-toggle active" : "btn auth-toggle"}
                onClick={() => setMode("signin")}
                type="button"
              >
                Sign In
              </button>
              <button
                className={mode === "signup" ? "btn auth-toggle active" : "btn auth-toggle"}
                onClick={() => setMode("signup")}
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>

          <ClerkLoading>
            <p className="state-text">Loading authentication...</p>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedOut>
              {mode === "signin" ? (
                <SignIn
                  routing="virtual"
                  fallbackRedirectUrl="/dashboard"
                  appearance={clerkAppearance}
                />
              ) : (
                <SignUp
                  routing="virtual"
                  fallbackRedirectUrl="/dashboard"
                  appearance={clerkAppearance}
                />
              )}
            </SignedOut>
          </ClerkLoaded>
        </section>
      </div>
    </section>
  );
}
