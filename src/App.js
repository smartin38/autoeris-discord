import { Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { useEffect, useState } from 'react'
import Home from './components/Home'
import Navigation from './components/Navigation'
import UserPage from './components/UserPage'
import SignUp from './components/Signup'
import Login from './components/Login'
import NotFound from './components/NotFound'

function App() {
    const [productions, setProductions] = useState([])
    const [errors, setErrors] = useState(false)

    useEffect(() => {
        fetchProductions()
    }, [])

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
            <Navigation />
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

