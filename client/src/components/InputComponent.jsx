import React from 'react'

export default function InputComponent({ value, setValue, type = "text", placeholder = "Enter text", width = "w-full", height = "h-12", rounded = "rounded-lg" }) {
    return (
        <div className={`relative ${width} ${height} ${rounded} bg-black`}>
            <input type={type} value={value} onChange={(e) => setValue(e)} placeholder={placeholder} className={`${rounded} w-full h-full`} />
        </div>
    )
}
