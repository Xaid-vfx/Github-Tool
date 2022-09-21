import React from 'react'
import './Repo.css'

export default function Repo(props) {
  return (
    <div className='repo'>
        <h2>{props.name}</h2>
        <p>{props.desc}</p>
        <div className='lang'>{props.lang}</div>
    </div>
  )
}
