import "./ContentBox.css";

function ContentBox({ children, style, className }) {
  return (
    <div className={`content-box ${className}`} style={style}>
      {children}
    </div>
  );
}

export default ContentBox;
