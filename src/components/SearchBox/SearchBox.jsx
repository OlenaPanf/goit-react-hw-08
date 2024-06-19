import css from './SearchBox.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';
import { selectNameFilter } from '../../redux/filtersSlice';

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  
  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

    return (
    <div>
      <p>Find contacts by name</p>
        <input
          className={css.field}
        type="text"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
}
