import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export default function Notes({ notes }) {
  const alert = React.useContext(AlertContext);
  const firebase = React.useContext(FirebaseContext);
 
  const removeNote = (id)=>{
    firebase.removeNote(id).then(()=>alert.show('Note was deleted','success')).catch(()=> alert.show('Something went wrong','danger'))
  }
  return (
    
    <TransitionGroup component='ul' className="list-group">
      {notes.map((note) => (
        <CSSTransition key={note.id} classNames={'note'} timeout={800}>
        <li className="list-group-item note" >
          <div>
            <strong>{note.title}</strong>
            <small>{note.date}</small>
          </div>

          <button onClick={()=> removeNote(note.id)} type="button" className="btn btn-outline-danger btn-sm">
            &times;
          </button>
        </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
