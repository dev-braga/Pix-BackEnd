import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Css/App.css';
import InputMask from 'react-input-mask'
import { Link, useNavigate } from 'react-router-dom';

function CadastroChave(){

    const [cliente, setCliente] = useState([]);
    const [chave, setChave] = useState([]);
    const [tipoCampo, setTipoCampo] = useState("");
    const [isHidden, setIsHidden] = useState(false);
    const [maskTipo, setMaskTipo] = useState('')
    const maskCPF = "999.999.999-99";
    const maskPhone = "(99) 99999-9999";
    const [maskTipoTitle, setMaskTipoTitle] = useState('')
    const navigate = useNavigate()
    // Pegando valores para realizar as validacoes 
    const [clienteSelected, setClienteSelected] = useState([])
    const [chaveSelected, setChaveSelected] = useState([])
    const [campoValor, setCampoValor] = useState('')
    const [campoEmail, setCampoEmail] = useState('')
    // Inserir classe dinamica no select
    var classDefault = 'form-select form-select-lg mb-3'
    const [defaultClienteClass, setDefaultClienteClass] = useState(classDefault)
    const [defaultChaveClass, setDefaultChaveClass] = useState(classDefault)

    useEffect(() =>{
  
      axios.get('https://localhost:44380/Cliente')
      .then(response => setCliente(response.data))
      .catch(err => console.log(err))
        
    }, [])
  
    const HandleVerificaCampos = (e) => {
       
        const tipoCampo = e.target.value

        setChaveSelected( tipoCampo ); // Inserindo qual o tipo de chave
        if(tipoCampo != null && tipoCampo != ""){
           
            if(tipoCampo === "cpf"){
              setMaskTipo(maskCPF);
              setMaskTipoTitle('CPF:')
            }
            if(tipoCampo === "phone"){
              setMaskTipo(maskPhone);
              setMaskTipoTitle('Telefone:');
            }
             
        }
        

        setIsHidden(tipoCampo === "phone" || tipoCampo === "cpf")
    }

    const HandleCadastrar = (event) => {
      
  
      // Validacoes antes de enviar
      if( clienteSelected.length != ""){
         setDefaultClienteClass(classDefault + ' is-valid')
      }
      else{
        setDefaultClienteClass( classDefault + ' is-invalid')
        return;
      }

      // Verificando qual o tipo de chave
      if( chaveSelected != "" && chaveSelected != null){
       
        if( chaveSelected === 'email'){
            // VERIFICANDO CAMPOS ANTES DE INSERIR VALORES
          if(campoEmail != "" && campoEmail != null){
            
            setDefaultChaveClass( classDefault + ' is-valid')

            axios.post('https://localhost:44380/Chave/', { chavePix: campoEmail, clienteId: clienteSelected, tipo: chaveSelected})
            .then()
            .catch( err => console.log(err))
          }
          else{
            console.log("Email vazio")
            setDefaultChaveClass( classDefault + ' is-invalid')
            return;
          }

        }
        else {
          // VERIFICANDO CAMPOS ANTES DE INSERIR VALORES
          if(campoValor != "" && campoValor != null){
           
            setDefaultChaveClass( classDefault + ' is-valid')
            axios.post('https://localhost:44380/Chave/', { chavePix: campoValor, clienteId: clienteSelected, tipo: chaveSelected})
            .then()
            .catch( err => console.log(err))
          }
          else{
            console.log("campo em branco")
            return;
          }  
        }


      } 
      else{
        console.log("Selecione uma chave.")
        setDefaultChaveClass( classDefault + ' is-invalid')
      }
      
    }

    return(
        <div className="vh-100 flex-column d-flex justify-content-center align-items-center">
            <h1 className='title-home pt-5 mb-5'>Simulador de <span className='span-pix'>PIX</span></h1>
            <h4 className='info'>Cadastre uma chave.</h4>

          <form className='container' style={{maxWidth:"40em"}} onSubmit={ HandleCadastrar }> 
          
          <div className='form-pix'>
            <label className='text-light'>Cliente:</label>
            <select className={ defaultClienteClass }
            aria-label="form-select-lg example" onChange={ e => { setClienteSelected(e.target.value)} }>
                <option selected value="">Selecione um cliente</option>
                { 
                    cliente.map((data) => (
                    <option key={data.id} value={data.id}>{data.nome}</option>
                    ))
                }
                </select>
                <label className='text-light'>Chave Pix:</label>
                <select className={ defaultChaveClass } 
                aria-label=".form-select-lg example" 
                onChange={ HandleVerificaCampos }>
                    <option selected value="">Tipo de chave</option>
                    <option value="email">Email</option>
                    <option value="phone">Celular</option>
                    <option value="cpf">CPF</option>
                </select>
          </div>
      
          <div className='form'>
            {!isHidden && (
                <div>
                  <label className='text-light'>Email:</label>
                  <input type="email" 
                  className='form-control'
                  placeholder="email@email.com"
                  onChange={ e => {setCampoEmail(e.target.value)}}
                  />
                </div>
               
            )}

            {isHidden && (
                <div>
                  <label className='text-light'>{maskTipoTitle}</label>
                  <br />
                  <InputMask
                  className='form-phone form-select-lg text-success'
                  id='phone'
                  mask={maskTipo}
                  placeholder={maskTipo}
                  onChange={ e => {setCampoValor(e.target.value)}}
              />
                </div>
            )}
          </div>
          <div className='form pt-4 d-flex flex-column align-items-center'>
            <button type="button" className="btn btn-info w-100 mb-4" onClick={ HandleCadastrar }>Cadastrar</button>

            <Link to="/transferencia" className='pt-2 text-info'>JA POSSUO UMA CHAVE</Link>
          </div>
          </form>
        
        </div>
    )
}
export default CadastroChave