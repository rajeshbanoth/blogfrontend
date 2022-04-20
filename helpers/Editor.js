import ReactQuill, { Quill } from 'react-quill-with-table';
// import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { ImageDrop } from 'quill-image-drop-module';
import * as QuillTableUI from 'quill-table-ui'
import BlotFormatter from 'quill-blot-formatter';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register({
  'modules/tableUI': QuillTableUI.default
}, true)


/*
 * Simple editor component that takes placeholder text as a prop
 */
const Editor = (props) => {

  return (
    <>
      <ReactQuill

        onChange={(html) => props.handlechange(html)}
        value={props.value}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'#root'}
        placeholder={props.placeholder}
        theme='snow'

      />
    </>
  );
}

Editor.modules = {
  table: true,
  tableUI: true,
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'video', 'image'],
    ['clean'],
    ['code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }, { 'table': true }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  },
  imageDrop: true,
  blotFormatter: {}
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [

  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block',

  'color',

  'align',
  'direction',
  'indent',
  'background',
  'script',
  'table'

];

export default Editor;


