import { useSelector } from "react-redux";

const Notification = () => {
    const { message, isError, show } = useSelector(
        (store) => store.notification
    );

    if (!show) {
        return null;
    }

    const style = {
        color: isError ? "red" : "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };
    return <div style={style}>{message}</div>;
};

export default Notification;
