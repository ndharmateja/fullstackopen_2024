import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../reducers/filterReducer";

const Filter = () => {
    const filterString = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        dispatch(updateFilter(event.target.value));
    };

    const style = {
        marginBottom: 10,
    };

    return (
        <div style={style}>
            filter <input value={filterString} onChange={handleChange} />
        </div>
    );
};

export default Filter;
