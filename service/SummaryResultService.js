import BestTimeRepository from '../repository/BestTimeRepository';
import StadiumRepository from '../repository/StadiumRepository';

class SummaryResultService {
    async makeSummaryResult(race,raceId,length,raceCondition){
        const ranStadiums = await StadiumRepository.fetchRanStadium(raceId,length)
        const targetRanStadiums = ranStadiums.filter((ranStadium) =>{
          return race.stadium === ranStadium
        })
        let timesPromises = []
        timesPromises.push(BestTimeRepository.fetchBestTime(length,raceId,null,raceCondition))
        timesPromises = timesPromises.concat(
          targetRanStadiums.map((ranStadium) => {
              return BestTimeRepository.fetchBestTime(length,raceId,ranStadium,raceCondition)}
          ))
        const stadiumTimes = await Promise.all(
            timesPromises.map(async (timesPromise) => {
                const times = await timesPromise
                return this.convertTimes(times)
            })
        )
        const horses = await Promise.all(
            timesPromises.map(async (timesPromise) => {
                const times = await timesPromise
                return times.horses
            })
        )
        const lengthResponse = await fetch(`http://localhost:8080/v1/race/length?raceId=${raceId}`)
        const lengths = await lengthResponse.json()
        return {
            stadiumTimes: stadiumTimes,
            horses: horses[0],
            lengths: lengths,
            ranStadiums: targetRanStadiums
        }
    }

    convertTimes(times){
        const fullTimes = []
        const lastRapTimes = []
        const raceFullTimes = []
        const raceLastRapTimes = []
        for(let i=0; i < times.horses.length; i++){
          fullTimes.push(
            {
              name: times.horses[i].name,
              devMin: times.bestFullTimes[i] > 0 ? times.bestFullTimes[i].toFixed(1) : 0,
              devAvg: times.avgFullTimes[i] > 0 ? times.avgFullTimes[i].toFixed(1) : 0,
              count: times.counts[i]
            }
          )
          lastRapTimes.push(
            {
              name: times.horses[i].name,
              devMin: times.bestLastRapTimes[i] > 0 ? times.bestLastRapTimes[i].toFixed(1) : 0,
              devAvg: times.avgLastRapTimes[i] > 0 ? times.avgLastRapTimes[i].toFixed(1) : 0,
              count: times.counts[i]
            }
          )
          raceFullTimes.push(
            {
              name: times.horses[i].name,
              devMin: times.raceBestFullTimes[i] > 0 ? times.raceBestFullTimes[i].toFixed(1) : 0,
              devAvg: times.raceAvgFullTimes[i] > 0 ? times.raceAvgFullTimes[i].toFixed(1) : 0,
              count: times.counts[i]
            }
          )
          raceLastRapTimes.push(
            {
              name: times.horses[i].name,
              devMin: times.raceBestLastRapTimes[i] > 0 ? times.raceBestLastRapTimes[i].toFixed(1) : 0,
              devAvg: times.raceAvgLastRapTimes[i] > 0 ? times.raceAvgLastRapTimes[i].toFixed(1) : 0,
              count: times.counts[i]
            }
          )
        }
        return {
          fullTimes: fullTimes,
          lastRapTimes: lastRapTimes,
          raceFullTimes: raceFullTimes,
          raceLastRapTimes: raceLastRapTimes
        }
    }
}

export default new SummaryResultService();