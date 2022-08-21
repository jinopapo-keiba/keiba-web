interface HorseRecentResult{
    id: number,
    name: string,
    framenumber: number,
    raceResults: RecentResult[]
}

interface RecentResult{
    race: Race,
    result: Result
}