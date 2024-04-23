const Filter = ({ filterChar, onChange }) => {
  return (
    <div>
      <label htmlFor="filterInput">filter shown with </label>
      <input
        type="text"
        id="filterInput"
        value={filterChar}
        onChange={onChange}
      />
    </div>
  );
};
export default Filter;