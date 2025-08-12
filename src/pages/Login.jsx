import Input from '../components/Input';
import Button from '../components/‌Button';
import GlassCard from '../components/GlassCard';
import { Mail, Lock } from "lucide-react";


export default function Login() {
  return (
    // Center the login card
    <div className="min-h-screen grid place-items-center p-4
                    bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]">

      <GlassCard>
        {/* Title */}
        <h1 className="text-white text-3xl font-semibold mb-6">Sign in</h1>

        {/* Form */}
        <form className="space-y-4">
          <Input type="email" placeholder="Email address" icon={Mail} />
          <Input type="password" placeholder="Password" icon={Lock} />
          <Button>Sign in</Button>
        </form>

        {/* Footer link */}
        <p className="mt-4 text-white/80 text-sm">
          Don’t have an account? <span className="underline">Sign up</span>
        </p>
      </GlassCard>
    </div>
  );
}
