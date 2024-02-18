import React, { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible(!visible);

    useImperativeHandle(refs, () => {
        return { toggleVisibility };
    });

    return (
        <div>
            {/* show "buttonLabel" button when visible is false */}
            {!visible && (
                <div>
                    <button onClick={toggleVisibility}>
                        {props.buttonLabel}
                    </button>
                </div>
            )}
            {/* show the children when visible is true */}
            {visible && (
                <div>
                    {props.children}
                    <button onClick={toggleVisibility}>cancel</button>
                </div>
            )}
        </div>
    );
});

export default Togglable;
