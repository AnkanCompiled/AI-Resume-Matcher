import React from 'react'
import Sentiment_Dissatisfied from '../assets/Sentiment_Dissatisfied'

export default function NotFoundPage() {
    return (
        <div className='flex flex-col text-center mt-20 gap-10'>

            <h1 className='text-9xl font-bold'>404</h1>
            <h3 className='text-6xl'>Page Not Found</h3>
            <p className='text-xl text-secondary'>The page you are looking for does not exist.</p>
        </div>
    )
}
