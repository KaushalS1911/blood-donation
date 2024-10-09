import logo from './logo.svg';
import './App.css';
import MyForm from "./Form";
import {Route,Routes} from "react-router-dom";
export default function App() {
  return (
   <>
     <Routes>
       <Route path={'/'} element={<MyForm/>} />
     </Routes>

   </>
  );
}

