const Searchitem = ({ text, id, handleShow }) => {
  return (
    <div className="search-item" onClick={handleShow(id)}>
      {text} <button onClick={handleShow(id)}>show</button>
    </div>
  );
};

export default Searchitem;
