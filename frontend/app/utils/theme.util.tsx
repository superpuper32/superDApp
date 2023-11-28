import { useState, useEffect } from "react"

export default function SetTheme() {
    
    const [theme, setTheme] = useState<string>()

    const toggleTheme = () => {
        if ( theme == 'light') {
            setTheme('dark')
        } else if ( theme == 'dark' ) {
            setTheme('light')
        }
    }
    
    return (
        <>
            <button key="themeToggle" onClick={toggleTheme} >
                Change Theme
            </button>
        </>
    )
}