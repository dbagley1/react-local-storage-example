export default function NameList({ names }) {
  return <ul>
    {names.map(name => <li>{name}</li>)}
  </ul>;
}
