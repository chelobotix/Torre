class HandleLocalStorage {
    key: string
    constructor(key: string) {
        this.key = key
    }

    setData = (data: any): void => {
        localStorage.setItem(this.key, JSON.stringify(data))
    }

    getData = (): string | null => {
        const result = localStorage.getItem(this.key)
        if (result !== null) {
            return JSON.parse(result)
        }
        return null
    }

    reset = (): void => {
        localStorage.setItem(this.key, JSON.stringify(''))
    }
}

export { HandleLocalStorage }
