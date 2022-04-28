import { useContext, useState } from 'react'
import './App.scss'
import { MathButton } from './components/MathButton';
import WinOverlay from './components/WinOverlay';
import { mathSymbols } from './store/equation/actions';
import { AppContext, AppContextType } from './store/game';
import logoUrl from "../public/frechi.svg"

function App() {
  const context = useContext(AppContext) as AppContextType;
  
  const {
    submitResult,
    deleteEquation,
    n,
    onNumberClick,
    onSymbolClick,
    setShowSolution
  } = context.actions;
  var {
    equations,
    resultToFind,
    numbers,
    calculteds,
    hasWin,
    solution,
    showSolution
  } = context;

  const getEquations = equations.slice().reverse();
  const sortedNumbers = numbers.sort((a,b)=>a-b);
  const sortedCalculteds = calculteds.sort((a,b)=>a-b);

  return (<>
    <main>
      <div className='head'> 
        <img src={ logoUrl }/>
        {showSolution && <p>{ solution+" = " }</p>}
        <h2>{ resultToFind }</h2>
        <button onClick={() => setShowSolution(context, true)}>Afficher la solution</button>
      </div>
      <div className="result">
      {
        getEquations.map((equation, i) =>
          <output key={i}>
          { /*Giga tricks sheitanique*/ }
          <p>{ n(+equation.entry1?.toFixed(2)! || undefined) }</p>
          { n(equation.symbol) }
          { /*Giga tricks sheitanique, 2ème acte pour ceux qui n'ont pas vu*/ }
          <p>{ n(+equation.entry2?.toFixed(2)! || undefined) }</p>
          { equation.result != null ? "= " + equation.result : "" }
          {i == 0 && equation.result != null &&
            <button className="accept" onClick={()=>submitResult(context)}>✔</button>
          }
          {i == 0 && ( getEquations.length > 1 || Object.keys(equation).length != 0) &&
            <button className="delete" onClick={()=>deleteEquation(context)}>X</button>
          }   
        </output>
        )
      }

    </div>
    <section>
      <div>
        { sortedCalculteds.map((c,i)=><MathButton key={i} value={+ c.toFixed(2)+''} onClick={()=>onNumberClick(context, c, calculteds)} />) }
      </div>
      <div>
        { sortedNumbers.map((n,i)=><MathButton key={i} value={n+''} onClick={()=>onNumberClick(context, n, numbers)} />) }
      </div>
      <div>
        { mathSymbols.map((m,i)=><MathButton key={i} value={m+''} onClick={()=>onSymbolClick(context,m)} />) }
      </div>
    </section>
  </main>
  { hasWin &&
    <WinOverlay/>
  }
  </>)
}

export default App;
