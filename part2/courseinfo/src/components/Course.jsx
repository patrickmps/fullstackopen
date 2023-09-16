import { Header } from './Header'
import { Content } from './Content'

export const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <strong>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
    </div>
  )
}