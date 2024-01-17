import axios from 'axios'

const useDeletePolicy = (id) => {
    const deletePolicy = async () => {
        try {
            const policyConfirmed = window.confirm(`Are you sure you want to delete this policy?`)
            if (policyConfirmed) {
                const res = await axios.delete(`http://35.205.173.191:81/policy/${id}`)
                alert(res.data.message)
            } else alert('You\'ve revoked the action to delete the policy.')
        } catch (err) {
            console.error('Error deleting policy: ', err)
        }
    }

    return { deletePolicy }
}

export default useDeletePolicy