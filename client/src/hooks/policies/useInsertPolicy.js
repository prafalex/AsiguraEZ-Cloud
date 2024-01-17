import { useState } from 'react'
import axios from 'axios'

const useInsertPolicy = () => {
    const [message, setMessage] = useState('')

    const insertPolicy = async (data) => {
        try {
            const dataToServer = {
                id_insured: data.insured_id,
                policy_no: data.policy_no,
                start_date: data.start_date,
                end_date: data.end_date,
                amount: data.amount,
                status: data.status   
            }

            await axios.post('http://35.205.173.191:81/policy', dataToServer)
            .then((res) => setMessage(res.data.message))
            .catch((err) => setMessage(err.response.data.message))
        } catch (err) {
            console.error(err)
        }
    }

    return { message, insertPolicy }
}

export default useInsertPolicy