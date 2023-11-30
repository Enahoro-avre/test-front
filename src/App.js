import { useEffect, useState } from 'react';
import axios from "axios";
import SimpleInput from './components/SimpleInput';



function App() {

  const [ jobList , setJobList] = useState([])

  // const baseURL = process.env.REACT_APP_API_URL
  useEffect(()=>{
    const getJobs = ()=> {
      axios.get(process.env.REACT_APP_API_URL)
      .then(response=> setJobList(response.data))
      .catch(error => console.log(error))
    }

    getJobs()
  
  } , [])


  // console.log(jobList)

  return (

    <div className="app">
      <SimpleInput options={jobList} />
    </div>


  );
}


// function App(){
//     <Router>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/edit/:id' element={<EditInput />} />
//       </Routes>
//     </Router>  
// }

export default App;
