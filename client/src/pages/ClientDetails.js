import { useParams } from 'react-router-dom'
import useInsuredDetailsData from '../hooks/clientGetDetailsHook'

import NavMenu from '../components/NavMenu/NavMenu'
import AppStyles from '../App.module.sass'

function ClientDetails() {
    const { id } = useParams()
    const { insuredDetails } = useInsuredDetailsData(id)

    return (
        <>
            <NavMenu />
            <div className={AppStyles['page--size']}>
                <>
                    <p>Client id: {id}</p>
                    {insuredDetails && (
                        <>
                            <p>Full Name: {insuredDetails.firstName} {insuredDetails.surname}</p>
                            <p>Email: {insuredDetails.email}</p>
                            <p>Phone: {insuredDetails.phone}</p>
                            <p>Address: {insuredDetails.address}</p>
                        </>
                    )}
                </>
            </div>
        </>
    )
}

export default ClientDetails
