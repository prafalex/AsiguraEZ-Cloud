import { useState } from 'react'
import userInsertInsured from '../../hooks/insureds/useInsertInsured'

import NavMenu from '../../components/NavMenu/NavMenu'
import AppStyles from '../../App.module.sass'

function AddNew() {
    const [data, setData] = useState({ firstname: '', surname: '', email: '', phone: '', address: '' })
    const [message, setMessage] = useState('')
    const { insertInsured } = userInsertInsured()

    const handleInputs = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const sendData = (e) => {
        e.preventDefault()
        insertInsured(data)
        setMessage('The insured was successfully added.')
    }

    return (
        <>
            <NavMenu />

            <div className={AppStyles['page--size']}>
                <h1 className={AppStyles['page--title']}>Add New Insured</h1>

                <form className={AppStyles['data--form']} onSubmit={(e) => sendData(e)}>
                    <div className={AppStyles['form-row']}>
                        <label>First Name:</label>
                        <input type='text' name='firstname' className={AppStyles['input']} onChange={(e) => handleInputs(e)} placeholder='First Name' />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <label>Last Name:</label>
                        <input type='text' name='surname' className={AppStyles['input']} onChange={(e) => handleInputs(e)} placeholder='Last Name' />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <label>Email:</label>
                        <input type='text' name='email' className={AppStyles['input']} onChange={(e) => handleInputs(e)} placeholder='Email Address' />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <label>Phone:</label>
                        <input type='text' name='phone' className={AppStyles['input']} onChange={(e) => handleInputs(e)} placeholder='Phone' />
                    </div>
                    <div className={AppStyles['form-row']}>
                        <label>Address:</label>
                        <textarea type='text' name='address' className={AppStyles['input']} onChange={(e) => handleInputs(e)} placeholder='Address' ></textarea>
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