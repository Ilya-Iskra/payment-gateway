import "./ContentBox.css";

function ContentBox({ children, style }) {
  return (
    <div className="content-box" style={style}>
      {children}
    </div>
  );
}

export default ContentBox;
