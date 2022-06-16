import React, { useState } from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import Global from '../global';

const New = () =>{

    const url = Global.url;

    const [document, setDocument] = useState({
        title: null,
        //content: null,
        author: null
    });

    // State para redireccionar a la seccion de los documentos

    const [redirect, setRedirect] = useState(false);

    //Referencia a los datos ingresados

    let titleRef = React.createRef();
    //let contentRef = React.createRef();
    let authorRef = React.createRef();

    const changeState = () =>{
        setDocument({
            title: titleRef.current.value,
            //content: contentRef.current,
            author: authorRef.current.value
        });

        console.log(document);
    }


    const [docfiles, setdocfiles] = useState(null);

    const uploadfiles=(e)=>{
        setdocfiles(e);
        insertFiles(e);
        console.log(docfiles); //No guarda nada del input file (null)
              
    }
    
    
    const insertFiles=(e)=>{
        console.log("aaaaaa");
     
        const formData = new FormData();

        for (let index = 0; index<docfiles.length; index++){
        formData.append("files", docfiles[index]);}

        console.log(formData);
        
        axios.post(url + 'saveFiles', formData).then(res=>{
            console.log(res.data);
            console.log(formData); // Se envia null {}
        });
    }

    const sendData = (e) =>{
        //Evitar que la pagina no se refresque al enviar los datos
        e.preventDefault();
        insertFiles();
        changeState();
        
        //Peticion Htpp por POST para guardar el documento usando Axios

        axios.post(url + 'save', document).then(res=>{
            setRedirect(true);
            console.log(res.data);
        });
    }

    if(redirect){
        return <Navigate to = "documents" />
    }


    return(
        <div className="new-doc">

            <div id="document" className="card mx-auto mb-3 mt-5" style={{width:'30em'}}>

                <div className="card-header text-dark">

                    <h4> Create new File </h4>

                </div>

                <div className="card-body">

                    <form onSubmit={sendData}>
                        <div className="mb-3">
                            <label>Title</label>
                            <input type="text" className="form-control" id="title" name="title" ref= {titleRef} onChange={changeState} 
                            required />

                        </div>

                        <div className="mb-3">
                            <label>File</label>
                            <input type="file" className="form-control" id="file" name="files" accept='.*' onChange={(e)=>uploadfiles(e.target.files)}
                            required />

                        </div>

                        <div className="mb-3">
                            <label>Author</label>
                            <input type="text" className="form-control" id="author" name="author" ref= {authorRef} onChange={changeState}
                            required />

                        </div>

                        <div className="mb-3">
                            <input className="form-control btn btn-primary" type="submit" id="publish" value="Save" onClick={(e)=>uploadfiles(e.target.files)} />

                        </div>

                    </form>


                </div>

            </div>

        </div>

    );
}

export default New;