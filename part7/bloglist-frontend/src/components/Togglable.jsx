import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleVisibility } from "../reducers/visibilityReducer";

const Togglable = (props) => {
    const visible = useSelector((store) => store.visible);
    const dispatch = useDispatch();

    return (
        <div>
            {/* show "buttonLabel" button when visible is false */}
            {!visible && (
                <div>
                    <button onClick={() => dispatch(toggleVisibility())}>
                        {props.buttonLabel}
                    </button>
                </div>
            )}
            {/* show the children when visible is true */}
            {visible && (
                <div>
                    {props.children}
                    <button onClick={() => dispatch(toggleVisibility())}>
                        cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default Togglable;
