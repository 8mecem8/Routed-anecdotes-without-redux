import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams,useHistory
} from "react-router-dom"







const Menu = ({addNew,anecdotes}) => {

console.log('anecdotes is ======',anecdotes)



  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
    <>
    <div>
      <Link href='#' style={padding} to="/">Home</Link>
      <Link href='#' style={padding} to="/Create">create new</Link>
      <Link href='#' style={padding} to="/About">about</Link>
    </div>

        
     <Switch>
        <Route path="/anecdotes/:id">
          <AnecdoteSingle anecdotes={anecdotes} />
          </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/About">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
</>
</Router>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} > <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)


const AnecdoteSingle = ({ anecdotes }) => {
  const id = useParams().id
  const anecdoteById = anecdotes.find(a => a.id === id)
  
  
    return (
  <div>
    <h3>{anecdoteById.content}</h3>
    <p>Has {anecdoteById.votes}</p>
    <p>For more information please see <a href={anecdoteById.info}>{anecdoteById.info}</a></p>
  </div>
  )}



const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
   This part for Footer,  example ==> "© 2021 American Motor Co., Inc. All information contained herein applies to U.S. products only."
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
const history = useHistory()

  const handleSubmit = (e) => {
    history.push('/')
    
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })

    
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

const anecdoteById = (id) =>anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} />
      
      <Footer />
    </div>
  )
}

export default App;
