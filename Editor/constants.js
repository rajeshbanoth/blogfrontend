import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import  YoutubeEmbed from 'editorjs-youtube-embed'
import Gist from 'editorjs-github-gist-plugin';
import CodeTool from 'editorjs-code-tool'
import ChangeCase from 'editorjs-change-case';
import CodeMirror from '../dist/bundle'
import NestedList from '@editorjs/nested-list';
const CodeBox = require('@bomdi/codebox');



export const EDITOR_JS_TOOLS = {
  embed:Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  youtubeEmbed: YoutubeEmbed,
  
  // code:CodeMirror,
  // codeBox: {
  //   class: CodeBox,
  //   config: {
  //     themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css', // Optional
  //     themeName: 'atom-one-dark', // Optional
  //     useDefaultTheme: 'light' // Optional. This also determines the background color of the language select drop-down
  //   }
  // },
  changeCase: {
    class: ChangeCase,
    config: {
      showLocaleOption: true, // enable locale case options
      locale: 'tr' // or ['tr', 'TR', 'tr-TR']
    }
  }
 
}
