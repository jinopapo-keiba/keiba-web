class BestTimeRepository{
    normalizeTimes(times){
        const normalizedTimes = times.map(time => time/1000)
        let minTime =  Number.MAX_SAFE_INTEGER
        normalizedTimes.forEach(
          time => {
            if(time !== 0){
              minTime = Math.min(minTime,time - 0.3)
            }
          }
        )
        return {
          minTime: minTime,
          normalizedTimes: normalizedTimes
        }
    }

    async fetchBestTime(minRaceLength,maxRaceLength,raceId,stadiums,raceCondition){
        const param = []
        if (minRaceLength) {
            param.push(`minRaceLength=${minRaceLength}`)
        }
        if (maxRaceLength) {
            param.push(`maxRaceLength=${maxRaceLength}`)
        }
        if(stadiums){
            param.push(`stadiums=${stadiums.join(",")}`)
        }
        if(raceId){
            param.push(`raceId=${raceId}`)
        }
        if(raceCondition){
          param.push(`raceCondition=${raceCondition}`)
      }

        const response = await fetch(`http://localhost:8080/v1/raceResult/bestTime?${param.join("&")}`)
        const json = await response.json();
        const horses = json.bestRaceTimes.map(bestRaceTime => { 
            return {
              name: bestRaceTime.raceHorse.horse.name,
              frameNumber: bestRaceTime.raceHorse.frameNumber
            }
          })
        const counts = json.bestRaceTimes.map(bestRaceTime => bestRaceTime.count)
        return {
            bestFullTimes: json.bestRaceTimes.map(bestRaceTime => bestRaceTime.devBestFullTime),
            avgFullTimes: json.bestRaceTimes.map(bestRaceTime => bestRaceTime.devAvgFullTime),
            bestLastRapTimes: json.bestRaceTimes.map(bestRaceTime => bestRaceTime.devBestLastRapTime),
            avgLastRapTimes: json.bestRaceTimes.map(bestRaceTime => bestRaceTime.devAvgLastRapTime),
            raceBestFullTimes: json.bestRaceTimes.map(bestRaceTime => bestRaceTime.raceDevBestFullTime),
            raceAvgFullTimes: json.bestRaceTimes.map(bestRaceTime => bestRaceTime.raceDevAvgFullTime),
            raceBestLastRapTimes: json.bestRaceTimes.map(bestRaceTime => bestRaceTime.raceDevBestLastRapTime),
            raceAvgLastRapTimes: json.bestRaceTimes.map(bestRaceTime => bestRaceTime.raceDevAvgLastRapTime),
            horses: horses,
            counts: counts
        }
    }
}

export default new BestTimeRepository()
