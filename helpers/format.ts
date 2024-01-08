export const format = {
    numbers: (num: number) => {
        if (num < 999) {
            return num
        } else if (num >= 1000 && num <= 999_999) {
            return (num / 1000).toFixed(1) + 'k'
        } else return (num / 1_000_000).toFixed(1) + ' млн.'
    },
    random: (len: number, charSet?: string) => {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        var randomString = ''
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length)
            randomString += charSet.substring(randomPoz,randomPoz+1)
        }
        return randomString
    }
}