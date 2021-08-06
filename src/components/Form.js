import React from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export default function Form() {
     const [value, setValue] = React.useState('')
    
     const alert = React.useContext(AlertContext)
     const firebase = React.useContext(FirebaseContext)
   
     const submitHandler=event=>{
       event.preventDefault()

       if(value.trim()){
           firebase.addNote(value.trim()).then(()=>alert.show('Note was Created','success')).catch(()=> alert.show('Something went wrong','danger'))
          alert.show('Note was created','success') 
          setValue('')
       }else{
           alert.show("Enter the text of the note")
       }
     
         
        
     }
    return (
        <form onSubmit={submitHandler}>
           <div className="form-group">
               <input type="text" className="form-control" placeholder="Введите название заметки" value={value} onChange={e=> setValue(e.target.value)}/>
            </div> 
        </form>
    )
}
