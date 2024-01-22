import { keys } from "lodash"

type SettingsMap = {
  [key: string]: {
    section_name: string
    description: string
  }
}

export const settings: SettingsMap = {
  "": {
    section_name: 'Основные',
    description: "Управление аккаунтом"
  },
  "subscription": {
    section_name: 'Подписка',
    description: "Управление подпиской"
  },
  "social-links": {
    section_name: "Cоц. сети",
    description: "Укажите ссылки на соц. сети"
  },
  "edit-profile": {
    section_name: "Изменить профиль",
    description: "Измените настройки профиля"
  }
}
export const links = keys(settings)