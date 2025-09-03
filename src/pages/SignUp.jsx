// src/pages/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import ButtonLayout from "../components/‌ButtonLayout";
import GlassCard from "../components/GlassCard";
import { User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // This helps us go to different pages

  // Professional email validation (like real apps)
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Strong password validation (like real apps)
  const isValidPassword = (password) => {
    // Must have at least 8 characters, 1 letter, 1 number, and 1 special character
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // This function runs when someone clicks "Sign up"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Don't refresh the page
    setError(""); // Clear any old errors
    setSuccess(""); // Clear any old success messages
    setIsLoading(true); // Show that we're creating account

    // Validation like real professional apps
    if (!name.trim()) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address (example: user@domain.com)");
      setIsLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters with letters, numbers, and symbols (@$!%*?&)"
      );
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Check if email already exists (simple check with localStorage)
    const existingUsers = JSON.parse(
      localStorage.getItem("kanban-users") || "[]"
    );
    const emailExists = existingUsers.find(
      (user) => user.email === email.toLowerCase().trim()
    );

    if (emailExists) {
      setError("An account with this email already exists");
      setIsLoading(false);
      return;
    }

    // Create user account data
    const userData = {
      id: Date.now(), // Simple ID based on timestamp
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password, // In real app, you'd hash this!
      avatar: `https://i.pravatar.cc/40?img=${
        Math.floor(Math.random() * 70) + 1
      }`, // Random avatar
    };

    // Save user to localStorage (in real app, you'd save to database)
    existingUsers.push(userData);
    localStorage.setItem("kanban-users", JSON.stringify(existingUsers));

    // Show success message
    setSuccess(
      "Account created successfully! Please login with your credentials."
    );

    // Wait 2 seconds then go to login
    setTimeout(() => {
      navigate("/login");
    }, 2000);

    setIsLoading(false);
  };

  return (
    // Center the sign-up card with the same navy gradient
    <div
      className="min-h-screen grid place-items-center p-4
                    bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]"
    >
      <GlassCard>
        {/* Title */}
        <h1 className="text-white text-3xl font-semibold mb-6">
          Create account
        </h1>

        {/* Show success message */}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-200 text-sm">
            {success}
          </div>
        )}

        {/* Show error if something wrong */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Simple form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <Input
            type="text"
            placeholder="Full name (e.g., John Smith)"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Email */}
          <Input
            type="email"
            placeholder="Email address (e.g., john@example.com)"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password */}
          <Input
            type="password"
            placeholder="Password (8+ chars, letters, numbers, symbols)"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Confirm Password */}
          <Input
            type="password"
            placeholder="Confirm password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Password requirements helper */}
          <div className="text-white/60 text-xs space-y-1">
            <p>Password must include:</p>
            <ul className="ml-4 space-y-1">
              <li
                className={
                  password.length >= 8 ? "text-green-400" : "text-white/60"
                }
              >
                • At least 8 characters
              </li>
              <li
                className={
                  /[a-zA-Z]/.test(password) ? "text-green-400" : "text-white/60"
                }
              >
                • Letters (a-z, A-Z)
              </li>
              <li
                className={
                  /\d/.test(password) ? "text-green-400" : "text-white/60"
                }
              >
                • Numbers (0-9)
              </li>
              <li
                className={
                  /[@$!%*?&]/.test(password)
                    ? "text-green-400"
                    : "text-white/60"
                }
              >
                • Symbols (@$!%*?&)
              </li>
            </ul>
          </div>

          {/* Submit */}
          <ButtonLayout type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </ButtonLayout>
        </form>

        {/* Footer link */}
        <p className="mt-4 text-white/80 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
