import { DraftForUpload } from '@/types/shot';
import { createSlice } from '@reduxjs/toolkit';


type Props = {
    draftId: string | null
    draft: DraftForUpload
}

const initialState: Props = {
    draftId: null,
    draft: {
        attachments: [],
        authorId: '',
        title: '',
        rootBlock: {
            id: 0,
            content_type: '',
            type: 'media'
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
        setTitle(state, { payload, type }: { payload: DraftForUpload['title'], type: string }) {
            state.draft.title = payload
        },
        setRootBlock(state, { payload, type }: { payload: DraftForUpload['rootBlock'], type: string }){
            state.draft.rootBlock = payload
        },
        setThumbnail(state, { payload, type }: { payload: DraftForUpload['thumbnail'], type: string }){
            state.draft.thumbnail = payload
        },
        setBlocks(state, { payload, type }: { payload: DraftForUpload['blocks'], type: string }){
            state.draft.blocks = payload
        }
    }
})

export const { setTitle, setBlocks, setDraftId, setThumbnail, setRootBlock, setDraft } = draftSlice.actions
export default draftSlice.reducer