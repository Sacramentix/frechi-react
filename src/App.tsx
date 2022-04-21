import { useContext, useEffect,  } from 'react'
import './App.scss'
import { MathButton } from './components/MathButton';
import { mathSymbols } from './store/equation/actions';
import { AppContext, AppContextType, GlobalProvider } from './store/game';

function App() {
  const context = useContext(AppContext) as AppContextType;
  
  const { store, actions } = context;
  const {
    submitResult,
    deleteEquation,
    n,
    onNumberClick,
    onSymbolClick
  } = actions;
  var {
    equations,
    resultToFind,
    numbers,
    calculteds
  } = store;

  const getEquations = equations.slice().reverse();
  const sortedNumbers = numbers.sort((a,b)=>a-b);
  const sortedCalculteds = calculteds.sort((a,b)=>a-b);

  return (
    <main>
      <h1>Frechi</h1>
      <h2>{ resultToFind }</h2>
      <div className="result">
      {
        getEquations.map((equation, i) =>
          <output key={i}>
          <p>{ n(equation.entry1) }</p>
          { n(equation.symbol) }
          <p>{ n(equation.entry2) }</p>
          { equation.result != null ? "= " + equation.result : "" }
          {i == 0 && equation.result != null &&
            <button className="accept" onClick={()=>submitResult(context)}>✔</button>
          }
          {i == 0 && ( getEquations.length > 1 || Object.keys(equation).length != 0) != null &&
            <button className="delete" onClick={()=>deleteEquation(context)}>X</button>
          }   
        </output>
        )
      }

    </div>
    <section>
      <div>
        { sortedCalculteds.map((c,i)=><MathButton key={i} value={c+''} onClick={()=>onNumberClick(context, c, calculteds)} />) }
      </div>
      <div>
        { sortedNumbers.map((n,i)=><MathButton key={i} value={n+''} onClick={()=>onNumberClick(context, n, numbers)} />) }
      </div>
      <div>
        { mathSymbols.map((m,i)=><MathButton key={i} value={m+''} onClick={()=>onSymbolClick(context,m)} />) }
      </div>
    </section>
  </main>
  )
}

export default App;
