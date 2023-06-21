import "./App.css";

import { NavigationBar } from "./components/Navigation/Navigation";

import { AuthProvider } from "./contexts/AuthContext";
function App() {
    return (
        <AuthProvider>
            <div className='app'>
                <NavigationBar></NavigationBar>
            </div>
        </AuthProvider>
    );
}

export default App;
