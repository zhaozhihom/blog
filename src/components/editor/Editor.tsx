import React, { useState } from 'react'
import BraftEditor from 'braft-editor'

import 'braft-editor/dist/index.css';
import '../../styles/prism-atom-dark.css'
import 'braft-extensions/dist/code-highlighter.css';

import CodeHighlighter from 'braft-extensions/dist/code-highlighter';

// 首先需要从prismjs中引入需要扩展的语言库
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'

// 引入表情包扩展模块样式文件
import 'braft-extensions/dist/emoticon.css'
// 引入表情包扩展模块和默认表情包列表
import Emoticon, { defaultEmoticons } from 'braft-extensions/dist/emoticon'

import Markdown from 'braft-extensions/dist/markdown'

import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/table.css'

import Table from 'braft-extensions/dist/table'

// 转换默认表情包列表，让webpack可以正确加载到默认表情包中的图片，请确保已对png格式的文件配置了loader
// 如果你使用的webpack版本不支持动态require，或者使用的其他打包工具，请勿使用此写法
const emoticons = defaultEmoticons.map((item: any) => require(`braft-extensions/dist/assets/${item}`))

// 也可以使用自己的表情包资源，不受打包工具限制
// const emoticons = ['http://path/to/emoticon-1.png', 'http://path/to/emoticon-2.png', 'http://path/to/emoticon-3.png', 'http://path/to/emoticon-4.png', ...]

const options_emo = {
  // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: ['editor-id-2'],  // 指定该模块对哪些BraftEditor无效
  emoticons: emoticons, // 指定可用表情图片列表，默认为空
  closeOnBlur: true, // 指定是否在点击表情选择器之外的地方时关闭表情选择器，默认false
  closeOnSelect: false // 指定是否在选择表情后关闭表情选择器，默认false
}


// 通过opitons.
const options_highlight = {
  syntaxs: [
    {
      name: 'Java',
      syntax: 'java',
    },
    {
      name: 'Go',
      syntax: 'go',
    },
    {
      name: 'JavaScript',
      syntax: 'javascript'
    }, 
    {
      name: 'TypeScript',
      syntax: 'typescript',
    },
    {
      name: 'Python',
      syntax: 'python',
    },
    {
      name: 'HTML',
      syntax: 'markup'
    }, 
    {
      name: 'CSS',
      syntax: 'css'
    }, 
    {
      name: 'Bash',
      syntax: 'bash'
    },
    {
      name: 'Docker',
      syntax: 'docker'
    },
    {
      name: 'Yaml',
      syntax: 'yaml'
    },
    {
      name: 'Json',
      syntax: 'json'
    },
  ]
}

const options_markdown = {
  // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: ['editor-id-2']  // 指定该模块对哪些BraftEditor无效
}

const options_table = {
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
  // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: ['editor-id-2']  // 指定该模块对哪些BraftEditor无效
}

BraftEditor.use([CodeHighlighter(options_highlight), Emoticon(options_emo), Markdown(options_markdown), Table(options_table)])

export default function Editor({value, onChange}:{value: any, onChange: any}) {

  return (
    <>
      <BraftEditor
              value={value}
              onChange={onChange}
              contentStyle={{height: "880px"}}
            />
    </>
  )

}