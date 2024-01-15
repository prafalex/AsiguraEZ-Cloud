import { useNavigate } from 'react-router-dom'

import styles from './AddNewButton.module.sass'

function AddNewButton({ path }) {
    const navigate = useNavigate()

    const redirectToPage = () => navigate(path)

    return (
        <>
            <button className={styles['add-button']} onClick={() => redirectToPage()}>Add New</button>
        </>
    )
}

export default AddNewButton