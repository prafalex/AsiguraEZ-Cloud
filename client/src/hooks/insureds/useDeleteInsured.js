import axios from 'axios'

const useDeleteInsured = (id) => {
    const deleteUser = async () => {
        try {
            const userConfirmed = window.confirm(`Are you sure you want to delete this client?`)
            if (userConfirmed) {
                const res = await axios.delete(`http://104.199.60.93/insured/${id}`)
                alert(res.data.message)
            } else alert('You\'ve revoked the action to delete the user.')
        } catch (err) {
            console.error('Error deleting user: ', err)
        }
    }

    return { deleteUser }
}

export default useDeleteInsured