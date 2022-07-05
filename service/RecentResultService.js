import RaceRepository from "../repository/RaceRepository"
import ResultReposiotry from "../repository/ResultReposiotry"

class RecentResultService{
    async makeRecentResultDate(raceId,raceLength,stadium,query) {
        const race = await RaceRepository.fetchRace(raceId)
        const horses = await ResultReposiotry.fetchResult(raceId,raceLength,stadium)
        const maxResult = horses.length > 0 ? horses.reduce((max,now) => Math.max(max,now.raceResults.length),0) : 0
        const racesResponse = await fetch("http://localhost:8080/v1/race/before")
        const races = await racesResponse.json()
        return {
            maxResult: maxResult,
            horses: horses,
            race: race[0],
            races: races,
            requestParam: query
        }
    }
}

export default new RecentResultService();