import { X } from "heroicons-react"
import { useContext } from "react"
import { arrayVerify, verifyForm } from "./data/data";
import { userContext } from "./userContext/userContext"
export const AddUser =(props)=>{
      const {dispatch,state}=useContext(userContext); 
      const saisir=(e)=>{
          e.preventDefault();
          const {value,name}=e.target;
          dispatch({ type:"SAISIR",value:{formData:{...state.formData,[name]:value}}});
      }
      const send=(e)=>{
          e.preventDefault();
          dispatch({ type: 'MESSAGE', value: { message:{}}});
          const verify = verifyForm(arrayVerify,state.formData);
          if(verify.test){
             return dispatch({ type:'FORM_ERROR',value:{formError:verify.formError}});
          }
        for(let key in state.formData){
            state.formData[key]=state.formData[key][0].toUpperCase() + state.formData[key].slice(1).toLowerCase();
        }
        const {status} = state.formData;
        if('En validation' !== status && 'Validé' !== status && "Rejeté" !== status){
            return dispatch({ type: 'MESSAGE', value: {message:{status:'*'}}});
        }
        if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(state.formData.createdDate)){
           return dispatch({ type: 'MESSAGE', value: { message: { date: 'xxxx-xx-xx'}}});
        }
        const user = {...state.formData,status,id:Date.now()}
        dispatch({ type: 'ADD', value:{user,message:{success:"Enregistré"}}});  
      }
      
  return (<div className="container">
            <form onSubmit={send} className="form">
                <div className="display_icone">
                 <X className="btn" onClick={() => dispatch({ type:"TOGGLE", value: false })}></X>
               </div>
               {!state.message.success &&<h2 className="title_form">Ajout d'utilisateur</h2>}
               {state.message.status &&<div className="error">
                  <p>Status doit etre:</p>
                  <ul>
                    <li>En validation</li>
                    <li>Validé</li>
                    <li>Rejeté</li>
                  </ul>
                </div>
               }
                {state.message.date &&<div className="error">
                  <p>Le format de la date doit etre :</p>
                      {state.message.date}
                 </div>
               }
               {state.message.success?
                       <div className="success">{state.message.success}</div>
              :<>
               <div className='child'>
                    <div className="item">
                       <label htmlFor='firstName'>Nom {state.formError.firstName && <span className="verify">{state.formError.firstName}</span>}</label>
                       <input id="firstName" type="text" name="firstName" value={state.formData.firstName} onChange={saisir}/>
                    </div>
                      <div className="item">
                       <label>Nom d'utilisateur {state.formError.userName && <span className="verify">{state.formError.userName}</span>}</label>
                       <input type="text" name="userName" value={state.formData.userName} onChange={saisir}/>  
                    </div>
                      <div className="item">
                       <label>Matricule  {state.formError.registrationNumber && <span className="verify">{state.formError.registrationNumber}</span>}</label>
                       <input type="text" name="registrationNumber"  value={state.formData.registrationNumber} onChange={saisir}/>
                    </div>
               </div>
               <div className='child'>
                     <div className="item">
                       <label>Prénom {state.formError.lastName && <span className="verify">{state.formError.lastName}</span>}</label>
                       <input type="text" name="lastName" value={state.formData.lastName} onChange={saisir}/>  
                     </div>
                      <div className="item">
                       <label>Date de création {state.formError.createdDate && <span className="verify">{state.formError.createdDate}</span>}</label>
                       <input type="text" name="createdDate" value={state.formData.createdDate} onChange={saisir}/>  
                     </div>
               </div>
               <div className='child'>
                     <div className="item">
                       <label>Etat {state.formError.status && <span className="verify">{state.formError.status}</span>}</label>
                       <input type="text" name="status" value={state.formData.status} onChange={saisir}/>  
                     </div>
               </div>
              <div className='child'>
                  <button>Enregistrer</button>
            </div>
          </>}
            </form>
    </div>)
}