import { useState, useEffect } from 'react';
import NameList from "./NameList";
import AddNameForm from './AddNameForm';

export default function NameListApp() {
  const [names, setNames] = useState(loadNames() || []);

  function onSubmit(name) {
    setNames(prevNames => [...prevNames, name]);
  }

  useEffect(() => {
    console.log('names changed');
    window.localStorage.setItem('names', JSON.stringify(names));
  }, [names]);

  function loadNames() {
    const localNames = window.localStorage.getItem('names');
    let names = [];
    if (localNames) {
      try {
        names = JSON.parse(localNames);
      } catch (error) {
        console.log(error);
        window.localStorage.removeItem('names');
      }
    }
    return names;
  }

  return <div>
    <AddNameForm {...{ onSubmit }} />
    <NameList {...{ names }} />
  </div>;
}
