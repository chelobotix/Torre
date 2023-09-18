interface IUser {
    ardaId: number
    ggId: number
    name: string
    comparableName: string
    username: string
    professionalHeadline: string
    imageUrl: string
    completion: number
    grammar: number
    weight: number
    verified: boolean
    connections: string[]
    totalStrength: number
    pageRank: number
    organizationId: string | null
    organizationNumericId: number | null
    publicId: string | null
    status: string | null
    creators: string[]
    relationDegree: number
    contact: boolean
}

export { type IUser }
