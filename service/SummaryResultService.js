import BestTimeRepository from '../repository/BestTimeRepository';
import StadiumRepository from '../repository/StadiumRepository';

class SummaryResultService {
    async makeSummaryResult(raceId,length,raceCondition){
        const ranStadiums = await StadiumRepository.fetchRanStadium(raceId,length)
        const timesPromises = ranStadiums.map((ranStadium) => {
            return {
                minTimesPromise: BestTimeRepository.fetchBestTime(length, raceId, "MIN", ranStadium, raceCondition),
                avgTimesPromise: BestTimeRepository.fetchBestTime(length, raceId, "AVG", ranStadium, raceCondition)
            }
        });
        const stadiumTimes = await Promise.all(
            timesPromises.map(async (timesPromise) => {
                const minTimes = await timesPromise.minTimesPromise
                const avgTimes = await timesPromise.avgTimesPromise
                return this.convertTimes(minTimes, avgTimes)
            })
        )
        const horses = await Promise.all(
            timesPromises.map(async (timesPromise) => {
                const minTimes = await timesPromise.minTimesPromise
                return minTimes.horses
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

    convertTimes(minTimes,avgTimes){
        const fullTimes = []
        const lastRapTimes = []
        const minFullTime = Math.min(minTimes.fullTimes.minTime,avgTimes.fullTimes.minTime)
        const minLastRapTime = Math.min(minTimes.lastRapTimes.minTime,avgTimes.lastRapTimes.minTime)
        for(let i=0; i < minTimes.horses.length; i++){
          fullTimes.push(
            {
              name: minTimes.horses[i].name,
              min: minTimes.fullTimes.normalizedTimes[i] === 0 ? minFullTime.toFixed(1) : minTimes.fullTimes.normalizedTimes[i].toFixed(1),
              avg: avgTimes.fullTimes.normalizedTimes[i] === 0 ? minFullTime.toFixed(1) : avgTimes.fullTimes.normalizedTimes[i].toFixed(1),
              devMin: minTimes.devFullTimes[i] > 0 ? minTimes.devFullTimes[i].toFixed(1) : 0,
              devAvg: avgTimes.devFullTimes[i] > 0 ? avgTimes.devFullTimes[i].toFixed(1) : 0,
              count: minTimes.counts[i]
            }
          )
          lastRapTimes.push(
            {
              name: minTimes.horses[i].name,
              min: minTimes.lastRapTimes.normalizedTimes[i] === 0 ? minLastRapTime.toFixed(1) : minTimes.lastRapTimes.normalizedTimes[i].toFixed(1),
              avg: avgTimes.lastRapTimes.normalizedTimes[i] === 0 ? minLastRapTime.toFixed(1) : avgTimes.lastRapTimes.normalizedTimes[i].toFixed(1),
              devMin: minTimes.devLastRapTimes[i] > 0 ? minTimes.devLastRapTimes[i].toFixed(1) : 0,
              devAvg: avgTimes.devLastRapTimes[i] > 0 ? avgTimes.devLastRapTimes[i].toFixed(1) : 0,
              count: minTimes.counts[i]
            }
          )
        }
        return {
          minFullTime: minFullTime,
          fullTimes: fullTimes,
          minLastRapTime: minLastRapTime,
          lastRapTimes: lastRapTimes,
        }
    }
}

export default new SummaryResultService();