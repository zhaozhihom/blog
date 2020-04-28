import React, { useEffect, useState } from 'react';
import Table from '../../components/table/Table';
import axios from 'axios'
import { useHistory } from 'react-router';
import Axios from 'axios';

const headers = ["标题", "点击量", "是否隐藏", "发布时间", "操作"]



export default function ArticleList() {

  const [rows, setRows] = useState([]);

  const history = useHistory()

  const options = [
    {
      text: "修改",
      fn: (id: number) => {
        history.push("/createArticles", { id: id })
      }
    },
    {
      text: "是否显示",
      fn: (id: number) => {
        hiddePost(id)
      },
      textConver: (post: any) => {
        return post.deleted ? "显示" : "隐藏"
      },
      colorConver: (post: any) => {
        return post.deleted ? "primary" : "secondary"
      }
    }
  ];

  function hiddePost(id: number) {
    Axios.put(`/api/private/post/markdeleted/${id}`)
      .then(res => getData())
      .catch(err => console.error(err))
  }

  function getData() {
    axios.get("/api/public/allpost")
      .then(res => res.data)
      .then(res => {
        setRows(res.data);
      })
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <Table rows={rows} headers={headers} options={options}></Table>
  )
}