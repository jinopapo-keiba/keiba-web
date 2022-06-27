class ResultRepository{
    async fetchResult(raceId,raceLength,stadium) {
        let param = `raceId=${raceId}`
        if(raceLength) {
            param += `&raceLength=${raceLength}`
        }
        if(stadium) {
            param += `&stadium=${stadium}`
        }
        const response = await fetch(`http://localhost:8080/v1/race/recent?${param}`)
        const json = await response.json()
        return json;
    }
}

export default new ResultRepository();