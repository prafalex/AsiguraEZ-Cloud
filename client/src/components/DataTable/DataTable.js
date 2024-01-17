import { useNavigate } from 'react-router-dom'

import useDeleteInsured from '../../hooks/insureds/useDeleteInsured'
import useDeletePolicy from '../../hooks/policies/useDeletePolicy'
import styles from './DataTable.module.sass'

function DataTableClients({ id, info_1, info_2, linkTo }) {
    const navigate = useNavigate()
    const { deleteUser } = useDeleteInsured(id)
    const { deletePolicy } = useDeletePolicy(id)

    const linkToDetails = (id) => {
        switch (linkTo) {
            case 'insureds': return navigate(`/insureds/${id}`)
            case 'policies': return navigate(`/policies/${id}`)
            default: return
        }
    }

    const deleteData = (id) => {
        switch(linkTo) {
            case 'insureds': return deleteUser(id)
            case 'policies': return deletePolicy(id)
            default: return
        }
    }
    
    return (
        <div key={id} className={styles['table--row']}>
            <span className={`${styles['data']} ${styles['data-id']}`}>{id}</span>
            <span className={`${styles['data']} ${styles['data-info-1']}`}>{info_1}</span>
            <span className={`${styles['data']} ${styles['data-info-2']}`}>{info_2}</span>
            <span className={`${styles['data']} ${styles['data-actions']}`}>
                <i onClick={() => linkToDetails(id)} className={`fa-solid fa-eye ${styles['icon']}`}></i>
                <i onClick={() => deleteData(id)} className={`fa-solid fa-trash-can ${styles['icon']}`}></i>
            </span>
        </div>
    )
}

export default DataTableClients