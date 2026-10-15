import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/v1/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/api/v1/users/"!</div>
}
