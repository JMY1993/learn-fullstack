const Searchitem = ({ text, id, handleShow }) => {
  return (
    <div>
      {text} <button onClick={handleShow(id)}>show</button>
    </div>
  );
};

export default Searchitem;
