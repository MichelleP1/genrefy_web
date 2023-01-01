export function Button(props) {
  const myClass = `btn-spotify button ${props.class}`;
  return (
    <button className={myClass} onClick={props.onClick}>
      {props.title}
    </button>
  );
}
