class StadiumRepository {
    async fetchRanStadium(raceId: number,raceLength: number): Promise<string[]>{
        const response = await fetch(`http://localhost:8080/v1/stadium/ran?raceId=${raceId}&raceLength=${raceLength}`)
        const json = await response.json()
        return json;
    }
}

export default new StadiumRepository()