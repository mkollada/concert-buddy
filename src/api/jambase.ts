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
        `${getJambaseArtistPrefix()}apikey=${getLocalJambaseApiKey()}&artistName=${artistName}`
    )
}

export async function searchVenue(venueName: string): Promise<JamBaseApiResponse> {
    return fetchData(
        `${getJambaseVenuePrefix()}apikey=${getLocalJambaseApiKey()}&venueName=${venueName}`
    )
}

export function getLocalJambaseApiKey() {
    const apiKey = process.env.JAMBASE_API_KEY;
    return apiKey
}

export function getJambaseApiPrefix() {
    return 'https://www.jambase.com/jb-api/v1/'
}

export function getJambaseArtistPrefix() {
    return getJambaseApiPrefix() + 'artists?'
}

export function getJambaseEventsPrefix() {
    return getJambaseApiPrefix() + 'events?'
}

export function getJambaseVenuePrefix() {
    return getJambaseApiPrefix() + 'venues?'
}

export function addJambaseApiKeyToRequest(request: string) {
    return request + `apikey=${getLocalJambaseApiKey()}`
}