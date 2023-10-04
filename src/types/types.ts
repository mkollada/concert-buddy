export type Show = {
    id?: string
    createdAt?: string
    userId: string
    artistName: string
    date: string
    venue: string
    overallRating: number
    stagePresenceRating?: number
    musicalityRating?: number
    productionRating?: number
    notes: string
    photoUrls: string[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShow(obj: any): obj is Show {
    if (!obj) return false;
    console.log(obj)
    return (
        // Checking for mandatory fields first
        typeof obj.userId === 'string' &&
        typeof obj.artistName === 'string' &&
        typeof obj.date === 'string' &&
        typeof obj.venue === 'string' &&
        typeof obj.overallRating === 'number' &&
        typeof obj.notes === 'string' &&

        // Checking for optional fields
        (typeof obj.id === 'undefined' || typeof obj.id === 'string') &&
        (typeof obj.createdAt === 'undefined' || typeof obj.createdAt === 'string') &&
        (typeof obj.stagePresenceRating === 'undefined' || typeof obj.stagePresenceRating === 'number') &&
        (typeof obj.musicalityRating === 'undefined' || typeof obj.musicalityRating === 'number') &&
        (typeof obj.productionRating === 'undefined' || typeof obj.productionRating === 'number')
    );
}