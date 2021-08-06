import React from 'react'
import Form from '../components/Form'
import Loader from '../components/Loader'
import Notes from '../components/Notes'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export default function Home() {
  const {loading,notes,fetchNotes} = React.useContext(FirebaseContext)
  React.useEffect(() => {
    fetchNotes()
   
  }, [])
    return (
        <div>
          <Form/>
          <hr/>
          {
            loading ? <Loader/> : <Notes notes={notes}/>
          }
          
        </div>
    )
}
