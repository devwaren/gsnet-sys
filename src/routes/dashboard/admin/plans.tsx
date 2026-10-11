import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/admin/plans')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/admin/plans"!</div>
}
