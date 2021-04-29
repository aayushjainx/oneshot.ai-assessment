import React from 'react';
import { Typography } from 'antd';
import { Chart } from 'react-google-charts';
import { Row, Col } from 'antd';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;

function GroupByState({ data, table }) {
  console.log(table, 'table');
  const columns = [
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (text) => <Link to={`/college-list/state/${text}`}>{text}</Link>,
    },
    {
      title: 'Number of Colleges',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return (
    <div style={{ margin: 30 }}>
      <Row>
        <Col xs={{ span: 24 }}>
          <Title level={3}>Colleges Grouped by States</Title>
        </Col>
        {data ? (
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Chart
              chartType='PieChart'
              data={data}
              width='100%'
              height='450px'
              style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}
              legendToggle
            />
          </Col>
        ) : null}

        {table !== {} ? (
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Table columns={columns} dataSource={table} />
          </Col>
        ) : null}
      </Row>
    </div>
  );
}

export default GroupByState;
