import type { DocData } from './common'

// /users/{uid}/notifications/{id}
export type Notification = {
  receiver: string
  isViewed: boolean
  title: string
  description: string
  createdAt: number
  link?: string
}
export type DocNotification = DocData<Notification>