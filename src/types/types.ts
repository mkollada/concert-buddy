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
    venueId: string
    venueLoc: string
    artistId: string
    artistImageUri: string
    eventId: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShow(obj: any): obj is Show {
    if (!obj) return false;
    console.log(obj);
    return (
        // Checking for mandatory fields first
        typeof obj.userId === 'string' &&
        typeof obj.artistName === 'string' &&
        typeof obj.date === 'string' &&
        typeof obj.venue === 'string' &&
        typeof obj.overallRating === 'number' &&
        typeof obj.notes === 'string' &&
        Array.isArray(obj.photoUrls) && obj.photoUrls.every((url: string) => typeof url === 'string') &&
        typeof obj.venueId === 'string' &&
        typeof obj.venueLoc === 'string' &&
        typeof obj.artistId === 'string' &&
        typeof obj.artistImageUri === 'string' &&
        typeof obj.eventId === 'string' &&

        // Checking for optional fields
        (typeof obj.id === 'undefined' || typeof obj.id === 'string') &&
        (typeof obj.createdAt === 'undefined' || typeof obj.createdAt === 'string') &&
        (typeof obj.stagePresenceRating === 'undefined' || typeof obj.stagePresenceRating === 'number') &&
        (typeof obj.musicalityRating === 'undefined' || typeof obj.musicalityRating === 'number') &&
        (typeof obj.productionRating === 'undefined' || typeof obj.productionRating === 'number')
    );
}