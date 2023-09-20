import {Routes, Route, useLocation} from 'react-router-dom';
import './App.css'
import Nav from './components/NavBar/nav.jsx';
import Cards from './components/Cards/Cards.jsx';
import Form from './components/Form/Form.jsx'
import Detail from './components/Detail/Detail.jsx'
import Landing from './components/Landing/Landing.jsx'


function App() {
 
  const {pathname} = useLocation()
  return (
    <>
         
         {pathname !== '/' && <Nav/> }
         <Routes>
            <Route path='/' element={<Landing />}/>
            <Route path='/home' element={ <Cards /> } />
            <Route path='/form' element={<Form />} />
            <Route path='/detail/:id' element={<Detail />} />
        </Routes>
    </>
  )
}

export default App
