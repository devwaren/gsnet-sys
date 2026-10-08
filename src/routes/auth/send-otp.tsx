import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/send-otp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/send-otp"!</div>
}
