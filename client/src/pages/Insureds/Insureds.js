import useInsuredData from '../../hooks/insureds/useInsuredData'

import NavMenu from '../../components/NavMenu/NavMenu'
import DataTable from '../../components/DataTable/DataTable'

import TableClientsStyles from '../../components/DataTable/DataTable.module.sass'
import AppStyles from '../../App.module.sass'
import AddNewButton from '../../components/AddNewButton/AddNewButton'

function Clients() {
    const { insured } = useInsuredData()

    return (
        <>
            <NavMenu />

            <div className={AppStyles['page--size']}>
                <AddNewButton path={'/insureds/add/'} />
                {insured.length ?
                    <div className={TableClientsStyles['custom--table']}>
                        {Object.values(insured).map((item) => (
                            <DataTable
                                id={item.id}
                                info_1={item.firstName + ' ' + item.surname}
                                info_2={item.email}
                                linkTo={'insureds'}
                            />
                        ))}
                    </div>
                : <p>There is no data available.</p>}
            </div>
        </>
    )
}

export default Clients