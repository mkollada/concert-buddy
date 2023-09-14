export type Show = {
    id?: string
    created_at?: string
    user_id: string
    artistName: string
    date: string
    venue: string
    overallRating: number
    stagePresenceRating?: number
    musicalityRating?: number
    productionRating?: number
    notes: string
}
