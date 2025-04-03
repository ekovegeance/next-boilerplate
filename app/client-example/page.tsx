import { auth } from "@/auth"
import ClientExample from "@/components/client-example"
import { SessionProvider } from "next-auth/react"
import ProfilePage from "../settings/(grouping)/profile/page"

export default async function ClientPage() {
  const session = await auth()
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    if (session?.user) {
      session.user = {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        username: session.user.username,
        role: session.user.role,
        avatar: session.user.avatar,
      }
    }
  }

  console.log("session dari page client-example", session?.user)
  return (
    <SessionProvider session={session}>
      <ClientExample />
      <ProfilePage/>
    </SessionProvider>
  )
}
