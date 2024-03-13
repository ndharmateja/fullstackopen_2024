import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";

const Header = () => {
    const dispatch = useDispatch();
    const name = useSelector((store) => store.user.name);

    return (
        <div>
            <p>
                {name} logged in{" "}
                <button onClick={() => dispatch(logout())}>logout</button>
            </p>
        </div>
    );
};

export default Header;
