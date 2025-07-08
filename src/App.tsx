import { useState, FormEvent } from "react"
import "./App.css"

import logoImg from "./assets/gasolina_logo.png"


export default function App() {

  interface InfoProps{
    title: string;
    gasolina: number | string;
    alcool: number | string;
  }

  const [gasolina,setGasolina] = useState(0)
  const [alcool,setAlcool] = useState(0)  
  const [info,setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent){
    event.preventDefault()

    if(gasolina === 0 || alcool === 0){
      alert("Todos os valores devem ser maiores que 0!")
      return
    }

    let calculo = (alcool/gasolina)
   
    if(calculo <=0.7){
      setInfo({
        title: "Compensa usar Álcool",
        gasolina: formatarMoeda(gasolina),
        alcool: formatarMoeda(alcool)
      })
    }else{
      setInfo({
        title: "Compensa usar Gasolina!",
        gasolina: formatarMoeda(gasolina),
        alcool: formatarMoeda(alcool),
      })
    }
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",
      {
        style: "currency",
        currency: "BRL"
      })

      return valorFormatado
  }

  return(
    <div>
      <main className="container">
        <img  className="logo" src={logoImg} alt="logo da calculadora" />

        <h1 className="title">Qual a melhor opção?</h1>
      
        <form className="form" onSubmit={calcular}>
          <label className="label">Alcool (preço por litro):</label><br />
          <input className="input" type="number" placeholder="4,90" min="1" step="0.01" required onChange={(e)=> setAlcool(Number(e.target.value)) } /><br/>
          
          <label className="label">Gasolina (preço por litro):</label><br />
          <input className="input" type="number" placeholder="4,90" min="1" step="0.01" required onChange={(e)=> setGasolina(Number(e.target.value)) }/><br />  
        
          <input className="calcular" type="submit" value="Calcular"/>
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
          <h2>{info.title}</h2>

          <span>Álcool: {info.alcool}</span>
          <span>Gasolina: {info.gasolina}</span>
        </section>
        )}

      </main>
    </div>
  )
}

