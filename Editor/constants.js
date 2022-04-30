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
import NestedList from '@editorjs/nested-list';
const CodeBox = require('@bomdi/codebox');
const ColorPlugin = require('editorjs-text-color-plugin');
import Tooltip from 'editorjs-tooltip';

const AttachesTool = require('@editorjs/attaches');


 const configservices ={
  services: {
    facebook:true,
    instagram:true,
    twitter:true,
    twitch:true,
    micro:true,
    Vimeo:true,
    gfycat:true,
    imgur:true,
    vine:true,
    aparat:true,
    "yandex-music-track":true,
    pinterest:true,
    youtube: true,
    coub: true,
    codepen:true,
    github: {
      regex: /https?:\/\/gist.github.com\/([^\/\?\&]*)\/([^\/\?\&]*)/,
      embedUrl: 'data:text/html;charset=utf-8,<head><base target="_blank" /></head><body><script src=https://gist.github.com/<%= remote_id %> ></script></body>',
      html: "<iframe height='450' scrolling='yes' frameborder='no' allowtransparency='true' allowfullscreen='true' src='' style='width: 100%;'></iframe>",
      height: 450,
      width: 600,
      id: (groups) => groups.join('/')
    },
    codepen: {
            regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
            embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
            html: "<iframe height='450' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
            height: 500,
            width: 600,
            id: (groups) => groups.join('/embed/')
          }
  }
}
export const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
    config: configservices
  },
  table: Table,
  marker: Marker,
  list: NestedList,
  warning: Warning,
  code: {
    class:Code,
    config:{
      height:700,
      width:600


    }
  },
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
  changeCase: {
    class: ChangeCase,
    config: {
      showLocaleOption: true, // enable locale case options
      locale: 'tr' // or ['tr', 'TR', 'tr-TR']
    }
  },
  Color: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
       colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
       defaultColor: '#FF1300',
       type: 'text', 
    }     
  },
  Marker: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
       defaultColor: '#FFBF00',
       type: 'marker', 
    }       
  },
  tooltip: {
    class: Tooltip,
    config: {
      location: 'left',
      highlightColor: '#FFEFD5',
      underline: true,
      backgroundColor: '#154360',
      textColor: '#FDFEFE',
      holder: 'editorId',
    }
  }

  




 
}
