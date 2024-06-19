import Todo from './components/Todo'
import Logo from './assets/shanturo-logo.png'
function App() {
  return (
    <div className="bg-stone-900 grid py-4 min-h-screen">
      <img src={Logo} alt="shanturo logo" className="w-[120px] ml-4" />
      <Todo />
    </div>
  )
}

export default App
