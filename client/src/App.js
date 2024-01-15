import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Clients from './pages/Clients'
import ClientDetails from './pages/ClientDetails'
import Claims from './pages/Claims'
import Payments from './pages/Payments'
import Policies from './pages/Policies'
import NotFound from './pages/NotFound'
import AddNewClient from './pages/AddNewClient'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/clients/" element={<Clients />} />
				<Route path="/clients/:id" element={<ClientDetails />} />
				<Route path="/clients/add/" element={<AddNewClient />} />
				<Route path="/claims" element={<Claims />} />
				<Route path="/payments" element={<Payments />} />
				<Route path="/policies" element={<Policies />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App