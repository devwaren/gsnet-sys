import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/staff/invoices/$hash')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/staff/invoices/$hash"!</div>
}
