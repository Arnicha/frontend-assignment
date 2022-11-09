import React, { ChangeEvent, useEffect, useState } from 'react'
import './Trips.scss'
import { ImSearch } from 'react-icons/im'
import Tags from './tags/Tags'
import TripDetail from './tripDetail/TripDetail'
import { TripsModel } from '../model/TripsModel'
import SearchService from '../api/SearchService'
import { useLocation } from 'react-router-dom'

type Props = {}

export default function Trips({ }: Props) {
    const { pathname } = useLocation()
    const service: SearchService = new SearchService()
    const [trips, setTrips] = useState<Array<TripsModel>>(new Array<TripsModel>())
    const [keyword, setKeyword] = useState<string>('')
    const queryString: URLSearchParams = new URLSearchParams(window.location.search)

    useEffect(() => {
        mapSearchParams()
    }, [])
    
    useEffect(() => {
        appendParams()
    }, [keyword])

    async function searchByKeyword(keyword: string): Promise<void> {
        try {
            const dataTripList: Array<TripsModel> = await service.searchTrips(keyword)
            setTrips( dataTripList)
        }catch (error) {
            console.error(error)
        }
    }

    function mapSearchParams(): void {
        const query = queryString.get("keyword")   
        if (query) {
            setKeyword(query)
            searchByKeyword(query)
        }else {
            searchByKeyword('')
        }
    }

    function appendParams(): void {
        if (keyword) {
            window.history.replaceState(null, '', pathname + '?keyword=' + keyword)
        } else {
            window.history.replaceState(null, '', pathname)
        }
        searchByKeyword(keyword)
    }

    return (
        <div id='tripsMain'>
            <div className='topic-search'>
                <div className='topic-container'>
                    <p className='text-topic'>เที่ยวไหนดี</p>
                </div>
                <div className='search-container'>
                    <div className='search'>
                        <div className='icon-div'>
                            <ImSearch className='search-icon' />
                        </div>
                        <div className='input-div'>
                            <input type="text" className='search-input'
                                placeholder='หาที่เที่ยวแล้วไปกัน...'
                                value={keyword}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='body-container'>
                <div className='tags-container'>
                    <Tags setKeyWord={setKeyword} />
                </div>
                <div className='trip-detail'>
                    <TripDetail trips={trips} setKeyWord={setKeyword} />
                </div>
            </div>
        </div>
    )
}