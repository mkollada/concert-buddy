import axios from 'axios'
import { JamBaseApiResponse } from '../types/jambase';

export async function fetchData(request: string) {
      
    try {
        console.log(`sending request ${request}`)
        const response = await axios.get(request);

        return response.data
    } catch (error) {
        console.error("There was an error fetching the data", error);
         return null
    }

}

export async function searchArtistName(artistName: string): Promise<JamBaseApiResponse> {
    return fetchData(
        `${getJambaseSearchArtistPrefix()}apikey=${getLocalJambaseApiKey()}&artistName=${artistName}`
    )
}

export async function searchVenues(venueName: string): Promise<JamBaseApiResponse> {
    return fetchData(
        `${getJambaseSearchVenuePrefix()}apikey=${getLocalJambaseApiKey()}&venueName=${venueName}`
    )
}

// setting to only get concerts not festivals for now re: speed
export async function getPastEventsForArtist(artistId: string): Promise<JamBaseApiResponse> {
    return fetchData(
        `${getJamBaseArtistPrefix()}${artistId}?expandPastEvents=true&apikey=${getLocalJambaseApiKey()}&eventType=concert`
    )
}

export function getLocalJambaseApiKey() {
    const apiKey = process.env.EXPO_PUBLIC_JAMBASE_API_KEY;
    return apiKey
}

export function getJambaseApiPrefix() {
    return 'https://www.jambase.com/jb-api/v1/'
}

export function getJamBaseArtistPrefix() {
    return getJambaseApiPrefix() + 'artists/id/'
}

export function getJambaseSearchArtistPrefix() {
    return getJambaseApiPrefix() + 'artists?'
}

export function getJambaseSearchEventsPrefix() {
    return getJambaseApiPrefix() + 'events?'
}

export function getJambaseSearchVenuePrefix() {
    return getJambaseApiPrefix() + 'venues?'
}

export function addJambaseApiKeyToRequest(request: string) {
    return request + `apikey=${getLocalJambaseApiKey()}`
}