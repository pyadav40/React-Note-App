import { useState } from "react";
import "./Home.css";
import NoteCard from "./NoteCard";
import { ObjectCreate } from "../Utility/objectCreate";

const Home = () => {
  /*Intialize the object Note check if local storage has 
  item name it will get or it generage new one */

  const [noteData, setNoteData] = useState(() => {
    try {
      const local = localStorage.getItem("Notes");
      if (local) {
        const parsedData = JSON.parse(local);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          return parsedData;
        }
      }
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
    }

    return [ObjectCreate()];
  });

  //hook is used for theme toggle light or dark
  const [theme, setTheme] = useState(false);

  /* updateNote is HOC function that uses state lifting 
  it take the object in NoteCard component and update if existing enteries persists*/

  const updateNote = (updateData) => {
    noteData.map((item, i) => {
      if (item.id === updateData.id) {
        noteData.splice(i, 1, updateData);
      }
    });

    setNoteData(noteData);
    localStorage.setItem("Notes", JSON.stringify(noteData));
  };

  /* deleteNote is HOC that will take the object and delete.
  It used find method 
  1. The find() method does not change the original array.
  2. The find() method returns undefined if no elements are found.
  3. The find() method returns the value of the first element that passes a test.*/

  const deleteNote = (deleteData) => {
    const deleteNode = noteData.find((item) => {
      return item.id === deleteData.id ? item : null;
    });

    const index = noteData.indexOf(deleteNode);
    noteData.splice(index, 1);
    setNoteData([...noteData]);
    localStorage.setItem("Notes", JSON.stringify(noteData));
  };
  /* addNotes is a function that create empty array with Object Create method
 and using spread operator it merges with noteData orignal array having pervious objects*/

  const addNotes = () => {
    let arr = [];
    arr.push(ObjectCreate());
    setNoteData([...noteData, ...arr]);
    localStorage.setItem("Notes", JSON.stringify(noteData));
  };

  return (
    <div className={`container ${theme ? "dark" : "light"}`}>
      <div className="menu-bar">
        <nav>
          <ul>
            <li onClick={addNotes} className="icon">
              <i style={{ color: "white" }} className="fa-solid fa-plus" />
            </li>
            <li
              onClick={() => {
                setTheme(!theme);
              }}
              className="icon-toogle"
            >
              {theme ? (
                <i style={{ color: "white" }} className="fa-solid fa-moon"></i>
              ) : (
                <i style={{ color: "white" }} className="fa-solid fa-sun" />
              )}
            </li>
          </ul>
        </nav>
      </div>
      <section>
        {noteData.map((item) => (
          <NoteCard
            key={item.id}
            Notedata={item}
            updateNote={updateNote}
            deleteNote={deleteNote}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
