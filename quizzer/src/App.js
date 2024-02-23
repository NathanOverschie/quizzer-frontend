import { useEffect, useState } from 'react'
import { decode } from 'he';
import './App.css';



function fetchQuestions() {
  return fetch("/questions").then(x =>
    x.json()
  ).catch(x => {
    return [];
  }
  );
}

function fetchCheckAnswers(id, answer) {
  return fetch("/checkanswers",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: answer,
        ID: id,
      })
    }).then(x =>
      x.json()
    ).catch(x => {
      return [];
    });
}


function PossibleAnswer({ possibleAnswer, setActive, active, id, setQuestionsAnswered }) {

  const [color, setColor] = useState("black");
  let onClick;

  if (!active && color === "black") {
    setColor("grey");
  }

  if (active) {
    onClick = () => {
      fetchCheckAnswers(id, possibleAnswer)
        .then(response => {
          if (response === true) {
            setColor("green");
          } else if (response === false) {
            setColor("red");
          }
        })
        .then(() => {
          setActive(false);
          setQuestionsAnswered(s => s + 1);
        });
    }
  } else {
    onClick = () => { };
  }

  return (<li onClick={onClick} style={{ color: color }}>{decode(possibleAnswer)}</li>);
}

function PossibleAnswers({ possibleAnswers, setActive, active, id, setQuestionsAnswered }) {

  return (
    <ul>
      {possibleAnswers.map((p, index) => <PossibleAnswer key={index} possibleAnswer={p} setActive={setActive} active={active} id={id} setQuestionsAnswered={setQuestionsAnswered} />)}
    </ul>);
}

function Question({ question, setQuestionsAnswered }) {

  let [active, setActive] = useState(true);

  const id = question.ID;

  return (
    <>
      <p>{decode(question.text)}</p>
      <PossibleAnswers possibleAnswers={question.possibleAnswers} setActive={setActive} active={active} id={id} setQuestionsAnswered={setQuestionsAnswered} />
    </>);
}

function Questions() {

  const [questions, setQuestions] = useState([]);

  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const [nextQuestions, setNextQuestions] = useState(false);

  if (questionsAnswered > 0) {
    if (questionsAnswered === questions.length && !nextQuestions) {
      setNextQuestions(true);
      console.log("show next questions button");
    }
  }

  function updateQuestions() {
    return fetchQuestions()
      .then(x => {
        setQuestions(x);
        setQuestionsAnswered(0);
        console.log('new questions');
        console.log(x);
      });
  }

  useEffect(() => {
    updateQuestions();
  }, []);

  function onClick() {
    updateQuestions().then(
      () => {
        setNextQuestions(false);
        console.log("button gone")
      }
    )
  }

  return (
    <div>
      {questions.map((q, index) => <Question key={q.ID} question={q} setQuestionsAnswered={setQuestionsAnswered} />)}
      {nextQuestions && <p onClick={onClick}>next</p>}
    </div>
  );
}


function App() {


  return (
    <div className="App">
      <Questions />
    </div>
  );
}

export default App;
