import React from 'react'

export default function LoadingComponent(fullscreen = false) {
    return (
        fullscreen ? <FullScreen ><Loading /></FullScreen> : <Loading />

    )
}

function Loading() {
    return (
        <div className='flex items-center gap-5'>
            <div className='border-2 border-gray-900 border-b-0 border-r-0 w-8 h-8 animate-spin rounded-full'></div>
            <h3>Loading</h3>
        </div>
    )
}

function FullScreen({ children }) {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-default text-default">
            {children}
        </div>
    )
}
