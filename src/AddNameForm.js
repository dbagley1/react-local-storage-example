import { useState } from 'react';

export default function AddNameForm({ onSubmit }) {
  const [input, setInput] = useState('');

  return <form onSubmit={(e) => {
    e.preventDefault();
    onSubmit(input);
  }}>
    <input type="text" onChange={(e) => setInput(e.target.value)} value={input} />
  </form>;
}
