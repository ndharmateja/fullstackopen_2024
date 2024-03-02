import { useNotification } from "../NotificationContextProvider";

const Notification = () => {
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    };

    const { message, show } = useNotification();

    return show ? <div style={style}>{message}</div> : null;
};

export default Notification;
