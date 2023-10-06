import logo from './logo.svg';
import './App.css';

function App() {
  const From = ['alpha','beta','gamma','delta'];
  const To = ['alpha','beta','gamma','delta'];
  return (
    <div className="App" style={{display:"flex",gap:"10px",margin:"20px"}}>
      <select name="From" id="From">
        {
          From.map((item,key)=>{
            return <option value={item} key={key}>{item}</option>
          })
        }
      </select>
      <select name="To" id="From">
        {
          To.map((item,key)=>{
            return <option value={item} key={key}>{item}</option>
          })
        }
      </select>
      <input type="date" />
    </div>
  );
}

export default App;
