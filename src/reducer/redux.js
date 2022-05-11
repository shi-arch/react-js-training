const initialState = {
    test1: [],
    test2: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, test1: action.payload }
        case 'DECREMENT':
            return { ...state, test2: action.payload }
        case 'RESET':
            return { ...state, test3: action.payload }
        default:
            return state
    }
}
export default reducer;