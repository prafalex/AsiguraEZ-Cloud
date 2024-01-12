import styles from './DataTableClients.module.sass'

function DataTableClients({ item }) {
    return (
        <div key={item.id} className={styles['table--row']}>
            <span className={styles['data']}>{item.username}</span>
            <span className={styles['data']}>{item.email}</span>
            <span className={styles['data']}>{item.address}</span>
        </div>
    )
}

export default DataTableClients