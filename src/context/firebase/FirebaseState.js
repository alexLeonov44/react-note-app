import React from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReduser } from './firebaseReducer'
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER } from '../types'

const url = process.env.REACT_APP_DB_URL

export default function FirebaseState({children}) {
    const initialState = {
        notes:[]
        ,loading:false
    }
    const [state, dispatch] = React.useReducer(firebaseReduser, initialState)
    const showLoader = ()=>dispatch({type:SHOW_LOADER})
    const fetchNotes = async ()=>{
        showLoader()
        const res = await axios.get(`${url}/notes.json`)
        const payload = Object.keys(res.data).map(key=>({...res.data[key],id:key}))
        dispatch({type:FETCH_NOTES,payload})
    }
    const addNote = async title => {
        const note = {
            title,date:new Date().toJSON()           
        }
        try {
            const res = await axios.post(`${url}/notes.json`,note)
            console.log('addnote' ,res.data)
            const payload = {
                ...note,id:res.data.name
            }
            dispatch({type:ADD_NOTE,payload})
        } catch (error) {
            throw new Error(error.message)
        }
        
       
    }
    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}.json`)
        dispatch({
           type:REMOVE_NOTE
           ,payload:id 
        })
    }
    return (
        <FirebaseContext.Provider value={{showLoader,addNote,fetchNotes,removeNote,loading:state.loading,notes:state.notes}}>
            {children}
        </FirebaseContext.Provider>
    )
}
