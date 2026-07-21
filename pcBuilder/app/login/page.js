import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT } from 'jose';
import Link from 'next/link';



export default async function LoginPage() {
    async function mockLogin(formData) {
        "use server"

        const email = formData.get("email");
        const secret = new TextEncoder().encode('ericstock');
        const alg = 'HS256';
        const jwt = await new SignJWT({'email' : "eric.stock@cna.nl.ca"})
            .setProtectedHeader({alg})
            .setExpirationTime('1h')
            .sign(secret)
        const cookieStore = await cookies();
        cookieStore.set('session', jwt, { httpOnly: true})
        redirect('/build')
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={{ width: '400px', padding: '2rem', background: '#1a1a1a', borderRadius: '8px', color: 'white' }}>
                <h2 style={{ textAlign: 'center', color: '#00ffcc' }}>Power On</h2>

                <form action={mockLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        style={{ padding: '0.75rem', borderRadius: '4px' }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password (type anything for now!)"
                        required
                        style={{ padding: '0.75rem', borderRadius: '4px' }}
                    />
                    <button type="submit" style={{ padding: '1rem', background: '#00ffcc', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
                        Login
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Need an account? <Link href="/register" style={{ color: '#00ffcc' }}>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}