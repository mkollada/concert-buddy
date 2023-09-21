import { Show } from "../types/types";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function showArrayFromSupabase(data: any[]): Show[] {
    const shows: Show[] = data.map( show => {
      const { id, created_at, artistName, date, venue, overallRating, stagePresenceRating, musicalityRating, productionRating, notes, user_id } = show;
      return {
        id: id, 
        created_at: created_at, 
        artistName: artistName,
        date: date,
        venue: venue, 
        overallRating: overallRating, 
        stagePresenceRating: stagePresenceRating, 
        musicalityRating: musicalityRating, 
        productionRating: productionRating, 
        notes: notes,
        user_id: user_id
      };
    })

    return shows
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function showFromSupabase(data: any[]): Show {
  if (data.length > 1) {
    console.error('Error show array is greater than 1 and should not be.')
    return data[0]
  }
    
  return data[0]
}