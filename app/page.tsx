import React from 'react';

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* Intestazione */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-600">Istituto di Geopolitica</h1>
        <p className="text-gray-600">Previsioni collettive sugli eventi mondiali</p>
      </header>

      {/* SEZIONE 1: SONDAGGIO DEL GIORNO */}
      <section className="bg-white border-2 border-blue-100 rounded-2xl p-8 shadow-sm mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-500 mb-2">Sondaggio del Giorno</h2>
        <h3 className="text-2xl font-bold mb-6">Qual è la probabilità che scatti un cessate il fuoco in [Area X] entro domenica?</h3>
        
        <div className="space-y-6">
          <input 
            type="range" 
            min="0" 
            max="100" 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>0% (Impossibile)</span>
            <span>50% (Incerto)</span>
            <span>100% (Certo)</span>
          </div>
          
          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
            Invia Previsione
          </button>
        </div>
      </section>

      {/* SEZIONE 2: STORICO SONDAGGI */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Sondaggi Recenti</h2>
        <div className="grid gap-4">
          {/* Esempio di un sondaggio passato */}
          <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">Esito elezioni in [Paese Y]</p>
              <p className="text-xs text-gray-400">Chiuso il 02/03/2026</p>
            </div>
            <div className="text-right">
              <span className="text-green-600 font-bold">Esito: 100%</span>
              <p className="text-xs text-gray-500 underline">Vedi dettagli Brier</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}




'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    alert('Controlla la mail o prova a loggare!')
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else window.location.href = '/' // Ti rimanda alla home se il login ok
  }

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Accedi a Forecast-Geopol</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSignIn}>Accedi</button>
      <button onClick={handleSignUp}>Registrati</button>
    </div>
  )
}
