import { DraftShotData } from '@/types/shot';
import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';


type Props = {
    draftId: string | null
    teamId: string | null
    draft: DraftShotData
}

const initialState: Props = {
    draftId: null,
    teamId: null,
    draft: {
        attachments: [],
        authorId: '',
        title: '',
        rootBlock: {
            id: '',
            content_type: '',
            type: 'media'
        },
        blocks: [],
        thumbnail: {
            id: '',
            contentType: '',
            url: ''
        },
        isDraft: true,
        updatedAt: DateTime.now().toSeconds()
    }
}

const draftSlice = createSlice({
    name: 'draft-control',
    initialState,
    reducers: {
        setTeamId(state, { payload, type }: { payload: Props['teamId'], type: string }) {
            state.teamId = payload
        },
        setDraft(state, { payload, type }: { payload: Props['draft'], type: string }) {
            state.draft = payload
        },
        setDraftId(state, { payload, type }: { payload: Props['draftId'], type: string }) {
            state.draftId = payload
        },
        setTitle(state, { payload, type }: { payload: DraftShotData['title'], type: string }) {
            state.draft.title = payload
        },
        setRootBlock(state, { payload, type }: { payload: DraftShotData['rootBlock'], type: string }){
            state.draft.rootBlock = payload
        },
        setThumbnail(state, { payload, type }: { payload: DraftShotData['thumbnail'], type: string }){
            state.draft.thumbnail = payload
        },
        setBlocks(state, { payload, type }: { payload: DraftShotData['blocks'], type: string }){
            state.draft.blocks = payload
        },
        setAttachments(state, { payload, type }: { payload: DraftShotData['attachments'], type: string }){
            state.draft.attachments = payload
        },
    }
})

export const {
    setTitle, setBlocks, setDraftId, setThumbnail, setRootBlock, setDraft, setAttachments, setTeamId
} = draftSlice.actions
export default draftSlice.reducer