import useInsuredData from '../hooks/useInsuredData'

import NavMenu from '../components/NavMenu/NavMenu'
import DataTable from '../components/DataTable/DataTable'

import TableClientsStyles from '../components/DataTable/DataTable.module.sass'
import AppStyles from '../App.module.sass'

function Clients() {
    const { insured, checkData } = useInsuredData()

    return (
        <>
            <NavMenu />

            <div className={AppStyles['page--size']}>
                {!checkData.length ?
                    <>
                        {insured.length ?
                            <div className={TableClientsStyles['custom--table']}>
                                {Object.values(insured).map((item) => (
                                    <DataTable item={item} />
                                ))}
                            </div>
                        : <p>There is no data available.</p>}
                    </>
                : <p>{checkData}</p>}
            </div>
        </>
    )
}

export default Clients