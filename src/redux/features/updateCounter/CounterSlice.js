import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quantity: 0,
}

const CounterSlice = createSlice({
    name: 'cartQuantity',
    initialState,
    reducers: {
        updatedByAmount: (state, action) => {
            const { id, updateQuantity } = action.payload;
            if (state[id] !== undefined) {
                state[id].quantity = updateQuantity;
            }
        }
    }
})

export const { updatedByAmount } = CounterSlice.actions;
export default CounterSlice.reducer;