import axios from "axios";
import { useState  , useEffect} from "react";
import Row from "./Row";



const SimpleInput = ({ options}) => {

  
  const [ userData , setUserData ] = useState([])
  const [ name , SetName] = useState('')
  const [ SelectOption, SetSelectOption] = useState('Electronics and Optics')
  const [ agreed , setAgreed ] = useState(false)
  const [ isLoading , setIsloading] = useState(false)
  // const [ outputs , SetOutput] = useState('')


      useEffect(() => {
        const getUsers = () => {
          axios
            .get(`${process.env.REACT_APP_API_URL}/user`)
            .then((response) => setUserData(response.data))
            .catch((error) => console.log(error));
        };

        getUsers();
      }, [userData]);


  const clearField=()=> {
    SetName('')
    setAgreed('')
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    setIsloading(true)

    const data = {
      name,
      SelectOption,
      agreed
    }

    axios.post(process.env.REACT_APP_API_URL , data)
       setIsloading(false);
       clearField();
    
  }

    // console.log("Edit Users", userData)
  if (isLoading) return <div>Loading.....</div>

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => SetName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="form-select">
            <label>
              Please enter your name and pick the Sectors you are currently
              involved in.
            </label>
            <select
              value={SelectOption}
              onChange={(e) => SetSelectOption(e.target.value)}
              required
            >
              {options?.map((option) => (
                <option
                  key={option._id}
                  className="option"
                  value={option.label}
                >
                  {option.value}
                </option>
              ))}
            </select>
          </div>
          <div className="form-checkbox" required>
            <input
              type="checkbox"
              onChange={() => setAgreed((prev) => !prev)}
            />{" "}
            Agree to terms
          </div>
          <div className="form-actions">
            <button>Submit</button>
          </div>
        </form>

        <div>
          {userData.length > 0  && (
          <table className="users">
            <thead>
              <tr>
                <th>Name |  Sector | Agreed to terms</th>
            
              </tr>
            </thead>
            <tbody>
              {userData?.map((user) => (
                <Row {...user} />
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </>
  );
};

export default SimpleInput;
