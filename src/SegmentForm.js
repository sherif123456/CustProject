import './SegmentForm.css';
//import { MDBInput } from "mdbreact";

import {useState} from 'react';
import Button from 'react-bootstrap/Button';

const DEFAULT_VALUE = 'Add schema to segment';

function SegmentForm(props){
    const [segmentName, setSegmentName] = useState('');
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [newSchema, setNewSchema] = useState(DEFAULT_VALUE);
    const [schemas, setSchemas] = useState([
        {label: "First Name", Value: 'first_name'},
        {label: "Last Name", Value: 'last_name'},
        {label: "Gender", Value: 'gender'},
        {label: "Age", Value: 'age'},
        {label: "Account Name", Value: 'account_name'},
        {label: "City", Value: 'city'},
        {label: "State", Value: 'state'}
    ]);

   // const [first_name] = [{label: "Jhon", Value: 'Jhon'}]

//    if(item.value == "first_name"){
//     const [frtname, setSchemas] = useState([
//         {label: "Last Name", Value: 'last_name'},
//         {label: "Gender", Value: 'gender'},
       
//     ]);
//    }
 
const handlsubmit = (e) =>{
    e.preventDefault();
    const jsn = { segmentName, }
}


    const addNewSchema = function(){
        if (newSchema===DEFAULT_VALUE) return;
        setSelectedSchemas([...selectedSchemas, ...schemas.filter(item => item.Value===newSchema)]);
        setSchemas([...schemas.filter(item => item.Value!==newSchema)]);
        setNewSchema(DEFAULT_VALUE);
    };
    const changeSelectedSchema = function(idx, newValue) {
        const newSchema = schemas.filter(item => item.Value===newValue);
        const schemaRemoved = selectedSchemas.slice(idx, idx+1);
        setSelectedSchemas([...selectedSchemas.slice(0,idx), ...newSchema, ...selectedSchemas.slice(idx+1)]);
        setSchemas([...schemas.filter(item => item.Value!==newValue), ...schemaRemoved])
    };
    return (
        <div>
            <form className='form-group'>
                <div className='align'>
            <label>Enter the Name of the Segment</label>
            <div>
        <input value={segmentName} onChange={(event) => setSegmentName(event.target.value)} placeholder="Name of the Segment" ></input>
            </div>
            </div>
            <div>To save your segment, you need to add the schemas to build the query</div>
            </form>
            {Object.keys(selectedSchemas).length>0 && 
                <div className="segment-list">
                    {selectedSchemas.map((item, idx) => {
                        return (
                            <div>
                                <form className='form-group'>
                                <select className='sel' key={idx}  onChange={(event) => changeSelectedSchema(idx, event.target.value)}>
                                    <option key={99} >{item.label}</option>
                                    {schemas.filter(item => !selectedSchemas.includes(item.Value)).map((item, idx) => (<option key={idx} value={item.Value}>{item.label}</option>))}
                                </select>
                                
                                </form>
                            </div>
                        )
                    })}
                </div>
            }
            <div>
            
                <select value={newSchema} onChange={(event) => setNewSchema(event.target.value)}>
                    <option key={99} value={DEFAULT_VALUE} disabled hidden>{DEFAULT_VALUE}</option>
                    {schemas.filter(item => !selectedSchemas.includes(item.Value)).map((item, idx) => (<option key={idx} value={item.Value}>{item.label}</option>))}
                </select>
                <div>
                <Button variant="link" className="link" onClick={() => addNewSchema()}>+ Add new schema</Button>
                </div>
            </div>
        </div>
    );
}

export default SegmentForm;