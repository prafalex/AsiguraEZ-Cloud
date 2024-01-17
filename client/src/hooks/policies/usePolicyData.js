import { useState, useEffect } from 'react'
import axios from 'axios'

const usePolicyData = () => {
    const [policies, setPolicies] = useState({})

    const fetchPolicy = async () => {
        try {
            const response = await axios.get('http://35.205.173.191:81/policy')
            setPolicies(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchPolicy()
    }, [policies])

    return { policies }
}

export default usePolicyData