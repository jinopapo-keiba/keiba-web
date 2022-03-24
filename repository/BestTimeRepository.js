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

    async fetchBestTime(length,raceId,summaryType,stadium,raceCondition){
        const param = []
        if(length){
            param.push(`raceLength=${length}`)
        }
        if(stadium){
            param.push(`stadium=${stadium}`)
        }
        if(raceId){
            param.push(`raceId=${raceId}`)
        }
        if(summaryType){
            param.push(`summaryType=${summaryType}`)
        }
        if(raceCondition){
          param.push(`raceCondition=${raceCondition}`)
      }

        const response = await fetch(`http://localhost:8080/v1/raceResult/bestTime?${param.join("&")}`)
        const json = await response.json();
        const fullTimes = this.normalizeTimes(json.bestRaceTimes.map(bestRaceTime => bestRaceTime.fullTime))
        const lastRapTimes = this.normalizeTimes(json.bestRaceTimes.map(bestRaceTime => bestRaceTime.lastRapTime))
        const horses = json.bestRaceTimes.map(bestRaceTime => { 
            return {
              name: bestRaceTime.raceHorse.horse.name,
              frameNumber: bestRaceTime.raceHorse.frameNumber
            }
          })
        const counts = json.bestRaceTimes.map(bestRaceTime => bestRaceTime.count)
        return {
            fullTimes: fullTimes,
            lastRapTimes: lastRapTimes,
            horses: horses,
            counts: counts
        }
    }
}

export default new BestTimeRepository()
