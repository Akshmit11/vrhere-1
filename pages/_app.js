import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from '../auth/Auth'


function MyApp({ Component, pageProps: { currentUser, ...pageProps }, }) {
  return (
    // <SessionProvider session={session}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
    // </SessionProvider>
  )
}

export default MyApp
