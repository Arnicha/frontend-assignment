import axios from 'axios'
import { TripsModel } from '../model/TripsModel'

class SearchService {

    public async searchTrips(keyword: string): Promise<Array<TripsModel>>{
        let dataTrips: Array<TripsModel> = []
        const url: string =  'http://localhost:8000/api/trips?keyword=' + keyword
        const response = await axios.get(url)
        dataTrips = response.data
        return dataTrips
    }
    
}

export default SearchService