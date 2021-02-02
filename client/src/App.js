import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Book from './components/Book';
import Confirmation from './components/Confirmation'


function App() {
  const [page, setPage] = useState(0);

  return (
    <>
    <Navbar setPage={setPage}/>
    {page === 0 ? <Home setPage={setPage} />: null}
    {page === 1 ? <Book setPage={setPage} />: null}
    {page === 2 ? <Confirmation setPage={setPage} />: null}
    </> 
  );
}

export default App;
