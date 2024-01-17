import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Insureds from './pages/Insureds/Insureds'
import InsuredDetails from './pages/Insureds/InsuredDetails'
import Policies from './pages/Policies/Policies'
import PolicyDetails from './pages/Policies/PolicyDetails'
import NotFound from './pages/NotFound'
import AddNewInsured from './pages/Insureds/AddNewInsured'
import AddNewPolicy from './pages/Policies/AddNewPolicy'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/insureds/" element={<Insureds />} />
				<Route path="/insureds/:id" element={<InsuredDetails />} />
				<Route path="/insureds/add/" element={<AddNewInsured />} />
				<Route path="/policies" element={<Policies />} />
				<Route path="/policies/:id" element={<PolicyDetails />} />
				<Route path="/policies/add" element={<AddNewPolicy />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App