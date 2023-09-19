import { type IUser } from '../interfaces/userInterface'

const joinObjects = (text: string): IUser[] => {
    const textArray: string[] | IUser[] = text.split(/(?=[{])/g)
    const userArray: IUser[] = []
    textArray.forEach((_user, index) => {
        userArray.push(JSON.parse(textArray[index]))
    })

    return userArray
}

export { joinObjects }
