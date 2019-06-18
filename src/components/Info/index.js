import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'

const Info =({name, entries})=> {
  return (
    <div className='ma4 mt0'>
    <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }}>
      <div className="Tilt-inner pa3">
      { ` Hello ${name}`}
      </div>
    </Tilt>
    </div>

  );
}

export default Info;
