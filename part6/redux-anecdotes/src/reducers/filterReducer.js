const FILTER_ACTION = "FILTER";

const filterReducer = (state = "", action) => {
    switch (action.type) {
        case FILTER_ACTION:
            return action.payload;
        default:
            return state;
    }
};

export const updateFilter = (filterString) => {
    return {
        type: FILTER_ACTION,
        payload: filterString,
    };
};

export default filterReducer;
