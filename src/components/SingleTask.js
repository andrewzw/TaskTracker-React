import {FaTimes} from 'react-icons/fa'

const SingleTask = ({singleTask, onDelete, onToggle}) => {
  return (
    <div 
        className={`task ${singleTask.reminder ? 
            'reminder': ''}`} 
            onDoubleClick={() => onToggle(singleTask.id)}>
        <h3>
            {singleTask.text}{' '}
            <FaTimes 
                style={{color: 'red', cursor: 'pointer'}} 
                onClick = {() => onDelete(singleTask.id)}/>
        </h3>  
        <p>{singleTask.day}</p>
        <p>{singleTask.reminder}</p>
    </div>
  )
}

export default SingleTask
