const Header = ({ name, onLogoutClick }) => {
    return (
        <div>
            <p>
                {name} logged in <button onClick={onLogoutClick}>logout</button>
            </p>
        </div>
    );
};

export default Header;
