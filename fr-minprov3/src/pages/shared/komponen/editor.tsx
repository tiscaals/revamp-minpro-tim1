import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { resolve } from "path";

function Editor() {
  let editorRef:any = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {}; // if it don't find any document then it will be an empty object 

  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    setLoaded(true);
  }); // run on mounting

   const API_URL = "https://noteyard-backend.herokuapp.com"
   const UPLOAD_ENDPOINT = "../../../../testuploads"

  //  function uploadAdapter(loader:any){
  //   return{
  //     upload : ()=> {
  //       return new Promise((resolve,reject)=>{
  //         const body = new FormData();
  //         loader.file.then((file:any)=>{
  //           body.append("testuploads",file);
  //           fetch(`${API_URL}/${UPLOAD_ENDPOINT}`,{
  //             method : "post",
  //             body : body
  //           }).then((res => res.json())
  //           .then((res:any)=>{
  //             resolve({default :`${API_URL}/${res.url}`})
  //           })
  //           .catch((err:any)=>{
  //             reject(err)

  //           })
  //         )
  //         })
  //       })
  //     }
  //   }
  //  }

  //  function uploadPlugin(editor:any){
  //   editor.plugin.get("FileRepository").createUploadAdapter = (loader:any)=>{
  //     return uploadAdapter(loader);
  //   }
  //  }
  
    
  if (loaded) {
    return (
      <CKEditor
      // config={{
      //   extraPLugins : [uploadPlugin]
      // }}
        editor={ClassicEditor}
        data=" "
        onReady={(editor:any) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event:any, editor:any) => {  // do something when editor's content changed
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event:any, editor:any) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event:any, editor:any) => {
          console.log("Focus.", editor);
        }}
      />
    );
  } else {
    return <h2> Editor is loading </h2>;
  }
}

export default Editor;