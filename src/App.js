import './App.css'
import { Container } from '@material-ui/core'
import Navbar from './component/navbar/Navbar'
import Home from './component/home/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './component/auth/Auth'

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
