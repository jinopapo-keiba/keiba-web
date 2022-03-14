import { createSlice, configureStore } from '@reduxjs/toolkit'

const raceSlice = createSlice({
    name: 'race',
    initialState: {
      raceId: 0
    },
    reducers: {
      selectRace: (state,action) => {
        state.raceId = action.raceId
      }
    }
  })

  export const { selectRace } = raceSlice.actions
  export default raceSlice.reducer