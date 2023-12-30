import { createSlice } from '@reduxjs/toolkit';
import { ShotForUpload } from "@darkmaterial/core/types"


type Props = {
    draftId: string | null
    draft: ShotForUpload
}

const initialState: Props = {
    draftId: null,
    draft: {
        title: '',
        rootBlock: {
            type: 'image',
            link: ''
        },
        blocks: [],
        thumbnail: null
    }
}

const draftSlice = createSlice({
    name: 'draft-control',
    initialState,
    reducers: {
        setDraft(state, { payload, type }: { payload: Props['draft'], type: string }) {
            state.draft = payload
        },
        setDraftId(state, { payload, type }: { payload: Props['draftId'], type: string }) {
            state.draftId = payload
        },
        setTitle(state, { payload, type }: { payload: ShotForUpload['title'], type: string }) {
            state.draft.title = payload
        },
        setRootBlock(state, { payload, type }: { payload: ShotForUpload['rootBlock'], type: string }){
            state.draft.rootBlock = payload
        },
        setThumbnail(state, { payload, type }: { payload: ShotForUpload['thumbnail'], type: string }){
            state.draft.thumbnail = payload
        },
        setBlocks(state, { payload, type }: { payload: ShotForUpload['blocks'], type: string }){
            state.draft.blocks = payload
        }
    }
})

export const { setTitle, setBlocks, setDraftId, setThumbnail, setRootBlock, setDraft } = draftSlice.actions
export default draftSlice.reducer