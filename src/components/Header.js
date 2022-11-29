import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({onAdd,showAdd,title}) => { 
  return (
    <header className="header">
        <h1 style={headingStyle}>{title}</h1>
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add Task'} onClick={onAdd}/>
    </header>
  )
}
Header.defaultProps = { 
    title: 'Task Tracker',
}

Header.protoTypes = { 
    title: PropTypes.string.isRequired,
}
export default Header
const headingStyle = {color:'green'}