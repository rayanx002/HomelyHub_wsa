import React, {useState} from 'react'

const StudentCard = (props) => {

    const[likes, setLikes] = useState(0)
    //likes = 0

    function increaseLike(){

        setLikes(likes + 1)
    }

  return (
    <div className='Card'>
      <h2>{props.name}</h2>
      <p>Course:{props.course}</p>
      <h3>Like: {likes}</h3>
      <button onClick={increaseLike}>Like</button>
    </div>
  )
}

export default StudentCard
