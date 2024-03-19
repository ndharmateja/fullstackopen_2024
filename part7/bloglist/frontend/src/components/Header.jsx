import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import { Link } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const name = useSelector((store) => store.user.name);

    return (
        <div>
            <h1>Blog App</h1>
            <p>
                <Link to="/blogs">blogs</Link> <Link to="/users">users</Link>
                &emsp;
                <em>{name}</em> logged in&nbsp;
                <button onClick={() => dispatch(logout())}>logout</button>
            </p>
        </div>
    );
};

export default Header;
