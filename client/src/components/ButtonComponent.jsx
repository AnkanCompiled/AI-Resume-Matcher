import React from 'react'

export default function ButtonComponent({ text, onClick, padding = "p-2", textSize = "text-lg", rounded = "rounded-lg" }) {
    return (
        <button className={`bg-[#3B82F6] hover:bg-[#60A5FA] shadow-lg ${rounded} ${padding} ${textSize} text-white font-bold duration-150 ease-in-out`}>{text}</button>
    )
}
