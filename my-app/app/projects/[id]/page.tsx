import ProjectDetail from './ProjectDetail'

export async function generateStaticParams() {
  try {
    const res = await fetch('https://ion-blog-site.onrender.com/api/projects')
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
