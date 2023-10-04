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
    photo_urls: show.photoUrls
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
    stagePresenceRating: show.stage_presence_rating
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function showFromSupabase(data: any[]): Show {
  if (data.length > 1) {
    console.error('Error show array is greater than 1 and should not be.')
    return data[0]
  }
    
  return data[0]
}