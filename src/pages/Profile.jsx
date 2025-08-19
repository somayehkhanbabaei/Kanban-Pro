import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import ButtonLayout from '../components/‌ButtonLayout';

export default function Profile() {
    return(
        <div className='min-h-screen grid place-items-center p-4 bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66]'>
            <GlassCard>
                {/* Header */}
                <h1 className="text-white text-2xl font-semibold mb-6">Your Profile</h1>
                {/* Avatar + Basic fields (UI only) */}
                <div className="flex items-center gap-4 mb-6">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30" />
                    <div className="text-white/80 text-sm">
                        <p>Upload a square image (JPG/PNG)</p>
                        <p>Max 2MB</p>
                    </div>
                </div>

                {/* Form fields */}
                <form className="space-y-4">
                <Input type="text" placeholder="Full name" />
                <Input type="email" placeholder="Email address" />
                <Input type="text" placeholder="Role (e.g., Product Manager)" />

                {/* Bio */}
                <div>
                    <textarea
                    placeholder="Short bio..."
                    className="w-full h-24 rounded-lg bg-white/10 border border-white/20 text-white
                                placeholder-white/70 outline-none p-3 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Save button */}
                <ButtonLayout>Save changes</ButtonLayout>
                </form>
            </GlassCard>
        </div>
    )
}