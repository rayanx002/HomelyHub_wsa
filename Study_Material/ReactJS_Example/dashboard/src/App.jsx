import './App.css'
import Header from './components/Header'
import StudentCard from './components/StudentCard'

function App() {

  return (
    <>
      <Header/>
      <StudentCard name="John" course="MERN Stack"/>
      <StudentCard name="Max" course="JAVA Script"/>
      <StudentCard name="Alice" course="HTML"/>
    </>
  )
}

export default App
