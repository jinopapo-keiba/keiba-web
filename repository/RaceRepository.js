class RaceRepository {
    async fetchRace(raceId) {
        const response = await fetch(`http://localhost:8080/v1/race?raceId=${raceId}`)
        const json = await response.json()
        return json;
    }
}

export default new RaceRepository();