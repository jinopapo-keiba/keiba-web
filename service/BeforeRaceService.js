class BeforRaceService {
    async makeBeforeRace() {
        const racesResponse = await fetch("http://localhost:8080/v1/race/before")
        const raceModels = await racesResponse.json()
        let stadiums = {}
        let races = {}
        let dates = []
        raceModels.forEach(raceModel => {
            const stadium = raceModel.stadium;
            const date = raceModel.raceDate;
            if(!dates.includes(date)){
                dates.push(date)
            }
            if(stadiums[date] === undefined){
                stadiums[date] = []
            }
            if(!stadiums[date].includes(stadium)){
                stadiums[date].push(stadium)
            }
            if( races[date] == undefined ){
                races[date] = {}
            }
            if( races[date][stadium] == undefined ){
                races[date][stadium] = []
            } 
            races[date][stadium].push({
                round: raceModel.round,
                name: raceModel.raceName,
                id: raceModel.id
            })
        })
        return {
            races: races,
            stadiums: stadiums,
            dates: dates
        }
    }
}


export default new BeforRaceService()