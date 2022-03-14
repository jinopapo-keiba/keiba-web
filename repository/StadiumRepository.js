class StadiumRepository {
    async fetchRanStadium(raceId,raceLength) {
        const response = await fetch(`http://localhost:8080/v1/stadium/ran?raceId=${raceId}&raceLength=${raceLength}`)
        const json = await response.json()
        return json;
    }
}

export default new StadiumRepository()