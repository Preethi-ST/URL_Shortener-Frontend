import './App.css';
import Router from './Components/Router/Router';
import AuthProvider from './Components/Context/AuthProvider';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
