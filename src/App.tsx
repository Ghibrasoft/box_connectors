import Board from './components/Board'

function App() {

  return (
    <div className='wrapper'>
      <Board
        boxQuantity={7}
        connections={[
          { start: 0, end: 1 },
          { start: 0, end: 3 },
          { start: 0, end: 5 },
          // { start: 0, end: 6 }
        ]}
      />
    </div>
  )
}

export default App;
