import { useParams } from 'react-router-dom'
import useInsuredDetailsData from '../hooks/useInsuredDetailsData'

import NavMenu from '../components/NavMenu/NavMenu'
import AppStyles from '../App.module.sass'

function ClientDetails() {
    const { id } = useParams()
    const { insuredDetails } = useInsuredDetailsData(id)
    const isValidId = /^[1-9]\d*$/.test(id)

    return (
        <>
            <NavMenu />
            <div className={AppStyles['page--size']}>
                <>
                    {isValidId ? (
                        <>
                            {Object.values(insuredDetails).length ? (
                                <>
                                    <p>Full Name: {insuredDetails.firstName} {insuredDetails.surname}</p>
                                    <p>Email: {insuredDetails.email}</p>
                                    <p>Phone: {insuredDetails.phone}</p>
                                    <p>Address: {insuredDetails.address}</p>
                                </>
                            ) : <p>We couldn't get the data for this client.</p>}
                        </>
                    ) : <p>Invalid client id. Be sure the client id is bigger than 0 (zero) and not special characters.</p>}
                </>
            </div>
        </>
    )
}

export default ClientDetails