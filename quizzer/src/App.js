import {useEffect, useState} from 'react'
import './App.css';


function fetchQuestions() {
  return fetch("questions").then(x => {
    x.json()
  });
}

function fetchCheckAnswers(id, answer) {
  return fetch("checkanswers",
    {
      method: "POST",
      body:
      {
        ID: id,
        answer: answer
      }
    }).then(x => {
      return x.json()
    });
}

// function fetchQuestions() {

//   console.log("questions fetched")

//   return new Promise((resolve, reject) => {
//     resolve([{
//       "ID": 0,
//       "text": "Klingons respect their disabled comrades, and those who are old, injuried, and helpless.",
//       "possibleAnswers": ["False", "True"]
//     },
//     {
//       "ID": 1,
//       "text": "Which famous rapper is featured in Jack &Uuml; (Skrillex and Diplo)&#039;s 2015 single called &quot;Febreze&quot;?",
//       "possibleAnswers": ["2 Chainz", "Kendrick Lamar", "Fatman Scoop", "Future"]
//     },
//     {
//       "ID": 2,
//       "text": "Without enchantments, which pickaxe in minecraft mines blocks the quickest.",
//       "possibleAnswers": ["Iron", "Diamond", "Golden ", "Obsidian"]
//     },
//     {
//       "ID": 3,
//       "text": "The LS3 engine is how many cubic inches?",
//       "possibleAnswers": ["427", "346", "364", "376"]
//     },
//     {
//       "ID": 4,
//       "text": "In Norse mythology, Thor once dressed as a woman.",
//       "possibleAnswers": ["False", "True"]
//     }]);
//   });
// }

// function fetchCheckAnswers() {

//   console.log("answers fetched")

//   return new Promise((resolve, reject) => {
//     resolve(true);
//   });
// }

function PossibleAnswer({possibleAnswer, setActive, active, id}) {
  
  const [color, setColor] = useState("black");
  let onClick;

  if (!active && color === "black") {
    setColor("grey");
  }

  if (active) {    
    onClick = () => {
      fetchCheckAnswers(id, possibleAnswer)
        .then(response => {
      console.log(response);
      if (response === true) {
        console.log("update correct")
        setColor("green");
      } else if (response === false) {
        console.log("update correct")
        setColor("red");
      }
        })
        .then(() => {
      setActive(false);
    });
  }
} else {
    onClick = () => { };  
}
  
  return (<li onClick={onClick} style={{ color: color }}>{possibleAnswer}</li>);
}

function PossibleAnswers({possibleAnswers, setActive, active, id}) {

  return (
    <ul>
      {possibleAnswers.map((p, index) => <PossibleAnswer key={index} possibleAnswer={p} setActive={setActive} active={active} id={id} />)}
    </ul>);
}

function Question({ question }) {  

  let [active, setActive] = useState(true);

  return (
    <>
      <p>{question.text}</p>
      <PossibleAnswers possibleAnswers={question.possibleAnswers} setActive={setActive} active={active} id={question.id} />
    </>);
}

function Questions() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions()
      .then(x => {
        setQuestions(x);
      });
  }, []);

  return (
    <div>
      {questions.map((q, index) => <Question key={index} question={q} />)}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Questions/>
    </div>
  );
}

export default App;
