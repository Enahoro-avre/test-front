import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function Row({name , SelectOption , agreed , _id}) {

    
    const deleteUser = (_id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/${_id}`)
        console.log(_id)
    }
    

    // console.log("Table users" , users)
    return (
      <div>
        <tr>
          <td>{name}</td>
          <td>{SelectOption}</td>
          <td>{agreed.toString()}</td>
          <div>
            <td>
                <Link to={`/edit/${_id}`}>
                  <button>Edit</button>
                </Link>
              
            </td>
            <td>
              <button onClick={() => deleteUser(_id)}>Delete</button>
            </td>
          </div>
        </tr>
      </div>
    );
}






// {users?.map(({ _id , name, SelectOption, agreed }) => (
//   <tr>
//     <td>{name}</td>
//     <td>{SelectOption}</td>
//     <td>{agreed}</td>
//     <div>
//         <td>
//             {/* <Link></Link> */}
//         </td>
//       <td>
//         <button onClick={()=> deleteUser(_id)}>Delete</button>
//       </td>
//     </div>
//   </tr>
// ))} 

// 