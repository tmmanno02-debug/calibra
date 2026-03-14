import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    // Scambia il codice per una sessione
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Dopo il login, rimanda l'utente alla dashboard (o alla home)
  return NextResponse.redirect(new URL('/dashboard', request.url))
}
