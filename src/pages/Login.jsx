import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import ButtonLayout from "../components/‌ButtonLayout";
import GlassCard from "../components/GlassCard";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth(); // Get the login function from our memory box
  const navigate = useNavigate(); // This helps us go to different pages

  // This function runs when someone clicks "Sign in"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Don't refresh the page
    setError(""); // Clear any old errors
    setIsLoading(true); // Show that we're checking

    // Get all saved users
    const existingUsers = JSON.parse(
      localStorage.getItem("kanban-users") || "[]"
    );

    // Check if user exists with this email and password
    const user = existingUsers.find(
      (u) => u.email === email.toLowerCase().trim() && u.password === password
    );

    if (user) {
      // Success! Put user info in the memory box (without password)
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };

      login(userData); // Put user in memory box
      navigate("/dashboard"); // Go to dashboard
    } else {
      // Check if it's the demo admin account
      if (email === "admin@test.com" && password === "password") {
        const userData = {
          id: 999,
          name: "Admin User",
          email: email,
          avatar: "https://i.pravatar.cc/40?img=1",
        };

        login(userData);
        navigate("/dashboard");
      } else {
        // Wrong password or email
        setError("Invalid email or password. Please check your credentials.");
      }
    }

    setIsLoading(false); // Stop showing "checking"
  };

  return (
    // Center the login card
    <div
      className="min-h-screen grid place-items-center p-4
                    bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]"
    >
      <GlassCard>
        {/* Title */}
        <h1 className="text-white text-3xl font-semibold mb-6">Sign in</h1>

        {/* Show error if wrong password */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ButtonLayout type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </ButtonLayout>
        </form>

        {/* Demo credentials helper */}
        <div className="mt-4 p-3 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-200 text-sm">
          <p className="font-medium">Demo Account:</p>
          <p>Email: admin@test.com</p>
          <p>Password: password</p>
          <p className="mt-1 text-blue-300">Or create your own account!</p>
        </div>

        {/* Footer link */}
        <p className="mt-4 text-white/80 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
