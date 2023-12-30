import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { reducers } from '@darkmaterial/core/entities'
import draftReducer from '@/components/entities/uploader/draft'
import { combineReducers } from '@reduxjs/toolkit'
import ThumbnailStatusReducer from '@/components/entities/uploader/thumbnail.store'
import ModalsReducer from '@/components/entities/uploader/modal.store'

const uploader = combineReducers({ draft: draftReducer, modal: ModalsReducer, thumbnail: ThumbnailStatusReducer })

export const store = configureStore({
    reducer: {
        ...reducers,
        uploader: uploader
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;