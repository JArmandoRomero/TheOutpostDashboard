import Card from '../components/Card'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Users" value="1,248" />
      <Card title="Revenue" value="$34,200" />
      <Card title="Active Sessions" value="312" />
    </div>
  )
}