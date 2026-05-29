import ProjectDetail from './ProjectDetail'
import axiosIns from '../../config/constant'

export async function generateStaticParams() {
  try {
    const res = await axiosIns.get('/projects')
    return res.data.map((project: any) => ({
      id: String(project._id || project.id),
    }))
  } catch {
    return []
  }
}

export default function Page() {
  return <ProjectDetail />
}
