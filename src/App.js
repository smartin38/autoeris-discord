import { BrowserRouter as Router } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { createGlobalStyle } from 'styled-components'
import { useEffect, useState } from 'react'
import Home from './components/Home'
import UserPage from './components/UserPage'
import SignUp from './components/SignupForm'
import Login from './components/LoginForm'
import NotFound from './components/NotFound'

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [errors, setErrors] = useState(false)

    useEffect(() => {
        fetch("/me").then((res) => {
            if (res.ok) {
                res.json().then((user) => {
                    setCurrentUser(user);
                    setIsAuthenticated(true);
                });
            }
        });
    }, []);

    if (!isAuthenticated) {
        return <div></div>;
    }
    return (
        <div className="app">
            <Router>{false ? <LoggedIn /> : <LoggedOut />}</Router>
        </div>
    );
};

    const fetchProductions = () => {
        fetch('/productions')
            .then(res => {
                if (res.ok) {
                    res.json().then(setProductions)
                } else {
                    res.json().then(data => setErrors(data.error))
                }
            })
    }

    const addProduction = (production) => setProductions(current => [...current, production])

    const updateProduction = (updatedProduction) => setProductions(current => {
        return current.map(production => {
            if (production.id === updatedProduction.id) {
                return updatedProduction
            } else {
                return production
            }
        })
    })

    const deleteProduction = (id) => setProductions(current => current.filter(p => p.id !== id))

    if (errors) return <h1>{errors}</h1>


    return (
        <>
            <GlobalStyle />
            <Home />
            <Switch>

                <Route path='/users/new'>
                    <SignUp />
                </Route>

                <Route path='/users/:id'>
                    <UserPage />
                </Route>

                <Route path='/login'>
                    <Login />
                </Route>


                <Route exact path='/'>
                    <Home productions={productions} />
                </Route>

                <Route>
                    <NotFound />
                </Route>

            </Switch>
        </>
    )
}

export default App

const GlobalStyle = createGlobalStyle`
    body{
      background-color: black; 
      color:white;
    }
    `

