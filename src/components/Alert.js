import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { AlertContext } from '../context/alert/alertContext';



export default function Alert() {
  const {alert,hide}  = React.useContext(AlertContext)

    

  return (
    <CSSTransition in={alert.visible} timeout={{enter:500,exit:350}} classNames={'alert'} mountOnEnter unmountOnExit>
    <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`} >
      <strong>Warning!</strong>
      &nbsp;{alert.text}
      <button onClick={hide} type="button" className="close"  aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    </CSSTransition>
  );
}
