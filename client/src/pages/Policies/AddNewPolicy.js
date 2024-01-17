import { useState } from 'react'
import useInsertPolicy from '../../hooks/policies/useInsertPolicy'

import NavMenu from '../../components/NavMenu/NavMenu'
import AppStyles from '../../App.module.sass'

function AddNew() {
    const [data, setData] = useState({ insured_id: '', policy_no: '', amount: '', status: '', start_date: '', end_date: '' })
    const { message, insertPolicy } = useInsertPolicy()

    const handleInputs = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const sendData = (e) => {
        e.preventDefault()
        insertPolicy(data)
    }

    return (
        <>
            <NavMenu />

            <div className={AppStyles['page--size']}>
                <h1 className={AppStyles['page--title']}>Add New Policy</h1>

                <form className={AppStyles['data--form']} onSubmit={(e) => sendData(e)}>
                    <div className={AppStyles['form-row']}>
                        <label>Insured ID:</label>
                        <input type='text' name='insured_id' className={AppStyles['input']} onChange={(e) => handleInputs(e)} placeholder='Insured ID' />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <label>Policy Number:</label>
                        <input type='text' name='policy_no' className={AppStyles['input']} onChange={(e) => handleInputs(e)} placeholder='Policy Number' />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <label>Amount:</label>
                        <input type='text' name='amount' className={AppStyles['input']} onChange={(e) => handleInputs(e)} placeholder='Amount' />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <label>Status:</label>
                        <input type='text' name='status' className={AppStyles['input']} onChange={(e) => handleInputs(e)} placeholder='Status' />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <label>Start Date:</label>
                        <input type='date' name='start_date' className={AppStyles['input']} onChange={(e) => handleInputs(e)} />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <label>End Date:</label>
                        <input type='date' name='end_date' className={AppStyles['input']} onChange={(e) => handleInputs(e)} />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <input type='submit' className={AppStyles['save-button']} value='Save Data' />    
                    </div>

                    {message.length ? <p>{message}</p> : ''}
                </form>
            </div>
        </>
    )
}

export default AddNew