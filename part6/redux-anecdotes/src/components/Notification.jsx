import { useSelector } from "react-redux";

const Notification = () => {
    const { message, show } = useSelector((store) => store.notification);

    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        margin: 10,
    };
    return show ? <div style={style}>{message}</div> : null;
};

export default Notification;
