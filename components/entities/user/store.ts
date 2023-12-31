import { Reducer, createSlice } from "@reduxjs/toolkit"

export type UserInitState = {
    isSubscriber: boolean
}

const initialState: UserInitState = {
    isSubscriber: false
}

const UserSlice = createSlice({
    name: 'user-control',
    initialState,
    reducers: {
        setSubscribeState(state, { payload }: { payload: UserInitState['isSubscriber'], type: string }) {
            state.isSubscriber = payload
        }
    }
})
export const { setSubscribeState } = UserSlice.actions
export default UserSlice.reducer as Reducer<UserInitState>