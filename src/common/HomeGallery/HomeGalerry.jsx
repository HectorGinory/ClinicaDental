import React from 'react'
import {useState} from 'react'

const HomeGalerry = () => {
    const imageSrcs = []
    const textSrcs= []
    const [image, setImage] = useState(imageSrcs[0])
  return (
    <>
      <div className='homegallery-container'>
        <div className='text-container'>
            <h2>sss</h2>
        </div>
        <div className='image-container'>
            <img src={image} className='gallery-img'/>
        </div>
      </div>
    </>
  )
}

export default HomeGalerry
