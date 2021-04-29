/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Button, Typography } from 'antd';
import GroupByState from './GroupByState';
import GroupByCourse from './GroupByCourse';
import axios from '../utils/axios';
import AllColleges from './AllColleges';
const { Title } = Typography;

function Dashboard() {
  const [state, setState] = useState(1);
  const [stateData, setStateData] = useState([]);
  const [stateTable, setStateTable] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [courseTable, setCourseTable] = useState([]);
  const [allColleges, setAllColleges] = useState([]);

  useEffect(() => {
    const getStateData = async () => {
      const res = await axios.get('college/statescount');
      console.log(res.data);
      let keys = Object.keys(res.data);
      let statearray = [];
      let dataarray = [['States', 'Total Colleges']];
      for (var i = 0; i < keys.length; i++) {
        let arr = [];
        arr.push(keys[i]);
        arr.push(res.data[keys[i]]);
        let curstate = {
          key: `${i + 1}`,
          state: keys[i],
          count: res.data[keys[i]],
        };
        statearray.push(curstate);
        dataarray.push(arr);
      }
      setStateData(dataarray);
      setStateTable(statearray);
    };
    getStateData();
  }, []);

  useEffect(() => {
    const getCourseData = async () => {
      const res = await axios.get('college/coursescount');
      console.log(res.data);
      let keys = Object.keys(res.data);
      let coursearray = [];
      let dataarray = [['Courses', 'Total Colleges']];
      for (var i = 0; i < keys.length; i++) {
        let arr = [];
        arr.push(keys[i]);
        arr.push(res.data[keys[i]]);
        let curcourse = {
          key: `${i + 1}`,
          course: keys[i],
          count: res.data[keys[i]],
        };
        coursearray.push(curcourse);
        dataarray.push(arr);
      }
      setCourseData(dataarray);
      setCourseTable(coursearray);
    };
    getCourseData();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get('college/all');
      console.log(res.data, 'allcollege');
      var data = res.data;
      data.map((d, i) => {
        d.key = i + 1;
      });
      setAllColleges(data);
    };
    getAllData();
  }, []);

  return (
    <>
      <div style={{ height: 200, background: 'black' }}>
        <div style={{ display: 'flex', paddingTop: '9%', paddingLeft: 50, fontSize: 65 }}>
          <Title level={1} style={{ color: 'white' }}>
            Dashboard
          </Title>
          <Button className='dashboard__button' onClick={() => setState(1)}>
            Group By States
          </Button>
          <Button className='dashboard__button' onClick={() => setState(2)}>
            Group By Courses
          </Button>
          <Button className='dashboard__button' onClick={() => setState(3)}>
            View All Colleges
          </Button>
        </div>
      </div>
      {state === 1 ? (
        <GroupByState data={stateData} table={stateTable} />
      ) : state === 2 ? (
        <GroupByCourse data={courseData} table={courseTable} />
      ) : (
        <AllColleges table={allColleges} />
      )}
    </>
  );
}

export default Dashboard;
