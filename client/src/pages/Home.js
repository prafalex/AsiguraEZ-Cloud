import useInsuredData from '../hooks/insureds/useInsuredData'
import usePolicyData from '../hooks/policies/usePolicyData'

import NavMenu from '../components/NavMenu/NavMenu'
import DataTable from '../components/DataTable/DataTable'

import TableStyles from '../components/DataTable/DataTable.module.sass'
import AppStyles from '../App.module.sass'

function Home() {
    const { insured } = useInsuredData()
    const { policies } = usePolicyData()

    return (
        <>
            <NavMenu />

            <div className={AppStyles['page--size']}>
                {insured.length ?
                    <div>
                        <h1 className={AppStyles['page--title']}>Insureds</h1>
                        <div className={`${TableStyles['table--row']} ${TableStyles['table--header']}`}>
                            <span className={`${TableStyles['data']} ${TableStyles['data-id']}`}>ID</span>
                            <span className={`${TableStyles['data']} ${TableStyles['data-info-1']}`}>Client Name</span>
                            <span className={`${TableStyles['data']} ${TableStyles['data-info-2']}`}>Client Email</span>
                        </div>
                        <div className={`${TableStyles['custom--table']} ${TableStyles['table-margin--bottom']}`}>
                            {Object.values(insured).map((item) => (
                                <DataTable
                                    id={item.id}
                                    info_1={item.firstName + ' ' + item.surname}
                                    info_2={item.email}
                                    linkTo={'insureds'}
                                    tableType={'homePage'}
                                />
                            ))}
                        </div>
                    </div>
                : <p>There is no data available.</p>}

                {policies.length ?
					<>
                        <h1 className={AppStyles['page--title']}>Policies</h1>
						<div className={`${TableStyles['table--row']} ${TableStyles['table--header']}`}>
							<span className={`${TableStyles['data']} ${TableStyles['data-id']}`}>ID</span>
							<span className={`${TableStyles['data']} ${TableStyles['data-info-1']}`}>Policy No.</span>
							<span className={`${TableStyles['data']} ${TableStyles['data-info-2']}`}>Policy Status</span>
						</div>
						<div className={TableStyles['custom--table']}>
							{Object.values(policies).map((item) => (
								<DataTable
									id={item.id}
									info_1={item.policy_no}
									info_2={item.status}
									linkTo={'policies'}
									tableType={'homePage'}
								/>
							))}
						</div>
					</>
                : <p>There is no data available.</p>}
            </div>
        </>
    )
}

export default Home