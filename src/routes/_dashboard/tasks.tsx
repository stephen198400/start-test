import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/tasks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/tasks"!</div>
}
