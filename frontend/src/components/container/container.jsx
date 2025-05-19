import "./style.css";


import NoteCanvas from "../board/Board";
function Container() {
  return (
    <>
      <div className="ContainerBox">
        <NoteCanvas />
      </div>
    </>
  );
}

export default Container;
