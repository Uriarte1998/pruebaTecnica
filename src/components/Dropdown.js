import React, { Component } from 'react';
import Popover from 'react-bootstrap/Popover';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl'
import Overlay from 'react-bootstrap/Overlay'
import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
let objRefres={};
let y={data:{results:{}}};
let y2=[];
class Dropdown1 extends Component{
  constructor(props){
    super(props);
    this.refCont = React.createRef();
    this.refForm = React.createRef();
    this.refDrop = React.createRef();
    this.state = {
      v : [],
      v_coincidencia:[{dd:"d"},{dd:"ddd"}],
      pop_up:false,
      campoTexto:'',
      categoria: 'reference_name',
      obj_consulta: {"filter":{
        "filters":[
          {"field":"reference_name","operator":"contains","ignoreCase":true,"value":""}
        ],
        "logic":"or"},
        "skip":0,
        "take":42
      }
    }

  }

  async componentDidMount(){
     y = await axios.get('/v1/sales/customer/?simple=true',{
      headers: {
        'APIKEY': 'Kf7ercw9Xp7v4KrqeteQv04C2oUsEm4YTyqVpjVS',
        'Data-Operations':JSON.stringify(this.state.obj_consulta)
      }
    });
    await this.setState({v : y.data.results})
    y2 = y.data.results;
  }
  async componentDidUpdate(){
     y = await axios.get('/v1/sales/customer/?simple=true',{
      headers: {
        'APIKEY': 'Kf7ercw9Xp7v4KrqeteQv04C2oUsEm4YTyqVpjVS',
        'Data-Operations':JSON.stringify(this.state.obj_consulta)
      }
    });
    y2 = y.data.results;
  }
  agregarObj(event){
    objRefres = Object.assign({"field":event.target.value}, {"operator":"contains"}, {"ignoreCase":true})
  }
  render(){
    return(
<>
      <Overlay
        show={this.state.pop_up}
        placement={'left'}
        target= {this.refCont}
        containerPadding={1}>
        <Popover id="popover-contained">
          <Popover.Header as="h3">Pop-Up</Popover.Header>
          <Popover.Body>
            <div className="radio" onChange={this.agregarObj}>
              <input type="radio" value="name" name="gender" defaultChecked={true}/> Empresa <br/>
              <input type="radio" value="contact_name" name="gender" /> Persona de Contacto <br/>
              <input type="radio" value="contact_phone" name="gender" /> Teléfono <br/>
              <input type="radio" value="nit" name="gender" /> NIT <br/>
              <input type="radio" value="country" name="gender" /> País <br/>
            </div>
            </Popover.Body>
        </Popover>
      </Overlay>
      <br/><br/><br/>
      <Dropdown >
        <Dropdown.Toggle ref = {this.refCont} variant="success" id="dropdown-basic">
          <FormControl  ref = {this.refForm}
            className="mx-3 my-2 w-auto"
            onChange={(e) => {
              objRefres = Object.assign(objRefres, {"value": this.refForm.current.value})
              this.setState({
                obj_consulta:{
                    filter:{
                      filters:[objRefres],
                    "logic":"or"},
                    "skip":0,
                    "take":42
                }
              })
            }}
            placeholder="Ingrese texto"
            />

          DROPDOWN

        </Dropdown.Toggle>

        <Dropdown.Menu  ref = {this.refDrop}
        style= {{overflowY: 'scroll', maxHeight: 640, minHeight: 20}}>
          <Dropdown.Item onClick={()=>this.setState({pop_up: !this.state.pop_up})} > OPCION FIJA </Dropdown.Item>
          {
            y2.map((item)=>(
              <Dropdown.Item key={item.name}> {item.name} -- {item.contact_name} --{item.country} -- {item.nit} -- {item.contact_phone} </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
</>

    )
  };
}
export default Dropdown1;
