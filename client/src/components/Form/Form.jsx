import { useEffect } from "react";
import { useState } from "react";

function Form () {

  const [age, setAge] = useState(3);
  const [name, setName] = useState('');

  const [formValid, setFormValid] = useState(false);
  const [message, setMessage] = useState('');

  const ageOptions = new Array(100).fill(0).map((el, i) => i ).filter(el => el > 2 && el < 100);
  
  const options = ageOptions.map((age, index) => {
     return <option key={index}>{age}</option>;
  });

  const nameCheck = (event) => {
    setName(event.target.value)

    const regexpEmail =
    /^[а-яА-Яa-zA-Z\-\ ]+$/;
    
    if(!regexpEmail.test((event.target.value))) {
      setMessage('Неверно введено ФИО')
      setFormValid(false)
    } else {
      setFormValid(true)
      setMessage('Успешно')
    }

  }

  const sendForm = (event) => {
    event.preventDefault();

    const newUser = {
      user_name: name,
      user_age: age,
    }

    console.log(newUser)
    fetch('http://127.0.0.1:3003/api', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(newUser) 
    })
      .then(res => res.json())
  }

  return (
    <div className="container">
      <form onSubmit={sendForm}>
        {formValid ? <div>{message}</div> : <div>{message}</div>}
        <div className="mb-3">
          <input value={name} onChange={(event) => nameCheck(event)} type="text" className="form-control" placeholder="ФИО" />
        </div>

        <div className="mb-3">
        <select className="form-select" value={age} onChange={(event) => setAge(event.target.value)}>
          {options}
        </select>
        </div>

        <div className="col-auto">
          <button disabled={!formValid} type="submit" className="btn btn-primary mb-3">Отправить</button>
        </div>

      </form>
    </div>
  )
}

export default Form;
