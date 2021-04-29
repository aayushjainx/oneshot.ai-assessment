import axios from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
const { Text } = Typography;

function StudentInfo() {
  const [studentDetails, setStudentDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getStudentDetails = async () => {
      const res = await axios.get(`student/id/${id}`);
      console.log(res.data, 'students');
      var data = res.data;
      var obj = [];
      let str = '';
      for (var i = 0; i < data.skills.length; i++) {
        str += data.skills[i];
        if (i !== data.skills.length - 1) {
          str += ' , ';
        }
      }
      data.skills = str;
      data.key = '1';
      const clg = await axios.get(`college/id/${data.college_id}`);
      data.college_name = clg.data.name;
      obj.push(data);
      console.log(obj, 'data');
      setStudentDetails(obj);
    };
    getStudentDetails();
  }, [id]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'College',
      dataIndex: 'college_name',
      key: 'college_name',
      render: (text, record) => <Link to={`/college-info/${record.college_id}`}>{text}</Link>,
    },
    {
      title: 'Batch',
      dataIndex: 'year_of_batch',
      key: 'year_of_batch',
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
    },
  ];

  return (
    <div style={{ margin: 30, marginTop: 80 }}>
      <Row>
        <Col xs={{ span: 24 }} style={{ textAlign: 'center', marginBottom: 30 }}>
          <Text keyboard style={{ fontSize: 30 }}>
            Student Information: {studentDetails[0]?.name}
          </Text>
        </Col>
        {studentDetails ? (
          <>
            <Col xs={{ span: 24 }} md={{ span: 20, offset: 2 }}>
              <Table columns={columns} dataSource={studentDetails} pagination={false} />
            </Col>
          </>
        ) : null}
      </Row>
    </div>
  );
}

export default StudentInfo;
