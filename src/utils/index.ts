import { Show } from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function showArrayFromSupabase(data: any[]): Show[] {
    const shows: Show[] = data.map( show => {
      return supabaseShowToShow(show)
    })

    return shows
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function showToSupabaseShow(show: Show): object {
  
  return {
    artist_name: show.artistName,
    date: show.date,
    venue: show.venue, 
    overall_rating: show.overallRating, 
    stage_presence_rating: show.stagePresenceRating, 
    musicality_rating: show.musicalityRating, 
    production_rating: show.productionRating, 
    notes: show.notes,
    user_id: show.userId,
    photo_urls: show.photoUrls,
    artist_id: show.artistId,
    artist_image_uri: show.artistImageUri,
    venue_id: show.venueId,
    venue_loc: show.venueLoc,
    event_id : show.eventId
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function supabaseShowToShow(show: any): Show {
  return {
    id: show.id,
    createdAt: show.created_at,
    userId: show.user_id,
    artistName: show.artist_name,
    date: show.date,
    venue: show.venue,
    overallRating: show.overall_rating,
    notes: show.notes,
    photoUrls: show.photo_urls,
    productionRating: show.production_rating,
    musicalityRating: show.musicality_rating,
    stagePresenceRating: show.stage_presence_rating,
    artistId: show.artist_id,
    artistImageUri: show.artist_image_uri,
    venueId: show.venue_id,
    venueLoc: show.venue_loc,
    eventId: show.event_id
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function showFromSupabase(data: any[]): Show {
  if (data.length > 1) {
    console.error('Error show array is greater than 1 and should not be.')
    return data[0]
  }
    
  return supabaseShowToShow(data[0])
}

export const ensureString = (param: string | string[]) => {
  if (Array.isArray(param)) {
    // If it's an array, take the first element, or join them, based on your needs
    return param.join(', ')
  }
  return param || ''; // Fallback to an empty string if param is undefined
};