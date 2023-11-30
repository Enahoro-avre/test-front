import { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
// 
import axios from 'axios';

 function EditInput() {

     const { id } = useParams();
     const navigate = useNavigate()

     const [name, SetName] = useState("");
     const [SelectOption, SetSelectOption] = useState("");
     const [agreed, setAgreed] = useState(false);

     const [ options , setOptions] = useState([])
     const [editedID, setEditedID] = useState("");
    

    useEffect(()=> {
        const getJobs = () => {
          axios
            .get(process.env.REACT_APP_API_URL)
            .then((response) => setOptions(response.data))
            .catch((error) => console.log(error));
        };

        getJobs();
    },[])

    useEffect(()=> {
        
    
        const getUser = ()=> {
            axios.get(`${process.env.REACT_APP_API_URL}/${id}`)
            .then((response)=> {
              console.log(response.data)
              SetName(response.data.name)
              SetSelectOption(response.data.SelectOption)
              setAgreed(response.data.agreed)
              setEditedID(response.data._id)
            });
        }

        getUser()
        
    }, [id])


     const handleSubmit = (e)=> {
            e.preventDefault()

            const data ={
              name , SelectOption , agreed 
            }
            // console.log("NewWdited data" , data)

            axios.put(`${process.env.REACT_APP_API_URL}/${editedID}` , data);
            navigate('/')
     }

 

   return (
    <div className='app'>
     <div>
       <form onSubmit={handleSubmit}>
         <div className="form-control">
           <label htmlFor="name">Your Name</label>
           <input
             type="text"
             id="name"
             onChange={(e) => SetName(e.target.value)}
             defaultValue={name}
             required
           />
         </div>
         <div className="form-select">
           <select
             defaultValue={SelectOption}
             onChange={(e) => SetSelectOption(e.target.value)}
             required
           >
             {options?.map((option) => (
               <option key={option._id} className="option" value={option.label}>
                 {option.value}
               </option>
             ))}
           </select>
         </div>
         <div className="form-checkbox" required>
           <input type="checkbox" onChange={() => setAgreed((prev)=>!prev)} /> Agree to
           terms
         </div>
         <div className="form-actions">
           <button>Submit</button>
         </div>
       </form>
     </div>
     </div>
   );
   }
 export default EditInput;