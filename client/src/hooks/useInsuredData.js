import { useState, useEffect } from 'react'
import axios from 'axios'

const useInsuredData = () => {
    const [insured, setInsured] = useState({})
    const [checkData, setCheckData] = useState('')

    const fetchInsured = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/insured')
            setInsured(response.data)
        } catch (error) {
            setCheckData('Couldn\'t get the data for the clients. Please try again later...')
        }
    }

    useEffect(() => {
        fetchInsured()
    }, [insured])

    return { insured, checkData }
}

export default useInsuredData