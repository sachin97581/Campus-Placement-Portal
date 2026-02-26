// import React from 'react'

// function Card1() {
//   return (
//     <div>Card1</div>
//   )
// }

// export default Card1

import React from 'react'
import '../resume/Card.css'
import { Link } from 'react-router-dom'


const Card = ({ title, body, image, link, imageAlt }) => (
  <a href={link} className="card">
    {/* <img src={image} alt={imageAlt || title} style={{ width: '100%', height: '50%', objectFit: 'cover' }} /> */}
    <div className="card-content">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  </a>
)

export default Card

