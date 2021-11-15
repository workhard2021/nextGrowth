import { Trash} from "heroicons-react";
import { useReducer} from "react";
import { AddUser } from "./addForm";
import Modal from "./modal";
import { init, reducer} from "./data/data";
import { userContext } from "./userContext/userContext";

const ListUser=(props)=>{
   const [state,dispatch]=useReducer(reducer,init());
   const context={state,dispatch};
   return (<userContext.Provider value={context}>
      {state.toggle ?
         <Modal> 
            <AddUser />
         </Modal>
         : null
      }
      <div className="container">
       <table>
         <thead>
              <tr>
                <th>ID</th>
                <th>Date de création</th>
                <th>Etat</th>
                <th>Nom</th>
                <th>Prénom</th>
               <th>Nom utilisateur</th>
                <th>Matricule</th>
                <th>Action</th>
              </tr>
         </thead>
         <tbody>
           {
              state.users.map((value,index)=>
                 <tr key={index}>
                    <td>{value.id}</td>
                    <td>{value.createdDate}</td>
                    {value.status === "En validation" && <td><div className='on-validation status'> {value.status}</div></td>}
                    {value.status === "Validé" && <td><div className='valide status'>{value.status}</div></td>}
                    {value.status === "Rejeté" && <td><div className='rejected status'> {value.status}</div></td>}
                    <td>{value.firstName}</td>
                    <td>{value.lastName}</td>
                    <td>{value.userName}</td>
                    <td>{value.registrationNumber}</td>
                    <td><Trash className="btn_delete" onClick={()=>dispatch({type:"DELETE",value})} /></td>
                 </tr>
            )}
         </tbody>
       </table>
     </div>
      <div className="btn_add_container">
          <button onClick={()=>dispatch({type:'TOGGLE',value:true})}>Ajouter utilisateur</button>
      </div>
    </userContext.Provider>)
}
export default ListUser;