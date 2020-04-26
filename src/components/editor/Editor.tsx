import React, { useState } from 'react'
import BraftEditor from 'braft-editor'

export default function Editor(props: any) {

  const {initValue} = props

  const [editorValue, setEditorValue] = useState(initValue)

  return (
    <>
      <BraftEditor
              value={editorValue}
              onChange={(value)=>setEditorValue(value)}
            />
    </>
  )

}