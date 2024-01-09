import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"
import { ChunkResponse } from "@/types/common"
import { Attachment, DocDraftShotData, DocShotData, DraftForUpload, DraftShotData, ShotData } from "@/types/shot"

const LONG_CACHE_TIME = 600
const MEDIUM_CACHE_TIME = 300
const SHORT_CACHE_TIME = 120

export const bum = {
        isFollowed: async(userId: string, followId: string): Promise<boolean> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const res = await fetch(`${api_host}/users/isInFollowList?userId=${userId}&followId=${followId}`, { headers: headers })
                if (res.ok) return Boolean(await res.json())
                return false
            } catch(e) {
                return false
            }
        },
        follow: async(userId: string, followId: string): Promise<boolean> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const res = await fetch(`${api_host}/users/startFollow?userId=${userId}&followId=${followId}`, { method: 'POST', headers: headers })
                if (res.ok) return Boolean(await res.json())
                return false
            } catch(e) {
                return false
            }
        },
        unFollow: async(userId: string, followId: string): Promise<boolean> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const res = await fetch(`${api_host}/users/stopFollow?userId=${userId}&followId=${followId}`, { method: 'POST', headers: headers })
                if (res.ok) return Boolean(await res.json())
                return false
            } catch(e) {
                return false
            }
        },
        like: async(authorId: string, shotId: string, userToAdd: string): Promise<boolean> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const res = await fetch(`${api_host}/shots/addOrRemoveLikes?shotAuthorId=${authorId}&shotId=${shotId}&uid=${userToAdd}`, {
                    method: 'PATCH',
                    headers: headers
                })
                if (res.ok) {
                    return true
                } else return false
            } catch(e) {
                console.log(e)
                return false
            }
        },
        attachments: {
            generate: async(path: string, file: File): Promise<Attachment | null> => {
                try {
                    const headers = new Headers()
                    const form = new FormData()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = `${api_host}/shots/attachments/${path}`
                    form.append('file', file)
                    const res = await fetch(url, { method: 'POST', headers: headers, body: form })
                    if (res.ok) {
                        const attachment: Attachment = await res.json()
                        return attachment
                    } else return null
                } catch(e) {
                    console.warn(e)
                    return null
                }
            }
        },
        drafts: {
            all: async({ order, category }: { order?: string, category?: string }): Promise<ChunkResponse<DocDraftShotData[]>> => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = order && category 
                    ? `${api_host}/shots/all/${order}/${category}?onlyDrafts=true` 
                    : order ? `${api_host}/shots/all/${order}?onlyDrafts=true` 
                    : `${api_host}/shots/all/popular?onlyDrafts=true` 
                    const res = await fetch(url, { method: 'GET', headers: headers })
                    if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
                    return { count: 0, data: [], next: '' }
                } catch(e) {
                    console.warn(e)
                    return { count: 0, data: [], next: '' }
                }
            },
            byUser: async({ uid, order, category }: { uid?: string, order?: string, category?: string }): Promise<ChunkResponse<DocDraftShotData[]>> => {
                try {
                    if (!uid) throw Error('uid is not provided')
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = order && category 
                    ? `${api_host}/shots/user/${uid}/${order}/${category}?onlyDrafts=true` 
                    : order 
                    ? `${api_host}/shots/user/${uid}/${order}?onlyDrafts=true` 
                    : `${api_host}/shots/user/${uid}?onlyDrafts=true` 
                    const res = await fetch(url, { method: 'GET', headers: headers })
                    if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
                    return { count: 0, data: [], next: '' }
                } catch(e) {
                    console.warn(e)
                    return { count: 0, data: [], next: '' }
                }
            },
        },
        shots: {
                byUser: async({ uid, order, category }: { uid?: string, order?: string, category?: string }): Promise<ChunkResponse<DocShotData[]>> => {
                    try {
                        if (!uid) throw Error('uid is not provided')
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = order && category 
                        ? `${api_host}/shots/user/${uid}/${order}/${category}` 
                        : order 
                        ? `${api_host}/shots/user/${uid}/${order}` 
                        : `${api_host}/shots/user/${uid}` 
                        const res = await fetch(url, { method: 'GET', headers: headers })
                        if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
                        return { count: 0, data: [], next: '' }
                    } catch(e) {
                        console.warn(e)
                        return { count: 0, data: [], next: '' }
                    }
                },
                tags: async(): Promise<ChunkResponse<string[]>> => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = `${api_host}/tags`
                        const res = await fetch(url, { method: 'GET', headers: headers })
                        if (res.ok) {
                            const tags: ChunkResponse<string[]> = await res.json()
                            return tags
                        } else return { count: 0, data: [], next: '' }
                    } catch(e) {
                        console.warn(e)
                        return { count: 0, data: [], next: '' }
                    }
                },
                all: async({ order, category }: { order?: string, category?: string }): Promise<ChunkResponse<DocShotData[]>> => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = order && category ? `${api_host}/shots/all/${order}/${category}` : order ? `${api_host}/shots/all/${order}` : `${api_host}/shots/all/popular` 
                        const res = await fetch(url, { method: 'GET', headers: headers })
                        if (res.ok) return (await res.json() as ChunkResponse<DocShotData[]>)
                        return { count: 0, data: [], next: '' }
                    } catch(e) {
                        console.warn(e)
                        return { count: 0, data: [], next: '' }
                    }
                },
                byTag: async(tag: string, order: string): Promise<DocShotData[]> => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const fetchUrl = `${api_host}/tags/${tag}/${order}`
                        const res = await fetch(fetchUrl, { method: 'GET', headers: headers })
                        if (res.ok) {
                            const shots: DocShotData[] = await res.json()
                            return shots
                        } else return []
                    } catch(e) {
                        console.log(e)
                        return []
                    }
                },
                search: async(q: string | null, order: string='popular'): Promise<DocShotData[]> => {
                    if (q) {
                        try {
                            const headers = new Headers()
                            const authHeader = authorizationHeader()
                            headers.append('authorization', authHeader || '')
                            const url = `${api_host}/search/query/${q.toLowerCase()}/${order}`
                            const res = await fetch(url, { headers: headers })
                            if (res.ok) {
                                const shots: DocShotData[] = await res.json()
                                return shots
                            } else return []
                        } catch(e) {
                            return []
                        }
                    } else return []
                },
                byType: async(userId: string, type: 'draft' | 'shots'='shots', order?: 'popular' | 'new'): Promise<DocShotData[]> => {
                    const requestType = type === 'shots' ? 'onlyShots' : 'onlyDrafts'
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const shotsRes = await fetch(`${api_host}/shots/${requestType}/${userId}${order ? `?order=${order}` : ''}`, {
                            headers: headers
                        })
                        const shots: DocShotData[] = await shotsRes.json()
                        return shots
                    } catch(e) {
                        console.log(e)
                        return []
                    }
                },
        },
        shot: {
            // Тут мы можем выбрать что мы можем сделать с работой, получить, удалить и т.д.
                get: async(shotId: string, userId?: string): Promise<DocShotData | null> => {
                    try {
                        if (userId) {
                            const shotRes = await fetch(`${api_host}/shots/shot/${shotId}/${userId}`, { method: 'GET', cache: 'no-store' })
                            const shot: DocShotData = await shotRes.json()
                            return shot
                        } else {
                            const shotRes = await fetch(`${api_host}/shots/shot/${shotId}`, { method: 'GET', cache: 'no-store' })
                            const shot: DocShotData = await shotRes.json()
                            return shot
                        }
                    } catch(e) {
                        console.log(e)
                        return null
                    }
                },
                create: async(id: string, draft: ShotData) => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        headers.append('Content-Type', 'application/json')
                        const url = `${api_host}/shots/shot/${id}`
                        const res = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(draft) })
                        if (res.ok) return Boolean(await res.text())
                        return false
                    } catch(e) {
                        console.log(e)
                        return false
                    }
                },
                update: async(id: string, draft: ShotData) => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        headers.append('Content-Type', 'application/json')
                        const url = `${api_host}/shots/shot/${id}`
                        const res = await fetch(url, { method: 'PATCH', headers: headers, body: JSON.stringify(draft) })
                        if (res.ok) return Boolean(await res.text())
                        return false
                    } catch(e) {
                        console.log(e)
                        return false
                    }
                },
                delete: async(id: string) => {
                    try {
                        const headers = new Headers()
                        const authHeader = authorizationHeader()
                        headers.append('authorization', authHeader || '')
                        const url = `${api_host}/shots/shot/${id}`
                        const res = await fetch(url, { method: 'DELETE', headers: headers })
                        if (res.ok) return Boolean(await res.text())
                        return false
                    } catch(e) {
                        console.log(e)
                        return false
                    }
                },
                getPopularOne: async(userId: string): Promise<DocShotData | null> => {
                    try {
                        const shots = await bum.shots.byType(userId, 'shots', 'popular')
                        if (shots.length !== 0) {
                            return shots[0]
                        } else return null
                    } catch(e) {
                        return null
                    }
                }
        },
        draft: {
            get: async(shotId: string): Promise<DocDraftShotData | null> => {
                try {
                    const res = await fetch(`${api_host}/shots/draft/${shotId}`, { method: 'GET', cache: 'no-store' })
                    const draft: DocDraftShotData = await res.json()
                    return draft
                } catch(e) {
                    console.log(e)
                    return null
                }
            },
            create: async(id: string, draft: DraftForUpload) => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    headers.append('Content-Type', 'application/json')
                    const url = `${api_host}/shots/draft/${id}`
                    const res = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(draft) })
                    if (res.ok) return Boolean(await res.text())
                    return false
                } catch(e) {
                    console.log(e)
                    return false
                }
            },
            update: async(id: string, draft: DraftShotData) => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    headers.append('Content-Type', 'application/json')
                    const url = `${api_host}/shots/draft/${id}`
                    const res = await fetch(url, { method: 'PATCH', headers: headers, body: JSON.stringify(draft) })
                    if (res.ok) return Boolean(await res.text())
                    return false
                } catch(e) {
                    console.log(e)
                    return false
                }
            },
            delete: async(id: string) => {
                try {
                    const headers = new Headers()
                    const authHeader = authorizationHeader()
                    headers.append('authorization', authHeader || '')
                    const url = `${api_host}/shots/draft/${id}`
                    const res = await fetch(url, { method: 'DELETE', headers: headers })
                    if (res.ok) return Boolean(await res.text())
                    return false
                } catch(e) {
                    console.log(e)
                    return false
                }
            }
        },
}