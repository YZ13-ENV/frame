import { createSlice } from "@reduxjs/toolkit"


type InitState = {
    finalTouchModal: boolean
    stickerPicker: boolean
}

const initialState: InitState = {
    finalTouchModal: false,
    stickerPicker: false
}

const ModalUploaderSlice = createSlice({
    name: 'modal-control',
    initialState,
    reducers: {
        setFinalTouchModal(state, { payload, type }: { payload: InitState['finalTouchModal'], type: string }) {
            state.finalTouchModal = payload
        },
        setStickerPicker(state, { payload, type }: { payload: InitState['stickerPicker'], type: string }) {
            state.stickerPicker = payload
        }
    }
})
export const { setFinalTouchModal, setStickerPicker } = ModalUploaderSlice.actions
export default ModalUploaderSlice.reducer