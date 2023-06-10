import { useSyncExternalStore, useState } from 'react';
const colorSnapshot = {
  colors: [],
  addColor(color) {
    if (color && color.match(/#[a-f\d]{6}/)) {
      window.localStorage.setItem('colors', JSON.stringify([...this.colors, color]));
    }
  }
};
if (!window.localStorage.getItem('colors')) {
  window.localStorage.setItem('colors', JSON.stringify(["#000000"]));
}

function App() {
  const colorsStore = useSyncExternalStore(subscribe, getSnapshot);
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    colorsStore.addColor(input);
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={input} />
    </form>
    {colorsStore.colors.map(color => (<div style={{ backgroundColor: color, color: "#ffffff" }}>{color}</div>))}
  </div>;
}

function subscribe(callback) {
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot() {
  try {
    colorSnapshot.colors = JSON.parse(window.localStorage.getItem('colors'));
  } catch (e) {
    console.error(e);
  }
  return colorSnapshot;
}

export default App;
