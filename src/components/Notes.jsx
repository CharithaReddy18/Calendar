const Notes = ({ noteKey, title, content, onUpdate }) => {
  return (
    <div className="notes-container">
      <div className="notes-header">
        <h3>Notes</h3>
        <span className="notes-subtitle">{title}</span>
      </div>
      <div className="notes-body">
        <textarea
          className="notes-textarea"
          placeholder={`Add your memos for ${title}...`}
          value={content}
          onChange={(e) => onUpdate(noteKey, e.target.value)}
        />
      </div>
    </div>
  );
};

export default Notes;
