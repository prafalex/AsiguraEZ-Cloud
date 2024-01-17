import { useState } from 'react'
import axios from 'axios'

const useUpdatePolicy = () => {
    const [message, setMessage] = useState('')

    const updatePolicy = async (data) => {
        try {
            const dataToServer = {
                id_insured: data.insured_id,
                policy_no: data.policy_no,
                start_date: data.start_date,
                end_date: data.end_date,
                amount: data.amount,
                status: data.status  
            }

            await axios.put(`http://35.205.173.191:81/policy/${data.id}`, dataToServer)
            .then((res) => setMessage(res.data.message))
            .catch((err) => setMessage(err.response.data.message))
            .then(() => {
                window.location.href = '/policies/'
            })
        } catch (err) {
            console.error(err)
        }
    }

    return { message, updatePolicy }
}

export default useUpdatePolicy