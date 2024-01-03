import { addSupabaseShow } from "../api";

const testShow =  {
    artistName: 'Big Thief',
    date: '2023-07-23',
    venue: 'Radio City',
    overallRating: 5,
    stagePresenceRating: 5,
    productionRating: 5,
    notes: "Too good."
}

addSupabaseShow(testShow)