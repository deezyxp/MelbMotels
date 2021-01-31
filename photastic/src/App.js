import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Book from './components/Book';
import ThankYou from './components/ThankYou'


function App() {
  const [page, setPage] = useState(0);

const payload = {
  customer_name: 'daniel',
  email: 'email@aaa.aa',
  phone: '12313123',
  table_id: '601556937a7f121ce438aaf7'
}

fetch('/api/reservations', {
  method: "POST",
  body: JSON.stringify(payload),
  headers: {
    'accepts': 'application/json',
    'content-type': 'application/json',
  }
}).then((res) => {

  return res.json()
  
}).then((res) => {
  console.log(res)
})

  return (
    <>
    <Navbar setPage={setPage}/>
    {page === 0 ? <Home setPage={setPage} />: null}
    {page === 1 ? <Book setPage={setPage} />: null}
    {page === 2 ? <ThankYou setPage={setPage} />: null}
    </> 
  );
}

export default App;
