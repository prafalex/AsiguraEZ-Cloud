import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useUpdateInsured from '../../hooks/insureds/useUpdateInsured'
import useInsuredDetailsData from '../../hooks/insureds/useInsuredDetailsData'

import NavMenu from '../../components/NavMenu/NavMenu'
import AppStyles from '../../App.module.sass'
import usePolicyData from '../../hooks/policies/usePolicyData'

function InsuredDetails() {
    const [data, setData] = useState({ id: null, firstname: '', surname: '', email: '', phone: '', address: '' })
    const [message, setMessage] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const { id } = useParams()
    const { insuredDetails } = useInsuredDetailsData(id)
    const { updateInsured } = useUpdateInsured()
    const { policies } = usePolicyData()

    const isValidId = /^[1-9]\d*$/.test(id)

    const clientPolicies = Object.values(policies).length && policies.filter((policy) => policy.id_insured === insuredDetails.id)

    function formatDate(dateString) {
        const date = new Date(dateString)
        const year = date.getFullYear()
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let day = date.getDate().toString().padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    const handleInputs = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const editAction = (e) => {
        e.preventDefault()
        setIsEditing(!isEditing)
        setData({
            id: id,
            firstname: insuredDetails.firstName,
            surname: insuredDetails.surname,
            email: insuredDetails.email,
            phone: insuredDetails.phone,
            address: insuredDetails.address
        })
    }

    const updateData = (e) => {
        e.preventDefault()
        editAction(e)
        updateInsured(data)
        setMessage('The client was successfully updated.')
    }

    return (
        <>
            <NavMenu />
            <div className={AppStyles['page--size']}>
                <>
                    {isValidId ? (
                        <>
                            <button className={AppStyles['edit-button']} onClick={(e) => editAction(e)}>Edit Insured</button>
                            <form className={AppStyles['data--form']} onSubmit={(e) => updateData(e)}>
                                {Object.values(insuredDetails).length ? (
                                    <>
                                        {isEditing ? (
                                            <>
                                                <div className={AppStyles['form-row']}>
                                                    <label>First Name:</label>
                                                    <input type='text' name='firstname' onChange={(e) => handleInputs(e)} value={data.firstname} className={AppStyles['input']} placeholder='First Name' />
                                                </div>
                                                <div className={AppStyles['form-row']}>
                                                    <label>Last Name:</label>
                                                    <input type='text' name='surname' onChange={(e) => handleInputs(e)} value={data.surname} className={AppStyles['input']} placeholder='Last Name' />
                                                </div>
                                            </>
                                        ) : <p>Full Name: {insuredDetails.firstName} {insuredDetails.surname}</p>}
                                        <div className={AppStyles['form-row']}>
                                            {isEditing ? (
                                                <>
                                                    <label>Email:</label>
                                                    <input type='text' name='email' onChange={(e) => handleInputs(e)} value={data.email} className={AppStyles['input']} placeholder='Email Address' />
                                                </>
                                            ) : <p>Email: {insuredDetails.email}</p>}
                                        </div>
                                        <div className={AppStyles['form-row']}>
                                            {isEditing ? (
                                                <>
                                                    <label>Phone:</label>
                                                    <input type='text' name='phone' onChange={(e) => handleInputs(e)} value={data.phone} className={AppStyles['input']} placeholder='Phone' />
                                                </>
                                            ) : <p>Phone: {insuredDetails.phone}</p>}
                                        </div>
                                        <div className={AppStyles['form-row']}>
                                            {isEditing ? (
                                                <>
                                                    <label>Address:</label>
                                                    <input type='text' name='address' onChange={(e) => handleInputs(e)} value={data.address} className={AppStyles['input']} placeholder='Address' />
                                                </>
                                            ) : <p>Address: {insuredDetails.address}</p>}
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

                            {Object.values(clientPolicies).length ? (
                                <div className={AppStyles['policy--table']}>
                                    <div className={AppStyles['policy-details--header']}>
                                        <span className={AppStyles['row--type']}>Policy Number</span>
                                        <span className={AppStyles['row--type']}>Policy Amount</span>
                                        <span className={AppStyles['row--type']}>Policy Status</span>
                                        <span className={AppStyles['row--type']}>Policy Start Date</span>
                                        <span className={AppStyles['row--type']}>Policy End Date</span>
                                    </div>
                                    {clientPolicies.map((item) => (
                                        <>
                                            <div className={AppStyles['policy-details--row']}>
                                                <span className={AppStyles['row--info']}>{item.policy_no}</span>
                                                <span className={AppStyles['row--info']}>{item.amount}</span>
                                                <span className={AppStyles['row--info']}>{item.status}</span>
                                                <span className={AppStyles['row--info']}>{formatDate(item.start_date)}</span>
                                                <span className={AppStyles['row--info']}>{formatDate(item.end_date)}</span>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            ) : <p className={AppStyles['no-policy-found']}>No policies data found for this insured.</p>}
                        </>
                    ) : <p>Invalid client id. Be sure the client id is bigger than 0 (zero) and not special characters.</p>}
                </>
            </div>
        </>
    )
}

export default InsuredDetails