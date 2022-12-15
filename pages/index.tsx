import { useRef, useState } from "react";

export default function Home() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef<any>();
  const feedbackInputRef = useRef<any>();

  function submitFormHandler(event: any) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(data => console.log(data));
  }

  function loadFeedBackHandler() {
    fetch("/api/feedback")
      .then(response => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <h1>Home page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedBackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  )
}
