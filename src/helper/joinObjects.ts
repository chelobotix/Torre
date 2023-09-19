const joinObjects = (text: string): string[] => {
    const userArray = text.split(/(?=[{])/g)
    userArray.forEach((user, index) => {
        userArray[index] = JSON.parse(userArray[index])
    })
    return userArray
}

export { joinObjects }
