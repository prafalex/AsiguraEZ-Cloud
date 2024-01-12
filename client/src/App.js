import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import styles from './App.module.sass'

import Home from './pages/Home'
import Clients from './pages/Clients'
import Claims from './pages/Claims'
import Payments from './pages/Payments'
import Policies from './pages/Policies'
import NotFound from './pages/NotFound'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/clients' element={<Clients />} />
					<Route exact path='/claims' element={<Claims />} />
					<Route exact path='/payments' element={<Payments />} />
					<Route exact path='/policies' element={<Policies />} />
					<Route exact path='/*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App