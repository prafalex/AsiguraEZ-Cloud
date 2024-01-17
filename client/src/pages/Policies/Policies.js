import usePolicyData from '../../hooks/policies/usePolicyData'

import NavMenu from '../../components/NavMenu/NavMenu'
import DataTable from '../../components/DataTable/DataTable'

import TableStyles from '../../components/DataTable/DataTable.module.sass'

import AppStyles from '../../App.module.sass'
import AddNewButton from '../../components/AddNewButton/AddNewButton'

function Policies() {
    const { policies } = usePolicyData()

    return (
        <>
            <NavMenu />

            <div className={AppStyles['page--size']}>
                <AddNewButton path={'/policies/add/'} />
                {policies.length ?
					<>
						<div className={`${TableStyles['table--row']} ${TableStyles['table--header']}`}>
							<span className={`${TableStyles['data']} ${TableStyles['data-id']}`}>ID</span>
							<span className={`${TableStyles['data']} ${TableStyles['data-info-1']}`}>Policy No.</span>
							<span className={`${TableStyles['data']} ${TableStyles['data-info-2']}`}>Policy Status</span>
							<span className={`${TableStyles['data']} ${TableStyles['data-actions']}`}>Actions</span>
						</div>
						<div className={TableStyles['custom--table']}>
							{Object.values(policies).map((item) => (
								<DataTable
									id={item.id}
									info_1={item.policy_no}
									info_2={item.status}
									linkTo={'policies'}
									tableType={'innerPages'}
								/>
							))}
						</div>
					</>
                : <p>There is no data available.</p>}
            </div>
        </>
    )
}

export default Policies