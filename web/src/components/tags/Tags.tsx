import React, { Dispatch, useEffect, useState } from 'react'
import './Tags.scss'
import axios from 'axios'

type Props = { 
    setKeyWord: Dispatch<React.SetStateAction<string>>
}

export default function Tags({ setKeyWord }: Props) {
    const [tags, setTags] = useState<Array<string>>(new Array<string>())

    useEffect(() => {
        getAllTags()
    }, [])

    function getAllTags(): void {
        const url: string = 'http://localhost:8000/api/trips/tags'
        axios.get(url)
            .then(response => {
                setTags(response.data)
            }).catch(error => console.error(error))
    }

    return (
        <div id='tagsMain'>
            <div className='category-topic'>
                <p className='catrgory-text'>หมวดหมู่</p>
            </div>
            <div className='tags-div'>
                {tags.map((tag: string, index: number) => {
                    return (
                        <div key={index} className='tag-item' onClick={() => {setKeyWord(tag)}}>
                            <p className='tag-text'>{tag}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}