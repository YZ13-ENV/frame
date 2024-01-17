import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"
import { DocNotification, Notification } from "@/types/notifications"
import { DateTime } from "luxon"

const generateNotification = (title: string, description: string, receiver: string, link?: string): Notification => {
  const notification: Notification = {
    title: title,
    description: description,
    receiver: receiver,
    createdAt: DateTime.now().toSeconds(),
    isViewed: false
  }
  if (link) notification.link = link
  return notification
}

export const notifications = {
  push: async(title: string, description: string, receiver: string, link?: string): Promise<DocNotification | null> => {
    const notification = generateNotification(title, description, receiver, link)
    try {
      const headers = new Headers()
      const authHeader = authorizationHeader()
      headers.append('authorization', authHeader || '')
      headers.append('Content-Type', 'application/json')
      const res = await fetch(`${api_host}/notifications/notification/${receiver}`,
        { method: 'POST', headers: headers, body: JSON.stringify(notification) }
      )
      if (res.ok) return await res.json() as DocNotification
      return null
    } catch (e) {
      return null
    }
  },
  patch: async(id: string, notId: string, notification: Partial<Notification>): Promise<DocNotification | null> => {
    try {
      const headers = new Headers()
      const authHeader = authorizationHeader()
      headers.append('authorization', authHeader || '')
      headers.append('Content-Type', 'application/json')
      const res = await fetch(`${api_host}/notifications/notification/${id}/${notId}`,
        { method: 'PATCH', headers: headers, body: JSON.stringify(notification) }
      )
      if (res.ok) return await res.json() as DocNotification
      return null
    } catch (e) {
      return null
    }
  },
  delete: async(id: string, notId: string): Promise<boolean> => {
    try {
      const headers = new Headers()
      const authHeader = authorizationHeader()
      headers.append('authorization', authHeader || '')
      const url = `${api_host}/notifications/notification/${id}/${notId}`
      const res = await fetch(url, { method: 'DELETE', headers: headers })
      if (res.ok) return Boolean(await res.text())
      return false
    } catch (e) {
      return false
    }
  },
  all: async(id: string): Promise<DocNotification[]> => {
    try {
      const headers = new Headers()
      const authHeader = authorizationHeader()
      headers.append('authorization', authHeader || '')
      const url = `${api_host}/notifications/all/${id}`
      const res = await fetch(url, { method: 'GET', cache: 'no-store', headers: headers })
      if (res.ok) return await res.json() as DocNotification[]
      return []
    } catch (e) {
      return []
    }
  },
  streamAll: async(id: string) => {
    try {
      const headers = new Headers()
      const authHeader = authorizationHeader()
      headers.append('authorization', authHeader || '')
      headers.append('Content-Type', 'text/event-stream')
      const url = `${api_host}/notifications/all/${id}`
      const res = await fetch(url, { method: 'GET', cache: 'no-store', headers: headers })
      if (res.ok) {
        console.log(await res.json())
        return await res.json()
      }
      return null
    } catch (e) {
      return null
    }
  }
}