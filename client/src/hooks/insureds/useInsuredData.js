import { useState, useEffect } from 'react'
import axios from 'axios'

const useInsuredData = () => {
    const [insured, setInsured] = useState({})

    const fetchInsured = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/insured')
            setInsured(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchInsured()
    }, [insured])

    return { insured }
}

export default useInsuredData