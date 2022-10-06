import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Home() {
    const [menu, setMenu] = useState(false)

    return (
        <Nav>
            <NavH1>AutoEris</NavH1>
            <Menu>
                {!menu ?
                    <div onClick={() => setMenu(!menu)}>
                    </div> :
                    <ul>
                        <li onClick={() => setMenu(!menu)}>x</li>
                        <li><Link to='/users/1'>User Page</Link></li>
                        <li><Link to='/users/new'>Sign Up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/'> Home</Link></li>
                    </ul>
                }
            </Menu>

        </Nav>
    )
}

export default Home


const NavH1 = styled.h1`
font-family: 'Splash', cursive;
`
const Nav = styled.div`
  display: flex;
  justify-content:space-between;
  
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  a{
    text-decoration: none;
    color:white;
    font-family:Arial;
  }
  a:hover{
    color:pink
  }
  ul{
    list-style:none;
  }
  
`;
