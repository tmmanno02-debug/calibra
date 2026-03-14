'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    if (error) alert(error.message)
    else alert('Controlla la tua email per confermare la registrazione!')
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) alert(error.message)
    else {
      router.push('/dashboard') // O la pagina che preferisci
      router.refresh()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '100px auto' }}>
      <h1>Login / Registrazione</h1>
      <input name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignIn}>Accedi</button>
      <button onClick={handleSignUp}>Registrati</button>
    </div>
  )
}
