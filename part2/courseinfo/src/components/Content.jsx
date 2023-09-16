import { Part} from './Part'

export const Content = ({ parts }) => 
<>
  {parts.map(part => <Part key={part.id} part={part} />)}
</>