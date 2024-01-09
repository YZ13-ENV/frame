import { AppConfig } from "./types/config"

export const config: AppConfig = {
    name: "frame",
    version: "0.1.0",
    status: "development",
    app: {
        hasAuthPage: false,
        hasDashboardPage: false,
        hasProfilePageByNickname: true,
        hasHomePage: false,
        hasSearchPage: false
    },
    features: {
        enableLightMode: false,
        enableAppsGrid: true,
        enableNotifications: true
    },
    remote: {
        domain: "https://frame.darkmaterial.space",
        logo: {
            dark: "bum/bum-dark.svg",
            light: "bum/bum-light.svg"
        }
    }
}

export const updateConfigField = <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => {
    config[key] = value
}