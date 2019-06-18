import React, { Component } from 'react';
import Navigation from './components/Navigation'
import GenerateForm from './components/GenerateForm'
import Info from './components/Info'
import Generate from './components/Generate'
import AllPlates from './components/AllPlates'
import ShowAllPlates from './components/ShowAllPlates'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Particles from 'react-particles-js'
import './App.css';

const particlesOptions = {
  particles: {
    number:{
      value:70,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

class App extends Component {
  constructor (){
    super ();
    this.state = {
      plates: [],
      allPlates: [],
      show: false,
      showPlates: false,
      route:'signin',
      signedIn:false,
      user: {
        id: '',
        name: '',
        email: '',
        password:'',
        joined: ''
      },

      lga: '',
      lgalast: '',
      startlet: '',
      startletcount: '',
      cnum: '',
      lastletter: ''

    }
  }

  loadUser =(data)=> {
    this.setState ({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined,
      },
      plates: data.plates
    })
  }

  componentDidMount() {
    fetch('http://localhost:3001')
    .then(response => response.json())
      .then(console.log)
  }

 generatePlate =(number, lgaI, startLet = 0, cNum = 0, lgaLast = 0, startLetCount = 0, lastLetter = 0)=>{
    number = parseInt(number);
    startLet  = parseInt( startLet);
    cNum  = parseInt( cNum);
    lgaLast  = parseInt(lgaLast );
    startLetCount  = parseInt(startLetCount);
    lastLetter  = parseInt(lastLetter );

    let count = 0;
    const init = ['AA','BB','CC','DD','EE','FF','GG','HH','II','JJ','KK','LL','MM','NN','OO','PP','QQ','RR','SS','TT','UU','VV','WW','XX','YY','ZZ'];
    const lga = {'BRASS':'BRS','SAGBAMA':'SAG','YENAGOA':'YEN','EKEREMOR':'EKR','KOLOKUMA':'KOL','NEMBE':'NEM','OGBIA':'OGB','SOUTHERNIJAW':'SIJ'};

    count += lgaLast;
    if (cNum === 0) cNum = 1;
    number += lgaLast;

    const plates = [];
    let zero = 0
  
    while (count < number) {

      if (cNum === 1000) cNum = 1;
    
      let cN = cNum.toString();

      switch(cN.length) {
        case 1: plates.push(`${init[startLet]}${zero}${zero}${cNum}${lga[lgaI]}`);
                break;
        case 2: plates.push(`${init[startLet]}${zero}${cNum}${lga[lgaI]}`);
                break;
        case 3: plates.push(`${init[startLet]}${cNum}${lga[lgaI]}`);
                break;
        default: console.log('invalid number');
                 break;
      }

      startLetCount ++;
      count ++;
      cNum ++;

      switch(startLetCount) {
          // change 5 to 999
          case 999: startLet += 1;
                    startLetCount = 0;
                    cNum = 1;
                    break;
          default: break;
      }
    }

    lgaLast += cNum; 
    lastLetter = startLet;
    let l = lgaI.toLowerCase();

    this.setState ({
      lga: l,
      startLet: startLet,
      cNum: cNum, 
      lgaLast: lgaLast, 
      startLetCount: startLetCount,
      lastLetter: lastLetter
    })

    fetch('http://localhost:3001/lga', {
          method: 'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            //set to state to work
            lga: this.state.lga,
            lgalast: this.state.lgaLast,
            startlet: this.state.startLet,
            startletcount: this.state.startLetCount,
            cnum: cNum,
            lastletter: this.state.lastLetter
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log( data)
        })
        .catch(err => console.log(err, 'oopps cannot save history'));
       
    return [plates, startLet, cNum, lgaLast, startLetCount, lastLetter];
}

  displayPlates = (plates) => {
    // console.log('showing',plates)
    this.setState({plates:plates});
  }

  onAllPlates = () => {
      //console.log('showing ALL')
      fetch('http://localhost:3001/allPlates', {
      method: 'get',
      headers:{'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
      // console.log('here',data[0])
      if (this.state.show) this.setState({show:false,showPlates:false}) 
      else this.setState({allPlates:data, show:true,showPlates:false})
      
    })
    .catch(err => console.log(err, 'oopps can not get all plates'));
    }

  onSubmit =(noOfPlates,lga)=> {
    this.setState({ showPlates:true, show:false});
    fetch('http://localhost:3001/lgaVar', {
          method: 'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            lga: lga
          })
        })
        .then(response => response.json())
        .then(data => {
        // console.log('i dey',data)

        let startLet = data.startlet;
        let  cNum = data.cnum;
        let lgaLast = data.lgalast;
        let startLetCount = data.startletcount ;
        let lastLetter = data.lastletter;

        const plates =  this.generatePlate(noOfPlates,lga, startLet, cNum, lgaLast, startLetCount, lastLetter);
        
        fetch('http://localhost:3001/plates', {
          method: 'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.name,
            plates: plates[0]
          })
        })
        .then(response => response.json())
        .then(data => {
          this.displayPlates(data.plates)
        })
        })
        .catch(err => console.log(err, 'oopps no values'));

  }

  onRouteChange =(route)=> {
    this.setState({route:route, show:false, showPlates:false})
    if (route === 'home') this.setState({signedIn:true})
   else if (route === 'signin' || route === 'register' ) this.setState({signedIn:false})
  }

  render() {
    return (
      <div className="App">
          <Particles
            className="particles"
            params={particlesOptions}
            />
          <Navigation signedIn = {this.state.signedIn} onRouteChange = {this.onRouteChange}/>
          {
            this.state.route === 'home' ?

            <div>
              <Info name={this.state.user.name}/>
              <GenerateForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              {  this.state.plates && this.state.showPlates ? <Generate plates={this.state.plates} />
                :
                ''
              }
              <AllPlates onAllPlates={this.onAllPlates} />
              {  this.state.show ?  <ShowAllPlates plates={this.state.allPlates}/>
                :
                ''
              }
             
            </div>
               :

               (
                   this.state.route === 'signin' ?
                   <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
                   :
                   <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
               )

          }

      </div>
    );
  }
}

export default App;
