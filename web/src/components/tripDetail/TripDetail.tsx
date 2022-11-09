import React, { Dispatch } from 'react'
import './TripDetail.scss'
import { TripsModel } from '../../model/TripsModel'

type Props = {
    trips: Array<TripsModel>
    setKeyWord: Dispatch<React.SetStateAction<string>>
}

export default function TripDetail({ trips, setKeyWord }: Props) {

    return (
        <>
            {trips.map((item: TripsModel) => {
                return (
                    <div id='tripDetailCard' key={item.eid}>
                        <div className='image-container'>
                            <div className='image-bg'>
                                <img src={item.photos[0]} alt="" className='image-main' />
                            </div>
                        </div>
                        <div className='detail-container'>
                            <div className='title-trip'>
                                <p className='title-text'><a href={item.url}>{item.title}</a></p>
                                <div className='description'>
                                    <p className='description-text'>{item.description}</p>
                                    <p className='link'>
                                        <a href={item.url} className='link-a'>อ่านต่อ</a>
                                    </p>
                                </div>
                            </div>
                            <div className='category'>
                                <div className='category-label-div'>
                                    <p className='category-label'>หมวดหมู่</p>
                                </div>
                                <div className='tag-div'>
                                    {item.tags.map((tag: string, index: number) => {
                                        return (
                                            <div className='tag-item' key={index} onClick={() => {setKeyWord(tag)}}>
                                                <p className='tag'>{tag}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='image-item'>
                                <div className='image-item-div'>
                                    <img src={item.photos[1]} alt="" className='more-image' />
                                </div>
                                <div className='image-item-div'>
                                    <img src={item.photos[2]} alt="" className='more-image' />
                                </div>
                                <div className='image-item-div'>
                                    <img src={item.photos[3]} alt="" className='more-image' />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

        </>
    )
}