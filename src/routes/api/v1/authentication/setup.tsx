import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/v1/authentication/setup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/api/v1/authentication/setup"!</div>
}
