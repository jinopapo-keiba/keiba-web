import RaceRepository from "../repository/RaceRepository"
import ResultReposiotry from "../repository/ResultReposiotry"
import HorseScoreRepository from "../repository/HorseScoreRepository"

class RecentResultService{
    async makeRecentResultDate(raceId,minRaceLength,maxRaceLength,stadiums,query) {
        const race = await RaceRepository.fetchRace(raceId)
        const horses = await ResultReposiotry.fetchResult(raceId,minRaceLength,maxRaceLength,stadiums)
        /*const horseScores = await HorseScoreRepository.fetchHorseScore(Number(raceId))
        horses.map((horse) => {
            const horseScore = horseScores.find(horseScore => horseScore.horseName === horse.name)
            horse.score = horseScore.score.toFixed(1)
        })
        const topHorse = horseScores.sort((now,next) => next.score - now.score).slice(0,5)*/
        const maxResult = horses.length > 0 ? horses.reduce((max,now) => Math.max(max,now.raceResults.length),0) : 0
        return {
            maxResult: maxResult,
            horses: horses,
            //horseScore: horseScores,
            race: race[0],
            requestParam: query,
            //topHorse: topHorse,
        }
    }
}

export default new RecentResultService();