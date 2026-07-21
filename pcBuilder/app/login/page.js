"use client"

import {signIn} from 'next-auth/react';

export default function LoginPage(){
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={{ width: '400px', padding: '2rem', background: '#1a1a1a', borderRadius: '8px', color: 'white', textAlign: 'center' }}>
                <h2 style={{ color: '#00ffcc', marginBottom: '1rem' }}>Power On</h2>
                <p style={{ color: '#aaa', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
                    Access the Lab using your secure Google Account. No passwords required.
                </p>
                <button
                    onClick={() => signIn('google', { callbackUrl: '/build' })}
                    style={{
                        padding: '1rem',
                        background: '#00ffcc',
                        color: 'black',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1.1rem'
                    }}
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}