/* eslint-disable array-callback-return */
import axios from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
const { Title, Text } = Typography;

function CollegeInfo() {
  const [clgData, setClgData] = useState([]);
  const [similarClg, setSimilarClg] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getclgData = async () => {
      const res = await axios.get(`college/id/${id}`);
      var data = res.data;
      var obj = [];
      let str = '';
      for (var i = 0; i < data.courses.length; i++) {
        str += data.courses[i];
        if (i !== data.courses.length - 1) {
          str += ' , ';
        }
      }
      data.courses = str;
      data.key = '1';
      obj.push(data);
      console.log(obj, 'obj');
      setClgData(obj);
    };
    getclgData();
  }, [id]);

  useEffect(() => {
    const getSimClg = async () => {
      const res = await axios.get(`college/similarColleges/${id}`);
      var data = res.data;
      data.map((d, i) => {
        let str = '';
        for (let j = 0; j < d.courses.length; j++) {
          str += d.courses[j];
          if (j !== d.courses.length - 1) {
            str += ' , ';
          }
        }
        d.courses = str;
        d.key = i + 1;
      });
      setSimilarClg(data);
    };
    getSimClg();
  }, [id]);

  useEffect(() => {
    const getStudentData = async () => {
      const res = await axios.get(`student/collegeid/${id}`);
      console.log(res.data, 'students');
      var data = res.data;
      data.map((d, i) => {
        d.key = i + 1;
      });
      console.log(data, 'data');
      setStudentData(data);
    };
    getStudentData();
  }, [id]);

  const columns = [
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
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      key: 'courses',
    },
    {
      title: 'No. of Students',
      dataIndex: 'no_of_students',
      key: 'no_of_students',
    },
  ];

  const columnsSimClg = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      key: 'courses',
    },

    {
      title: '',
      key: 'action',
      render: (text, record) => <Link to={`/college-info/${record._id}`}>View Details</Link>,
    },
  ];

  const columnsStudent = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Batch',
      dataIndex: 'year_of_batch',
      key: 'year_of_batch',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => <Link to={`/student-info/${record._id}`}>View Details</Link>,
    },
  ];

  return (
    <div style={{ margin: 30, marginTop: 80 }}>
      <Row>
        <Col xs={{ span: 24 }} style={{ textAlign: 'center', marginBottom: 10 }}>
          <Text keyboard style={{ fontSize: 30 }}>
            College Information: {clgData[0]?.name}
          </Text>
        </Col>
        {clgData ? (
          <>
            <Col xs={{ span: 24 }} md={{ span: 20, offset: 2 }}>
              <Table columns={columns} dataSource={clgData} pagination={false} />
            </Col>
          </>
        ) : null}
        <Col xs={{ span: 24 }} style={{ marginBottom: 30 }}></Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Col xs={{ span: 20, offset: 1 }} style={{ textAlign: 'left' }}>
            <Title level={4}>Similar Colleges</Title>
          </Col>

          {similarClg.length !== 0 ? (
            <>
              <Col xs={{ span: 22, offset: 1 }}>
                <Table columns={columnsSimClg} dataSource={similarClg} pagination={true} />
              </Col>
            </>
          ) : null}
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Col xs={{ span: 20, offset: 1 }} style={{ textAlign: 'left' }}>
            <Title level={4}>Student's List</Title>
          </Col>
          {studentData.length !== 0 ? (
            <>
              <Col xs={{ span: 22, offset: 1 }}>
                <Table columns={columnsStudent} dataSource={studentData} pagination={true} />
              </Col>
            </>
          ) : null}
        </Col>
      </Row>
    </div>
  );
}

export default CollegeInfo;
