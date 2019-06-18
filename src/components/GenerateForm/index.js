import React, {Component} from 'react';
import './ImageLinkForm.css'
import { Form } from 'react-bootstrap';

class GenerateForm extends Component {

  constructor(props){
    super (props);
    this.state = {
      lga:'BRASS',
      noOfPlates:''
    }
  }

  onLgaChange =(event)=> {
    this.setState({lga: event.target.value})
  }
//no of plates
  onPlateChange =(event)=> {
    this.setState({noOfPlates: event.target.value})
  }

  onGeneratePlate =(event)=> {
    event.preventDefault();
    var noOfPlates = this.state.noOfPlates;
    var lga = this.state.lga;
    this.setState({noOfPlates:''});
    this.props.onSubmit(noOfPlates,lga);
  }

  render(){

    return (

      <div>
  
        <div className='white f2' >
          {'State: Bayelsa'}
         </div> <br/>
         <div className='white f2 center' style = {{color:'white',maxWidth: '300px'}}>
         <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select LGA</Form.Label>
          <Form.Control as="select" onChange={this.onLgaChange} >
            <option value="BRASS">BRASS</option>
            <option value="SAGBAMA">SAGBAMA</option>
            <option value="EKEREMOR">EKEREMOR</option>
            <option value="YENAGOA">YENAGOA</option>
            <option value="KOLOKUMA">KOLOKUMA</option>
            <option value="NEMBE">NEMBE</option>
            <option value="OGBIA">OGBIA</option>
            <option value="SOUTHERNIJAW">SOUTHERN IJAW</option>
          </Form.Control>
        </Form.Group>
        
        </div>
          <br/>
         
         <div className='white f3'>
         {'Number of plates to generate:'}
         </div>
         <br/>
         <div className='center '>
         <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' value={this.state.noOfPlates} onChange={this.onPlateChange} type='text' />
          <button onClick={this.onGeneratePlate}className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'> Generate Plates </button>
         
         </div>
         </div>
         <br/>
  
      </div>
       );
  }

}

export default GenerateForm;


  
