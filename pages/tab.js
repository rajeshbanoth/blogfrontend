/**
 * Inline Em Tag from Quill Docs:
 */
 import ReactQuill, { Quill } from 'react-quill-with-table';
 let Inline = ReactQuill.Quill.import('blots/inline');
 class EmphBlot extends Inline {
   static create(value) {
     let node = super.create();
     node.setAttribute('style', 'font-size:150%; color: purple');
     node.setAttribute('src', value.url);
     return node;
   }
 
   static value(node) {
     return {
       alt: node.getAttribute('alt'),
       url: node.getAttribute('src')
     };
   }
 }
 
 EmphBlot.blotName = 'em';
 EmphBlot.tagName = 'em';
 EmphBlot.className = 'custom-em';
 ReactQuill.Quill.register('formats/em', EmphBlot);
 
 /**
  * Example HR tag from:
  * https://stackoverflow.com/questions/37525867/
  */
 var Embed = ReactQuill.Quill.import('blots/block/embed');
 class Hr extends Embed {
     static create(value) {
         let node = super.create(value);
         return node;
     }
 }
 Hr.blotName = 'hr';
 Hr.tagName = 'hr';
 
 ReactQuill.Quill.register({
   'formats/hr': Hr
 });
 
 class Editor extends React.Component {
   constructor (props) {
     super(props)
     this.state = { editorHtml: '' }
     this.quillRef = null;
     this.reactQuillRef = null;
     this.handleChange = this.handleChange.bind(this)
     this.handleClickEmbed = this.handleClickEmbed.bind(this)
     this.handleClickFormat = this.handleClickFormat.bind(this)
     this.registerFormats = this.registerFormats.bind(this)
   }
   
   componentDidMount () {
     this.registerFormats()
     this.setState({
       editorHtml: '' // trigger update
     })
   }
   
   componentDidUpdate () {
     this.registerFormats()
   }
   
   registerFormats () {
     // Ensure React-Quill references is available:
     if (typeof this.reactQuillRef.getEditor !== 'function') return;
     // Skip if Quill reference is defined:
     if (this.quillRef != null) return;
     
     console.log('Registering formats...', this.reactQuillRef)
     const quillRef = this.reactQuillRef.getEditor() // could still be null
     
     if (quillRef != null) {
       this.quillRef = quillRef;
       console.log(Quill.imports)
     }
   }
   
   handleClickFormat () {
     var range = this.quillRef.getSelection();
     if (range) {      
       this.quillRef.format('em', true);
     }
   }
   
   handleClickEmbed () {
     var range = this.quillRef.getSelection();
     if (range) {      
       this.quillRef.insertEmbed(range.index,"hr","null")
     }
   }
   
   handleChange (html) {
       this.setState({ editorHtml: html });
   }
   
   render () {
     return (
       <div>
         <ReactQuill 
           ref={(el) => { this.reactQuillRef = el }}
           theme={'snow'}
           onChange={this.handleChange}
           modules={{'toolbar': []}}
           formats={['formats/em','formats/hr', 'em', 'hr']}
           placeholder={this.props.placeholder} />
         <button onClick={this.handleClickFormat}>Apply Emphasis Format</button>
         <button onClick={this.handleClickEmbed}>Insert Hr Format</button>
        </div>
      )
   }
 }
 
 Editor.propTypes = {
   placeholder: React.PropTypes.string,
 }
 
 ReactDOM.render(
   <Editor placeholder={'No standard formats are enabled...'}/>, 
   document.querySelector('.app')
 )