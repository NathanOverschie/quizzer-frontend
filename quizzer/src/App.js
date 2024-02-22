import {useState} from 'react'
import './App.css';

const questions_data = [
  {
    "ID": 0,
    "text": "Klingons respect their disabled comrades, and those who are old, injuried, and helpless.",
    "possibleAnswers": ["False", "True"]
  },
  { "ID": 1,
   "text": "Which famous rapper is featured in Jack &Uuml; (Skrillex and Diplo)&#039;s 2015 single called &quot;Febreze&quot;?",
    "possibleAnswers": ["2 Chainz", "Kendrick Lamar", "Fatman Scoop", "Future"]
  },
  { "ID": 2,
   "text": "Without enchantments, which pickaxe in minecraft mines blocks the quickest.",
    "possibleAnswers": ["Iron", "Diamond", "Golden ", "Obsidian"]
  },
  { "ID": 3,
   "text": "The LS3 engine is how many cubic inches?",
    "possibleAnswers": ["427", "346", "364", "376"]
  },
  { "ID": 4,
   "text": "In Norse mythology, Thor once dressed as a woman.",
    "possibleAnswers": ["False", "True"]
  }
]


function Questions({ questions }) {

  function Question({ question }) {
  
    function PossibleAnswers({ possibleAnswers }) {
    
      function PossibleAnswer({ possibleAnswer }) {
        return (<li>{possibleAnswer}</li>)
      }
    
      return (
        <ul>
          {possibleAnswers.map((p) => <PossibleAnswer possibleAnswer={p} />)}
        </ul>)
    }
  
    return (
      <>
        <p>{question.text}</p>
        <PossibleAnswers possibleAnswers={question.possibleAnswers} />
      </>)
  }

  return (
    <>
      {questions.map((q) => <Question question={q} />)}
    </>
  )
}

async function getQuestions() {
  let response = await fetch("questions");
  let x = await response.json();

  console.log(x);
}

function App() {
  const [questions, setQuestions] = useState(questions_data);

  getQuestions();


  return (
    <div className="App">
      <Questions questions={questions} />
    </div>
  );
}

export default App;
