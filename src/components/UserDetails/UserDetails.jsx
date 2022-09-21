import React from 'react'
import './UsesDetails.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationPin,faLink} from '@fortawesome/free-solid-svg-icons'


export default function UserDetails(props) {
  return (
    <div className='details'>
        <img id='profileimg' src={props.url} alt="" />
        <div>
            <h2>{props.name}</h2>

            <p>{props.bio?(props.bio):"Empty bio"}</p>

            <p>{props.loc?(<div><FontAwesomeIcon icon={faLocationPin}/>
              {props.bloc}</div>
              ):<div><FontAwesomeIcon icon={faLocationPin}/> Empty Location
              {props.bloc}</div>}</p>

            <p><div><FontAwesomeIcon icon={faLink}/>
              {props.link}</div></p>
        </div>
    </div>
  )
}
