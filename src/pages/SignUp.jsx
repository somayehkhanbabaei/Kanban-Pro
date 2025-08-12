// src/pages/SignUp.jsx
import Input from "../components/Input";
import Button from "../components/‌Button";
import GlassCard from "../components/GlassCard";
import { User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";


export default function SignUp() {
  return (
    // Center the sign-up card with the same navy gradient
    <div className="min-h-screen grid place-items-center p-4
                    bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">

      <GlassCard>
        {/* Title */}
        <h1 className="text-white text-3xl font-semibold mb-6">Create account</h1>

        {/* Simple form */}
        <form className="space-y-4">
          {/* Name */}
          <Input type="text" placeholder="Full name" icon={User}/>
          {/* Email */}
          <Input type="email" placeholder="Email address"icon={Mail} />
          {/* Password */}
          <Input type="password" placeholder="Password" icon={Lock}/>

          {/* Submit */}
          <Button>Sign up</Button>
        </form>

        {/* Footer link */}
        <p className="mt-4 text-white/80 text-sm">
          Already have an account? <Link to='/login' className="underline">Sign in</Link>
        </p>
      </GlassCard>
    </div>
  );
}
