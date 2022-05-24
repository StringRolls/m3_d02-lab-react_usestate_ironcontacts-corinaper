import Contacts from "./contacts.json"
import './App.css';
import {useState} from "react"
import './index.css'



function App() {
  
const first5Contacts = Contacts.splice(0,5)
const [contacts, setContacts] = useState(first5Contacts)

//Add random button
const addRandomCeleb= (event)=>{
  const newArray = Contacts.filter((contact)=>!contacts.includes(contact))
  if(newArray.length>0){
  const randomNumber = Math.floor(Math.random()*newArray.length)
  const updatedArray = contacts
  updatedArray.push(newArray[randomNumber])
  console.log(newArray[randomNumber])
  setContacts([...updatedArray])}
}

//Sorting selector
const sort = (event)=>{
  if(event.target.value === "popularity"){
    const popularityFilter = contacts.sort((previous, actual)=>{
      return actual.popularity - previous.popularity
        
  })
  setContacts([...popularityFilter])
} else if (event.target.value === "name"){
  const nameFilter = contacts.sort((previous, actual)=>{
    if (previous.name < actual.name) {
      return -1;
    }
    if (previous.name > actual.name) {
      return 1;
    }
    return 0;   
})
setContacts([...nameFilter])}
}

//delete
function deleteCelebrity (contactid){
  const filteredCelebrities = contacts.filter((contact) => {
    return contact.id !== contactid;
  });

  setContacts(filteredCelebrities);
}


  return (
  <div className="App">
  <h1>Iron Celebrities</h1>
  <button onClick={addRandomCeleb}>Add Random Celebrity</button>

  <select onChange={sort}>
        <option value=""> Sort by ... </option>
        <option value="popularity"> Sort by popularity </option>
        <option value="name"> Sort by name </option>
  </select> 

    <table>
    <tbody>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
        <th>Actions</th>
      </tr>
      {contacts.map((contact)=>{
        if(contact.wonOscar){
          return (
          
          <tr key={contact.id}>
            <td><img className="images" src={contact.pictureUrl} alt={contact.name}></img></td>
            <td>{contact.name}</td>
            <td>{contact.popularity}</td>
            <td><img className="icon" src="https://findicons.com/files/icons/2799/flat_icons/256/trophy.png" alt=""></img></td>
            <td></td>
            <td><button onClick={()=>deleteCelebrity(contact.id)}>Delete</button></td>
          </tr>
        )}
        else if(contact.wonEmmy){
          return (
          
          <tr key={contact.id}>
            <td><img className="images" src={contact.pictureUrl} alt={contact.name}></img></td>
            <td>{contact.name}</td>
            <td>{contact.popularity}</td>
            <td></td>
            <td><img className="icon" src="https://findicons.com/files/icons/2799/flat_icons/256/trophy.png" alt=""></img></td>
            <td><button onClick={()=>deleteCelebrity(contact.id)}>Delete</button></td>
          </tr>
        )}
        else return(
          
          <tr key={contact.id}>
            <td><img className="images" src={contact.pictureUrl} alt={contact.name}></img></td>
            <td>{contact.name}</td>
            <td>{contact.popularity}</td>
            <td></td>
            <td></td>
            <td><button onClick={()=>deleteCelebrity(contact.id)}>Delete</button></td>
          </tr>
        )
      })}
      </tbody>
    </table>
  </div>
  );
}
export default App;
