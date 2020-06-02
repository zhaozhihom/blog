import React, { useState } from 'react'
import Editor from '../components/editor/Editor'
import { Button, makeStyles } from '@material-ui/core'
import { throttle } from 'lodash'
import Axios from 'axios'
import BraftEditor from 'braft-editor'

const useStyles = makeStyles((theme) => ({
  button: {
    position: "absolute",
    top: "15%",
    right: "5%",
    zIndex: 10
  }
}));

const resume = `<h1 style="text-align:start;" size="0" _root="undefined" __ownerid="undefined" __hash="undefined" __altered="false">
<strong><span style="line-height:1.5">个人信息</span></strong></h1><table ><tr><td colSpan="1" rowSpan="1"><span style="font-size:18px">姓名：飞翔 </span>
</td><td colSpan="1" rowSpan="1"><span style="font-size:18px">性别：男 </span></td><td colSpan="1" rowSpan="1"><span style="font-size:18px">
出生年份：1994    </span></td></tr><tr><td colSpan="1" rowSpan="1"><span style="font-size:18px">毕业院校：本科/北极大学计算机系</span></td><td colSpan="1" 
rowSpan="1"><span style="font-size:18px">工作年限：3年</span></td><td colSpan="1" rowSpan="1"><span style="font-size:18px">期望职位：Java开发  
</span></td></tr><tr><td colSpan="1" rowSpan="1"><span style="font-size:18px">期望薪资：税前15k~20k</span></td><td colSpan="1" rowSpan="1">
<span style="font-size:18px">期望城市：北京</span></td><td colSpan="1" rowSpan="1"></td></tr><tr><td colSpan="1" rowSpan="1"><span style="font-size:18px">
手机：135xxxxxxxx</span></td><td colSpan="1" rowSpan="1"><span style="font-size:18px">Email：xxxx.gmail.com</span></td><td colSpan="1" rowSpan="1">
<span style="font-size:18px">微信：xxxxxxx</span></td></tr></table><p></p><h1><strong><span style="line-height:1.5">工作经历</span></strong></h1><p>
<span style="line-height:1.5"><span style="font-size:18px">（工作经历按逆序排列，最新的在最前边，按公司做一级分组，公司内按二级分组）</span></span></p><p></p><h2>
<strong><span style="line-height:1.5">ABC公司 （ 2018年9月 ~ 2020年6月 ）</span></strong></h2><h3><strong><span style="line-height:1.5">DEF项目</span>
</strong></h3><p><span style="line-height:1.5"><span style="font-size:18px">我在此项目负责了哪些工作，分别在哪些地方做得出色/和别人不一样/成长快，这个项目中，
我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。</span></span></p><h3>
<strong><span style="line-height:1.5">GHI项目</span></strong></h3><p><span style="line-height:1.5"><span style="font-size:18px">我在此项目负责了哪些工作，
分别在哪些地方做得出色/和别人不一样/成长快，这个项目中，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，
同事和领导对此的反应如何。</span></span></p><p></p><h3><strong><span style="line-height:1.5">其他项目</span></strong></h3><p><span style="line-height:1.5">
<span style="font-size:18px">（每个公司写2~3个核心项目就好了，如果你有非常大量的项目，那么按分类进行合并，每一类选一个典型写出来。其他的一笔带过即可。</span></span></p>
<p></p><hr/><p></p><h2><strong><span style="line-height:1.5">JKL公司 （ 2016年7月 ~ 2018年8月 ）</span></strong></h2><h3><strong>
<span style="line-height:1.5">MNO项目</span></strong></h3><p><span style="line-height:1.5"><span style="font-size:18px">我在此项目负责了哪些工作，
分别在哪些地方做得出色/和别人不一样/成长快，这个项目中，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中，我最自豪的技术细节是什么，为什么，
实施前和实施后的数据对比如何，同事和领导对此的反应如何。</span></span></p><h3><strong><span style="line-height:1.5">PQR项目</span></strong></h3><p>
<span style="line-height:1.5"><span style="font-size:18px">我在此项目负责了哪些工作，分别在哪些地方做得出色/和别人不一样/成长快，这个项目中，我最困难的问题是什么，
我采取了什么措施，最后结果如何。这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。</span></span></p><h3><strong>
<span style="line-height:1.5">其他项目</span></strong></h3><p><span style="line-height:1.5"><span style="font-size:18px">
（每个公司写2~3个核心项目就好了，如果你有非常大量的项目，那么按分类进行合并，每一类选一个典型写出来。其他的一笔带过即可。）</span></span></p><hr/><p></p><h1><strong>
<span style="line-height:1.5">技能清单</span></strong></h1><p><span style="color:#000000"><span style="letter-spacing:0px"><span style="line-height:1.5">
<span style="font-size:18px">熟练Java、了解Golang</span></span></span></span></p><p><span style="color:#000000"><span style="letter-spacing:0px">
<span style="line-height:1.5"><span style="font-size:18px">熟练使用SpringMVC、SpringBoot、SpringCloud、Gin</span></span></span></span></p><p>
<span style="color:#000000"><span style="letter-spacing:0px"><span style="line-height:1.5"><span style="font-size:18px">熟练使用JPA/MyBatis</span>
</span></span></span></p><p><span style="color:#000000"><span style="letter-spacing:0px"><span style="line-height:1.5"><span style="font-size:18px">
熟练使用Angular/React框架</span></span></span></span></p><p><span style="color:#000000"><span style="letter-spacing:0px"><span style="line-height:1.5">
<span style="font-size:18px">熟练使用MySQL/PgSQL/Redis</span></span></span></span></p><p><span style="color:#000000"><span style="letter-spacing:0px">
<span style="line-height:1.5"><span style="font-size:18px">熟悉kafka、hbase、spark</span></span></span></span></p><p><span style="color:#000000">
<span style="letter-spacing:0px"><span style="line-height:1.5"><span style="font-size:18px">熟练使用Svn/Git，熟练使用IDEA、VSCode等开发工具</span></span>
</span></span></p><p><span style="color:#000000"><span style="letter-spacing:0px"><span style="line-height:1.5">
<span style="font-size:18px">熟悉Docker/k8s</span></span></span></span></p><p><span style="color:#000000"><span style="letter-spacing:0px">
<span style="line-height:1.5"><span style="font-size:18px">有sql优化和JVM调优经验、熟悉设计模式</span></span></span></span></p><p><span style="color:#000000">
<span style="letter-spacing:0px"><span style="line-height:1.5"><span style="font-size:18px">熟悉linux的常用命令</span></span></span></span></p><p></p>`


export default function Resume() {

  const classes = useStyles()

  const [editor, setEditor] = useState(BraftEditor.createEditorState(resume))
  const [text, setText] = useState(null)
  const [isDownload, setIsDownload] = useState(false);

  const handleEditorChange = throttle((e) => {
    setText(e.toHTML())
    setEditor(e)
  }, 1000)

  const submit = () => {
    setIsDownload(true);
    Axios.post('/api/public/resume', {text: text}, {responseType: 'blob'})
    .then(res => {
      // Create a new Blob object using the response data of the onload object
      var blob = new Blob([res.data], {type: 'image/pdf'});
      console.log(blob);
      //Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
      let a = document.createElement("a");
      a.style = "display: none";
      document.body.appendChild(a);
      //Create a DOMString representing the blob and point the link element towards it
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'myResume.pdf';
      //programatically click the link to trigger the download
      a.click();
      //release the reference to the file by revoking the Object URL
      window.URL.revokeObjectURL(url);
      setIsDownload(false);
    })
    .catch(err => {
      console.error(err);
      setIsDownload(false);
    })
  }

  return (
    <>
      <Editor value={editor} onChange={handleEditorChange}></Editor>
      <Button className={classes.button}
        disabled={isDownload} 
        onClick={submit} 
        size="large" 
        variant="contained" 
        color="primary">导出为pdf</Button>
    </>
  )

}