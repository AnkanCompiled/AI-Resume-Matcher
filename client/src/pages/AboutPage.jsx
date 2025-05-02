import React from 'react'

export default function AboutPage() {
    return (
        <>
            <div className='mx-[20vw] mt-10'>
                <h3 className='text-2xl text-secondary'>About Us</h3>
                <div className='grid xl:grid-cols-[1fr_max-content] mt-10 gap-5'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-5xl/tight font-semibold mb-5'>Helping people finding their desired Job.</h1>
                        <p className='text-lg text-gray-600'>We are a team of dedicated professionals committed to helping individuals find their dream jobs. Our platform connects job seekers with employers, making the job search process easier and more efficient.</p>
                        <p className='text-lg text-gray-600'>With a user-friendly interface and advanced search features, we strive to provide the best experience for both job seekers and employers.</p>
                    </div>
                    <div className='hidden xl:flex justify-end'>
                        <img src="https://i.ibb.co/vvjW2zkF/working-people.jpg" alt="About Us" className='w-[400px] h-[400px] rounded-lg shadow-lg' />
                    </div>
                </div>

            </div>
        </>
    )
}
