class ResultRepository{
    async fetchResult(raceId) {
        const response = await fetch(`http://localhost:8080/v1/raceResult/recent?=${raceId}`)
        const json = await response.json()
        return json;
    }
}

export default new ResultRepository();