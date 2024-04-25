import { useEffect, useState } from 'react'

import './App.css'
import Pill from './components/Pill'

function App() {
  const [query, setQuery] = useState("")
  const [result,setResult] = useState([])
  const [suggestion,setSuggestion] = useState([])
  const [selected,setSelected] = useState([])
  const [selectedSet,setSelectedSet] = useState(new Set())

  const fetchData = ()=>{
    fetch(`https://dummyjson.com/users/search?q=${query}`).then((res)=>res.json())
    .then((response)=>{
      if(query?.trim() ==""){
        setSuggestion([])
        return
      }
      console.log(response,"response")
      setResult(response)
      setSuggestion(response)
    })
  }
useEffect(()=>{
  fetchData()

},[query])
const handleSelected = (user)=>{

  setSelected([...selected,user])
  setSuggestion([])
  setSelectedSet(new Set([...selectedSet,user.email]))
  setQuery("")
  console.log("selected user",selected)
  console.log("selected setUser",selectedSet)
}
const removePill = (user)=>{
  console.log("remove pill")
  const updatedSelected = selected.filter((userselect)=> user.email !=  userselect.email)
  setSelected(updatedSelected)
  let updatedEmail = new Set(selectedSet)
  updatedEmail.delete(user.email)
setSelectedSet(updatedEmail)

}
const filterData = ()=>{
  fetch("https://dummyjson.com/users").then((res)=>res.json)
  .then((response)=>{
  const filteredData = response.filter((user)=>{
    return selected.some((term)=> `${user.firstName}${user.lastName}`.includes(`${term.firstName}${term.lastName}`) )
  })
  setResult(filteredData)
  })

}

 useEffect(()=>{
  fetch("https://dummyjson.com/users")
  .then((res)=>res.json())
  .then((response)=>{
    console.log(response,"alldata")
    setResult(response)
  })
 },[])
  return (
    <>
    {/* search */}
    {/* <input type="text"
    placeholder='Enter the task'
    onChange={(e)=> setQuery(e.target.value)}
    /> */}
   
    {/*  */}
    {/* multi search */}
     <div className="user-search-container">
      <div className="user-search-input" 
      
      >
          
        {
          selected?.map((user)=>{
            return(
              <Pill image={user.image}
              text={`${user.firstName}${ user.lastName}`}
              onClick={()=>removePill(user)}
              />
            
            )
          })
        }

        {/* pills */}
        <div>
          <input type="text"
          value={query}
           onChange={(e)=>setQuery(e.target.value)}
          placeholder='Enter the search term' />
          <ul className='suggestion-list'>
            {
              suggestion?.users?.map((user)=>{
                return !selectedSet.has(user.email) ?
                (
                  <li 
                  onClick={()=>handleSelected(user)}
                  >
                     <img src={user.image}
            width={"30px"}
            alt="" />
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
                  </li>
                ):<></>
              })
            }
            </ul>
        </div>
        <button onClick={filterData}>search</button>
      </div>

     </div>

  {/* multi search */}
  {/*  */}
  <div className="table-container">
    <h2>User Information</h2>
    <table className='user-table'>
<thead>
<tr>
  
  <th>id</th>


  <th>image</th>
  <th>firstName</th>
  <th>lastName</th>
</tr>
</thead>
<tbody>
  {
    result?.users?.map((user)=>{
      return(
        <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
      </tr>
      )
    })
  }
</tbody>

    </table>
    </div>
    </>
  )
}

export default App
