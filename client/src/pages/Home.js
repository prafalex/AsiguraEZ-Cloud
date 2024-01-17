import useInsuredData from '../hooks/insureds/useInsuredData'

import NavMenu from '../components/NavMenu/NavMenu'
import DataTable from '../components/DataTable/DataTable'

import TableClientsStyles from '../components/DataTable/DataTable.module.sass'
import AppStyles from '../App.module.sass'

function Home() {
    const { insured } = useInsuredData()

    return (
        <>
            <NavMenu />

            <div className={AppStyles['page--size']}>
                <div className={AppStyles['tables-grid']}>
                    {insured.length ?
                        <div>
                            <h1 className={AppStyles['page--title']}>Insureds</h1>
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
                        </div>
                    : <p>There is no data available.</p>}
                </div>
            </div>
        </>
    )
}

export default Home