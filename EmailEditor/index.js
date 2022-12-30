import React,{useEffect, useRef} from 'react'
import { render } from 'react-dom';

import EmailEditor from 'react-email-editor';

export default function Index(props) {
    
    const emailEditorRef = useRef(null);

    const exportHtml = () => {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;
        console.log('exportHtml', html);
      });
    };
  

  
    return (
      <div>
        {/* <div>
          <button onClick={exportHtml}>Export HTML</button>
        </div> */}
  
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady}  />
      </div>
    );
}
