import React from 'react';
import { Typography } from 'antd';
import { Row, Col } from 'antd';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;

function AllColleges({ table }) {
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
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => <Link to={`/college-info/${record._id}`}>View Details</Link>,
    },
  ];

  return (
    <div style={{ margin: 30 }}>
      <Row>
        <Col xs={{ span: 24 }}>
          <Title level={3}>All Colleges</Title>
        </Col>
        {table !== {} ? (
          <Col xs={{ span: 24 }} md={{ span: 20, offset: 2 }}>
            <Table columns={columns} dataSource={table} />
          </Col>
        ) : null}
      </Row>
    </div>
  );
}

export default AllColleges;
