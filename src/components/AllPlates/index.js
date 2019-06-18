import React from 'react'

const AllPlates =({onAllPlates})=> {
    return (
        <button onClick={onAllPlates}className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'> Display All Plates </button>
    )
}

export default AllPlates