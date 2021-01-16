interface Artist {
    id: string,
    name: string
}
export interface SpotifyTrack {
    id: string, 
    name: string,
    artists:Artist[]
}