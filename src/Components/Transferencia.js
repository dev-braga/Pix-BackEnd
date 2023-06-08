import { useEffect, useState } from 'react';
import axios from 'axios';

function Transferencia(){
    const [cliente, setCliente] = useState([]);
    const [chave, setChave] = useState([]);

    useEffect(() =>{
  
        axios.get('https://localhost:44380/Cliente')
        .then(response => setCliente(response.data) )
        .catch(err => console.log(err))

      }, [])


    const HandleSelecionaCliente = (event) => {
       
        axios.get('https://localhost:44380/Chave/Cliente/' + event.target.value)
        .then(res =>  setChave(res.data) )
        .catch(err => console.log(err))
    }

    return(
       <div className="container vh-100 d-flex flex-column justify-content-center">
            <h1 className="text-light mb-5">Transferencia</h1>
            <form>
                
            <div className="card text-bg-success mb-3" >
                <div className="card-header">Remetente</div>
                <div className="card-body">
                        <label className='mb-2'>Cliente</label>
                        <select className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"  onChange={ HandleSelecionaCliente }>
                            <option selected value="">Selecione um cliente</option>
                            { 
                                cliente.map((data) => (
                                <option key={data.id} value={data.id}>{data.nome}</option>
                                ))
                            }
                        </select>
                        <label className='mb-2'>Chave</label>
                        <select className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example">
                            <option selected value="">Selecione uma chave</option>
                            {
                                chave.map((chaves) => (
                                    <option key={chave.id}>{chaves.chavePix}</option>
                                ))
                            }
                            
                        </select>
                        
                        <label className='mb-2'>Valor</label>
                        <div className="input-group mb-3">   
                            <span className="input-group-text">$</span>
                            <span className="input-group-text">0.00</span>
                            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)"/>
                        </div>
                </div>
            </div>

            <div className="card text-bg-success mb-3" >
                <div className="card-header">Destinatario</div>
                <div className="card-body d-flex flex-column">
                        <label className='mb-2'>Cliente</label>
                        <select className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example">
                            <option selected value="">Selecione um cliente</option>
                            { 
                                cliente.map((data) => (
                                <option key={data.id}>{data.nome}</option>
                                ))
                            }
                        </select>

                     <input type='submit' className='btn bg-dark text-light' value="Enviar"/>
                </div>
            </div>
            </form>
       </div> 
    )
}

export default Transferencia