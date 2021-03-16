import React ,{useEffect , useState} from 'react'
import './App.css';
import CurrencyRow from './CurrencyRow';


const URL = 'https://api.exchangeratesapi.io/latest';
function App() {

const [currencyOptions,setCurrencyOptions]=useState([])
const [fromCurrency,setFromCurrency] = useState()
const [toCurrency,setToCurrency] = useState()
const [exchangeRate, setExchangeRate] = useState()
const [amount,setAmount]=useState(1)
const [amountInFromCurrency,setAmountInFromCurrency]=useState(true)
//console.log(currencyOptions)
console.log(exchangeRate)


let toAmount,fromAmount
if(amountInFromCurrency){
  fromAmount = amount
  toAmount = amount * exchangeRate
} else {
  toAmount = amount
  fromAmount = amount / exchangeRate
}
  useEffect(()=>{
    fetch(URL)
    .then(res=>res.json())
    .then(data=>{
      const firstCurrency = Object.keys(data.rates)[0]
       //console.log("data:",data)
      setCurrencyOptions([data.base,...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  },[])

  

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  return (
    <div className="App">
      <h1>Currency Convertor</h1>
      <CurrencyRow
       currencyOptions={currencyOptions} 
      selectCurrency={fromCurrency} 
      onChangeCurrency={e=>setFromCurrency(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount = {fromAmount}/>
      <div className="equal"> = </div>
      <CurrencyRow 
      currencyOptions={currencyOptions}
       selectCurrency={toCurrency}  
       onChangeCurrency={e=>setToCurrency(e.target.value)}
      onChangeAmount={handleToAmountChange}
       amount = {toAmount}
       />
    </div>
  );
}

export default App;
