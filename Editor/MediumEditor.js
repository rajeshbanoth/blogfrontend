import ReactDOM from "react-dom";
import React, { Component, useRef } from "react";

import { createReactEditorJS } from "react-editor-js";

import { EDITOR_JS_TOOLS } from "./constants";
import  edjsHTML from 'editorjs-html'
import Parser from 'editorjs-viewer'

const ReactEditorJS = createReactEditorJS();
const edjsParser  = edjsHTML(); 

const MediumEditor=(props)=> {

  const editorCore = React.useRef(null)
  const handleInitialize = React.useCallback(async(instance) => {
    editorCore.current = instance
  }, [])
  
  const handleSave = React.useCallback(async() => {
    const savedData = await editorCore.current.save();

   props.editorjson(savedData,Parser(savedData.blocks))

  }, [])
 
    return (
      <>
      <ReactEditorJS
     onInitialize={handleInitialize}
      onChange={handleSave}
        tools={EDITOR_JS_TOOLS}
        placeholder= 'Start Writing Your Content'
      
        defaultValue={props.value}

      />
      </>
    );
  }

  export default MediumEditor

