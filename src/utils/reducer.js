const reducer = ( state, action ) => {

    if( action.type === "CLEAR_ITEMS"){
        return {...state, cart: []}
    }
    if ( action.type === 'REMOVE_ITEM'){
        return {...state, cart: [...state.cart.filter((item) => item.id !== action.payload)]}
    }
    if ( action.type === 'INCREASE'){
        let tempCart = state.cart.map((item) => {
            if(item.id === action.payload){
                return {...item, amount: item.amount + 1}
            }
            return item 
        })
        return {...state, cart: tempCart}
    }
    if ( action.type === 'DECREASE'){
        let tempCart = state.cart.map((item) => {
            if(item.id === action.payload){
                return {...item, amount: item.amount - 1}
            }
            return item 
        }).filter(item => item.amount !== 0)
        return {...state, cart: tempCart}
    }
    if(action.type === "GET_TOTAL"){
            let { total, amount } = state.cart.reduce((carTotal, item) => {
                const { price, amount } = item
                const totalPrice = price * amount
                carTotal.amount += amount
                carTotal.total += totalPrice
                return carTotal
            },
            {
                total:0, 
                amount:0
            }
        )
        total = parseFloat(total.toFixed(2))
        return {...state, total, amount }
    }
    if(action.type === 'LOADING'){
        return { ...state, isLoading: true} 
    }
    if(action.type === 'LOAD_ITEMS'){
        return { ...state, isLoading: false, cart: action.payload} 
    }
}

export default reducer