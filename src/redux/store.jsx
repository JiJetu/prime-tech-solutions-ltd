import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/updateCounter/CounterSlice'

const store = configureStore({
    reducer: {
      cartQuantity: counterReducer
    },
  })

export default store;