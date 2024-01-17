import { useState, useEffect } from 'react'
import axios from 'axios'

const usePolicyDetailsData = (policy_id) => {
    const [policyDetails, setPolicyDetails] = useState({})
    const [checkData, setCheckData] = useState('')

    const fetchPolicyDetails = async () => {
        try {
            const response = await axios.get(`http://35.205.173.191:81/policy/${policy_id}`)
            setPolicyDetails(response.data)
        } catch (error) {
            setCheckData('Couldn\'t get the data for this policy. Please try again later...')
        }
    }

    useEffect(() => {
        fetchPolicyDetails(policyDetails)
    }, [policy_id])

    return { policyDetails, checkData, fetchPolicyDetails }
}

export default usePolicyDetailsData