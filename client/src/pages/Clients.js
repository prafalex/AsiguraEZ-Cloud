import { useState, useEffect } from 'react'
import axios from 'axios'

import NavMenu from '../components/NavMenu/NavMenu'
import DataTableClients from '../components/DataTableClients/DataTableClients'

import AppStyles from '../App.module.sass'

function Clients() {
    const [insured, setInsured] = useState({})

	const fetchInsured = async () => {
		await axios.get('http://127.0.0.1:5000/insured')
			.then((res) => {
				setInsured(res.data)
			})
	}

	useEffect(() => {
		fetchInsured()
	}, [insured])

    return (
        <>
            <NavMenu />
            
            <div className={AppStyles['page--size']}>
                {Object.values(insured).map((item) => (
                    <DataTableClients item={item} />
                ))}
            </div>
        </>
    )
}

export default Clients