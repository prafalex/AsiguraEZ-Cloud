import { useNavigate } from 'react-router-dom'

import useDeleteInsured from '../../hooks/clientDeleteHook'
import styles from './DataTable.module.sass'

function DataTableClients({ item }) {
    const navigate = useNavigate()
    const { deleteUser } = useDeleteInsured()

    const linkToDetails = (user_id) => navigate(`/clients/${user_id}`)
    
    return (
        <div key={item.id} className={styles['table--row']}>
            <span className={`${styles['data']} ${styles['data-id']}`}>{item.id}</span>
            <span className={`${styles['data']} ${styles['data-info-1']}`}>{item.firstName} {item.surname}</span>
            <span className={`${styles['data']} ${styles['data-info-2']}`}>{item.email}</span>
            <span className={`${styles['data']} ${styles['data-actions']}`}>
                <i onClick={() => linkToDetails(item.id)} className={`fa-solid fa-eye ${styles['icon']}`}></i>
                <i className={`fa-solid fa-pen ${styles['icon']}`}></i>
                <i onClick={() => deleteUser(item)} className={`fa-solid fa-trash-can ${styles['icon']}`}></i>
            </span>
        </div>
    )
}

export default DataTableClients