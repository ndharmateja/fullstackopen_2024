const Header = ({ name, onLogoutClick }) => {
    return (
        <div>
            <h2>blogs</h2>
            <p>
                {name} logged in <button onClick={onLogoutClick}>logout</button>
            </p>
        </div>
    );
};

export default Header;
