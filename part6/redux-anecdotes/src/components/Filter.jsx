import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const action = filterChange(event.target.value);
    dispatch(action);
  };
  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
