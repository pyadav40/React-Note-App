import "./Note.css";
import { useState } from "react";

/* NoteCard is funcional Component that take three Props
1. Notedata from Home Compoent that contain map function iteration object
2. updateNote and deleteNote is HOC from Home component
*/

const NoteCard = ({ Notedata, updateNote, deleteNote }) => {
  /*
  Take three states
  1. imputs that save Object inputs title and comment 
  2. dis is state which was true by default it wll disable textarea and input tags
  3. col state is used to maintain background color of notes so it will look more distictive
  */
  const [inputs, setInputs] = useState(Notedata);
  const [dis, setDis] = useState(true);
  const [col, setCol] = useState("#1bffa7");

  //edtFun is a function that changes the dis state from false to true or vice versa.
  const editFun = () => {
    setDis(!dis);
  };

  //it will collect inputs from textarea ad input tag using onChange handler
  const inputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  //this function will update Notedata Object with new edited one and also invoke editFun.

  const saveNote = () => {
    updateNote(inputs); // Update the noteData in Home component
    editFun(); // Toggle the edit mode
  };

  const deleteItem = () => {
    deleteNote(Notedata);
  };

  return (
    <div className="note" style={{ backgroundColor: col }}>
      <div className="top-icons">
        <input
          placeholder="title"
          onChange={inputChange}
          disabled={dis}
          maxLength="25"
          type="text"
          name="title"
          value={inputs.title}
        />
        <div className="col-container">
          <div
            onClick={() => {
              setCol("#1affa7");
            }}
            className="neon circle"
          ></div>
          <div
            onClick={() => {
              setCol("#3fe955");
            }}
            className="green circle"
          ></div>
          <div
            onClick={() => {
              setCol("#cc57f3");
            }}
            className="purple circle"
          ></div>
        </div>
        <i
          type="button"
          onClick={deleteItem}
          title="delete"
          className="fa-solid dustbin fa-trash"
          aria-label="Delete"
        />
      </div>

      <textarea
        name="comment"
        onChange={inputChange}
        value={inputs.comment}
        autoFocus={false}
        disabled={dis}
        rows="4"
        cols="50"
      />
      <div className="line"></div>
      <div className="note-util">
        <span>{Notedata.time}</span>
        <div onClick={dis ? editFun : saveNote} className="util_icons">
          {dis ? (
            <i title="edit" type="button" className="fa-solid fa-pencil" />
          ) : (
            <i title="save" className="fa-solid fa-bookmark"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
