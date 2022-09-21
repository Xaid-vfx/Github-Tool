import React from 'react'
import './UsesDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin, faLink } from '@fortawesome/free-solid-svg-icons'
import{ faTwitter} from '@fortawesome/free-brands-svg-icons'

export default function UserDetails(props) {
  return (
    <div className='details'>
      <img id='profileimg' src={props.url} alt="" />
      <div>
        <h2>{props.name?props.name:"No Name"}</h2>

        <p>{props.bio ? (props.bio) : "No bio"}</p>

        <p>{props.loc ? (<div><FontAwesomeIcon icon={faLocationPin} />
          {props.loc}</div>
        ) : <div><FontAwesomeIcon icon={faLocationPin} />
           No location available</div>}</p>

        <a className='link' href={props.link}><p><div><FontAwesomeIcon icon={faLink} />
          {props.link}</div></p></a>
          <a className='link' href={'https://twitter.com/'+props.twitter}><p><div><FontAwesomeIcon icon={faTwitter} />
          {props.twitter?props.twitter:"No Username"}</div></p></a>
      </div>
    </div>
  )
}
