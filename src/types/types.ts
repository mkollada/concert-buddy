export type Show = {
    id: string
    createdAt: string
    userId: string
    artistName: string
    date: string
    venue: string
    overallRating: number
    stagePresenceRating?: number
    musicalityRating?: number
    productionRating?: number
    memories: Memories
    notes: string
    photoUrls: string[]
    venueId: string
    venueLoc: string
    artistId: string
    artistImageUri: string
    eventId: string
    artistSpotifyUrl?: string
    venueRating: number
    supportingActs: [string, string][] //(artistId, artistName)
    setlist: string[]
}

export type SupabaseShow = {
    id: string
    created_at: string
    user_id: string
    artist_name: string
    date: string
    venue: string
    overall_rating: number
    stage_presence_rating?: number
    musicality_rating?: number
    production_rating?: number
    memories: Memories
    notes: string
    photo_urls: string[]
    venue_id: string
    venue_loc: string
    artist_id: string
    artist_image_uri: string
    event_id: string
    artist_spotify_url?: string
    venue_rating: number
    supporting_acts: [string, string][] //(artistId, artistName)
    setlist: string[]
}

export type Memories = {
    [prompt: string]: {
        color: string,
        response: string
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShow(obj: any): obj is Show {
    if (!obj) return false;
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
        typeof obj.memories === 'object' &&
        typeof obj.venueRating === 'number' &&
        
        // Checking for optional fields
        (typeof obj.id === 'undefined' || typeof obj.id === 'string') &&
        (typeof obj.createdAt === 'undefined' || typeof obj.createdAt === 'string') &&
        (typeof obj.stagePresenceRating === 'undefined' || typeof obj.stagePresenceRating === 'number') &&
        (typeof obj.musicalityRating === 'undefined' || typeof obj.musicalityRating === 'number') &&
        (typeof obj.productionRating === 'undefined' || typeof obj.productionRating === 'number') &&
        (Array.isArray(obj.setlist) && obj.setlist.every((item: string) => typeof item === 'string')) &&
        (Array.isArray(obj.supportingActs) && obj.supportingActs.every((act: string) => typeof act === 'string')) &&
        (typeof obj.artistSpotifyUrl === 'undefined' || typeof obj.artistSpotifyUrl === 'string') // Assuming artistSpotifyUrl should be a string, correcting previous assumption it's a number
    );
}
