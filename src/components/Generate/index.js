import React from 'react';

const Generate =({plates})=> {
  //console.log(plates)
  return (
    <div className='center ma'>
      <div className="white f3"> You just generated :</div>
    <br/>
      <div>
        {
          plates.map((plate,i) => (
            <div key={i} className="white f3" style ={{margin:'20px',background:'blue'}}> {plate} </div>       
          ))
        }  
    </div>
    </div>
  );
}

export default Generate;
