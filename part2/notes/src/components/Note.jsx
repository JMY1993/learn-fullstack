const Note = ({ note, toggleImportance, removeThisNote }) => {
  return (
    <li>{note.content}
    <button onClick={toggleImportance}>make {note.important?"not important":"important"}</button>
    <button onClick={removeThisNote}>delete</button>
    </li>
  )
}

export default Note