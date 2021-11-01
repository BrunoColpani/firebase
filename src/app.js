
import { useState} from "react";
import firebase from "./firebaseConnection";
import './style.css';

function App(){


    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cargo, setCargo] = useState('');
    const [nome, setNome] = useState('');

    const [user, setUser] = useState({});


    async function novoUsuario(){
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then( async (value)=>{

            await firebase.firestore().collection('users')
            .doc(value.user.uid)
            .set({
                nome: nome,
                cargo: cargo,
                Status: true
            })
            .then(()=>{
                setNome('');
                setCargo('');
                setEmail('');
                setSenha('');
            })
           
        })
        .catch((error)=>{
            if(error.code === 'auth/weak-password'){
                alert('Senha fraca...');
            }else if(error.code === 'auth/email-already-in-use'){
                alert('Email já cadastrado');
            }
        })
    }   

    async function logout(){
        await firebase.auth().signOut();
        setUser({});
    }

    async function login(){
        await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then( async (value)=>{
            await firebase.firestore().collection('users')
            .doc(value.user.uid)
            .get()
            .then((snapshot)=>{
                setUser({
                    nome: snapshot.data().nome,
                    cargo: snapshot.data().cargo,
                    Status: snapshot.data().Status,
                    email: value.user.email
                });
            })
            .catch((error)=>{
                console.log('ERRO AO LOGAR');
            })
        })
    }


    return(
        <div>
            <h1>React + Firebase ;)</h1> <br/>


            <div className="container">

               <label>Nome:</label>
                <input type="text" value={nome} onChange={ (e) => setNome(e.target.value)} /><br/>

                <label>Cargo:</label>
                <input type="text" value={cargo} onChange={ (e) => setCargo(e.target.value)} /><br/>

                <label>Email:</label>
                <input type="text" value={email} onChange={ (e) => setEmail(e.target.value)} /><br/>

                <label>Senha:</label>
                <input type="password" value={senha} onChange={ (e) => setSenha(e.target.value)} /><br/>
                
                <button onClick={login}>Fazer Login</button> <br/>
                <button onClick={ novoUsuario}>Cadastrar</button> <br/>
                <button onClick= {logout}>Sair da conta!</button> <br/>
            </div>

            <hr/> <br/>
                { Object.keys(user).length > 0 && (
                    <div>
                        <strong>Olá</strong> {user.nome} <br/>
                        <strong>Cargo:</strong> {user.cargo} <br/>
                        <strong>Email:</strong> {user.email} <br/>
                        <strong>Status</strong> {user.Status ? 'ATIVO' : 'DESATIVADO'} <br/>
                    </div>
                )}
            </div>

    );
}

export default App;