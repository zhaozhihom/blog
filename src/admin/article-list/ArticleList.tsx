import React, { useEffect, useState } from 'react';
import Table from '../../components/table/Table';
import axios from 'axios' 

const headers = ["标题", "点击量", "是否隐藏", "发布时间", "操作"]

const options = [
  {
    text: "修改",
    fn: (id: number) => {alert(id)}
  }
]

export default function ArticleList() {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("/api/allpost")
      .then(res => res.data)
      .then(res => {
        setRows(res.data);
      })
  }, []);
  
  return (
    <Table rows={rows} headers={headers} options={options}></Table>
  )
}