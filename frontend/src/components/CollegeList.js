import axios from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Table, Tag, Space } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

function CollegeList() {
  const [tableData, setTableData] = useState([]);
  const [types, setTypes] = useState();
  let { type } = useParams();
  let { key } = useParams();
  useEffect(() => {
    const getCollegeList = async () => {
      let Type = '';
      let url = '';
      if (type === 'state') {
        url = `/college/state/${key}`;
        Type = `Colleges in ${key}`;
      }
      if (type === 'course') {
        url = `/college/course/${key}`;
        Type = `Colleges Having ${key} Course`;
      }
      if (type === 'similarcolleges') {
        url = `/college/similarColleges/${key}`;
        Type = `Similar Colleges`;
      }
      const res = await axios.get(url);
      console.log(res.data, 'data');
      setTypes(Type);
      var data = res.data;
      await data.map((d, i) => {
        d.key = i + 1;
      });
      setTableData(data);
    };
    getCollegeList();
  }, []);

  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Year Founded',
      dataIndex: 'year_founded',
      key: 'year_founded',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => <Link to={`/college-details/${record._id}`}>View Details</Link>,
    },
  ];

  return (
    <div style={{ margin: 30, marginTop: 80 }}>
      <Row>
        <Col xs={{ span: 24 }} style={{ textAlign: 'center', marginBottom: 30 }}>
          <Title level={3}>{types}</Title>
        </Col>

        {tableData ? (
          <Col xs={{ span: 20, offset: 2 }}>
            <Table columns={columns} dataSource={tableData} />
          </Col>
        ) : null}
      </Row>
    </div>
  );
}

export default CollegeList;
