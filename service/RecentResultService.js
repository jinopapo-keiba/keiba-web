import RaceRepository from "../repository/RaceRepository"
import ResultReposiotry from "../repository/ResultReposiotry"

class RecentResultService{
    async makeRecentResultDate(raceId,minRaceLength,maxRaceLength,stadiums,query) {
        const race = await RaceRepository.fetchRace(raceId)
        const horses = await ResultReposiotry.fetchResult(raceId,minRaceLength,maxRaceLength,stadiums)
        const maxResult = horses.length > 0 ? horses.reduce((max,now) => Math.max(max,now.raceResults.length),0) : 0
        return {
            maxResult: maxResult,
            horses: horses,
            race: race[0],
            requestParam: query
        }
    }
}

export default new RecentResultService();