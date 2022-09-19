import BestTimeRepository from '../repository/BestTimeRepository';
import StadiumRepository from '../repository/StadiumRepository';

class SummaryResultService {
    async makeSummaryResult(raceId,length,raceCondition){
        const ranStadiums = await StadiumRepository.fetchRanStadium(raceId,length)
        let timesPromises = []
        timesPromises.push(BestTimeRepository.fetchBestTime(length,raceId,null,raceCondition))
        timesPromises = timesPromises.concat(ranStadiums.map((ranStadium) => {
          return BestTimeRepository.fetchBestTime(length,raceId,ranStadium,raceCondition)
        }))
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
            ranStadiums: ranStadiums
        }
    }

    convertTimes(times){
        const fullTimes = []
        const lastRapTimes = []
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
        }
        return {
          fullTimes: fullTimes,
          lastRapTimes: lastRapTimes,
        }
    }
}

export default new SummaryResultService();