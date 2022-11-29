import SingleTask from "./SingleTask"


const Task = ({task, onDelete, onToggle}) => {
    return (       
    <>
      {task.map((task,index)=>(
        <SingleTask 
        key={index} 
        singleTask={task} 
        onDelete={onDelete} 
        onToggle={onToggle}/>
      )
      )}
    </>
  )
}

export default Task
