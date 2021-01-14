interface Artist {
    id: string,
    name: string
}
export interface SpotifyItem {
    id: string, 
    name: string,
    artists:Artist[]
}