import { useState } from "react";

import style from './Form.module.css';

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
    setName(event.target.value);

    const regexpName = /^[а-яА-Яa-zA-Z\-\ ]+$/;
    
    if(!regexpName.test((event.target.value))) {
      setMessage('Неверно введено ФИО');
      setFormValid(false);
    } else {
      setFormValid(true);
      setMessage('Успешно');
    }
  }

  const sendForm = (event) => {
    event.preventDefault();

    const newUser = {
      fio: name,
      age: age
    }

    fetch('http://127.0.0.1:3003/api', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(newUser) 
    })
      .then(res => res.json())
  }

  return (
    <div className="container">
      <form onSubmit={sendForm} className={style.loginForm}>
        <div className="row">

          <div className="mb-3 col-lg-6 col-12 col-md-12 my-auto">
            {formValid ? <div style={{color: 'green'}}>{message}</div> : <div style={{color: 'red'}}>{message}</div>}
            <label htmlFor="YourName" className="form-label">ФИО</label>
            <input value={name} onChange={(event) => nameCheck(event)} type="text" className="form-control" placeholder="Введите ФИО" />
          </div>

          <div className="mb-3 col-lg-6 col-12 col-md-12 my-auto">
            <label htmlFor="YourAge" className="form-label">Возраст</label>
            <select className="form-select" value={age} onChange={(event) => setAge(event.target.value)}>
              {options}
            </select>
          </div>

          <div className="mb-3 text-center">
            <button disabled={!formValid} type="submit" className="btn btn-success">Отправить</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Form;
