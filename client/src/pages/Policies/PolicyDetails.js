import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useUpdatePolicy from '../../hooks/policies/useUpdatePolicy'
import usePolicyDetailsData from '../../hooks/policies/usePolicyDetailsData'

import NavMenu from '../../components/NavMenu/NavMenu'
import AppStyles from '../../App.module.sass'

function PolicyDetails() {
    const [data, setData] = useState({ id: null, insured_id: '', policy_no: '', amount: '', status: '', start_date: '', end_date: '' })
    const [isEditing, setIsEditing] = useState(false)

    const { id } = useParams()
    const { policyDetails } = usePolicyDetailsData(id)
    const { message, updatePolicy } = useUpdatePolicy()

    const isValidId = /^[1-9]\d*$/.test(id)

    const handleInputs = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const editAction = (e) => {
        e.preventDefault()
        setIsEditing(!isEditing)
        setData({
            id: id,
            insured_id: policyDetails.id_insured,
            policy_no: policyDetails.policy_no,
            amount: policyDetails.amount,
            status: policyDetails.status,
            start_date: policyDetails.start_date,
            end_date: policyDetails.end_date
        })
    }

    const updateData = (e) => {
        e.preventDefault()
        editAction(e)
        updatePolicy(data)
    }

    function formatDate(dateString) {
        const date = new Date(dateString)
        const year = date.getFullYear()
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let day = date.getDate().toString().padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    return (
        <>
            <NavMenu />
            <div className={AppStyles['page--size']}>
                <>
                    {isValidId ? (
                        <>
                            <button className={AppStyles['edit-button']} onClick={(e) => editAction(e)}>Edit Policy</button>
                            <form className={AppStyles['data--form']} onSubmit={(e) => updateData(e)}>
                                {Object.values(policyDetails).length ? (
                                    <>
                                        <div className={AppStyles['form-row']}>
                                            {isEditing ? (
                                                <>
                                                    <label>Insured ID:</label>
                                                    <input type='text' name='insured_id' onChange={(e) => handleInputs(e)} value={data.insured_id} className={AppStyles['input']} placeholder='Insured ID' />
                                                </>
                                            ) : <p>Insured ID: {policyDetails.id_insured}</p>}
                                        </div>
                                        <div className={AppStyles['form-row']}>
                                            {isEditing ? (
                                                <>
                                                    <label>Policy No.:</label>
                                                    <input type='text' name='policy_no' onChange={(e) => handleInputs(e)} value={data.policy_no} className={AppStyles['input']} placeholder='Policy Number' />
                                                </>
                                            ) : <p>Policy No.: {policyDetails.policy_no}</p>}
                                        </div>
                                        <div className={AppStyles['form-row']}>
                                            {isEditing ? (
                                                <>
                                                    <label>Amount:</label>
                                                    <input type='text' name='amount' onChange={(e) => handleInputs(e)} value={data.amount} className={AppStyles['input']} placeholder='Amount' />
                                                </>
                                            ) : <p>Amount: {policyDetails.amount}</p>}
                                        </div>
                                        <div className={AppStyles['form-row']}>
                                            {isEditing ? (
                                                <>
                                                    <label>Status:</label>
                                                    <input type='text' name='status' onChange={(e) => handleInputs(e)} value={data.status} className={AppStyles['input']} placeholder='Status' />
                                                </>
                                            ) : <p>Status: {policyDetails.status}</p>}
                                        </div>
                                        <div className={AppStyles['form-row']}>
                                            {isEditing ? (
                                                <>
                                                    <label>Start Date:</label>
                                                    <input type='date' name='start_date' onChange={(e) => handleInputs(e)} value={formatDate(data.start_date)} className={AppStyles['input']} />
                                                </>
                                            ) : <p>Start Date: {formatDate(policyDetails.start_date)}</p>}
                                        </div>
                                        <div className={AppStyles['form-row']}>
                                            {isEditing ? (
                                                <>
                                                    <label>End Date:</label>
                                                    <input type='date' name='end_date' onChange={(e) => handleInputs(e)} value={formatDate(data.end_date)} className={AppStyles['input']} />
                                                </>
                                            ) : <p>End Date: {formatDate(policyDetails.end_date)}</p>}
                                        </div>
                                        {isEditing ? (
                                            <>
                                                <div className={AppStyles['form-row']}>
                                                    <input type='submit' className={AppStyles['save-button']} value='Update Data' />
                                                </div>
                                            </>
                                        ) : ''}

                                        {message.length ? <p>{message}</p> : ''}
                                    </>
                                ) : <p>We couldn't get the data for this client.</p>}
                            </form>
                        </>
                    ) : <p>Invalid client id. Be sure the client id is bigger than 0 (zero) and not special characters.</p>}
                </>
            </div>
        </>
    )
}

export default PolicyDetails