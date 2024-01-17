import { useState, useEffect } from 'react'
import axios from 'axios'

const useInsuredDetailsData = (user_id) => {
    const [insuredDetails, setInsuredDetails] = useState({})
    const [checkData, setCheckData] = useState('')

    const fetchInsuredDetails = async () => {
        try {
            const response = await axios.get(`http://104.199.60.93/insured/${user_id}`)
            setInsuredDetails(response.data)
        } catch (error) {
            setCheckData('Couldn\'t get the data for this client. Please try again later...')
        }
    }

    useEffect(() => {
        fetchInsuredDetails(insuredDetails)
    }, [user_id])

    return { insuredDetails, checkData, fetchInsuredDetails }
}

export default useInsuredDetailsData