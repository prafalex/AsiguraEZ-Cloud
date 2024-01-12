import { Link } from 'react-router-dom'
import styles from './NavMenu.module.sass'

function NavMenu() {
    return (
        <>
            <div className={styles['nav--menu']}>
                <Link className={styles['item']} to='/clients'>Clients</Link>
                <Link className={styles['item']} to='/claims'>Claims</Link>
                <Link className={styles['item']} to='/payments'>Payments</Link>
                <Link className={styles['item']} to='/policies'>Policies</Link>
            </div>
        </>
    )
}

export default NavMenu