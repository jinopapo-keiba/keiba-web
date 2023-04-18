class ResultRepository{
    async fetchResult(raceId: number,raceLength: number,stadiums: string[]): Promise<HorseRecentResult[]>{
        let param = `raceId=${raceId}`
        if(raceLength) {
            param += `&raceLength=${raceLength}`
        }
        if(stadiums) {
            param += `&stadiums=${stadiums.join(",")}`
        }
        const response = await fetch(`http://localhost:8080/v1/race/recent?${param}`)
        const json = await response.json()
        return json;
    }
}

export default new ResultRepository();