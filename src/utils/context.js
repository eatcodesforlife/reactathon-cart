import React, { useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()
const initialState = { 
        isLoading: false, 
        cart: [],
        total: 0,
        amount: 0
    }



const AppProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    
    const clearItems = () => {
        dispatch({type: "CLEAR_ITEMS"})
    }

    const removeItem = (id) => {
        dispatch({type: "REMOVE_ITEM", payload: id})
    }

    const increaseItem = (id) => {
        dispatch({type: "INCREASE", payload: id})
    }

    const decreaseItem = (id) => {
        dispatch({type: "DECREASE", payload: id})
    }

    const fetchData = async () => {
        dispatch({type: 'LOADING'})

        const res = await fetch(url)
        const data = await res.json()

        dispatch({type: "LOAD_ITEMS", payload: data})
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        dispatch({type: 'GET_TOTAL'})
    }, [state.cart])


  return (
    <AppContext.Provider
      value={{
        ...state,
        clearItems,
        removeItem,
        decreaseItem,
        increaseItem,
        fetchData
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
