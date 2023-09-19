import './style.css'
export const Search = ({value, onChange}) => {
  return (
    <div>
      <label htmlFor="search">Find countries</label>
      <input id="search" value={value} onChange={onChange} />
    </div>
  )
}
