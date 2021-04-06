import generator from 'generate-password';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from 'react';
import './App.css';

const App = () => {

  const [passLength, changePassLength] = useState(8);
  const [withNumbers, changeWithNumbers] = useState(false);
  const [password, changePassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const avaibleLength = [6, 7, 8, 9, 10, 11, 12];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPassword = generator.generate({
      length: passLength,
      numbers: withNumbers
    });
    changePassword(newPassword);
    setIsCopied(false);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="select">Длина:</label>
        <select defaultValue={8} id="select" onChange={(e) => changePassLength(e.target.value)}>
          {avaibleLength.map((length, index) => {
            return (
              <option key={index} value={length} >{length}</option>
            )
          })}
        </select>
        <label>С цифрами: </label>
        <input type="checkbox" checked={withNumbers} onChange={(e) => {changeWithNumbers(e.target.checked)}}/>
        <button>Сгеренировать пароль</button>
      </form>
      {password && <div className="result">
        <input value={password} readOnly={true}/>
        <CopyToClipboard text={password} onCopy={() => setIsCopied(true)}>
          <button>Скопировать</button>
        </CopyToClipboard>
        </div>}
      {isCopied && <span>Пароль скопирован!</span>}
    </div>
  );
}

export default App;
