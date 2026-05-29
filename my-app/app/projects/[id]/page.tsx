
import ProjectDetail from './ProjectDetail'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/projects`)
    const projects = await res.json()
    return projects.map((project: any) => ({
      id: String(project._id || project.id),
    }))
  } catch {
    return []
  }
}

export default function Page() {
  return <ProjectDetail />
}