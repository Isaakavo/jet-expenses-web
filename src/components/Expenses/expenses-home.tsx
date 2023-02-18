import { Card, Layout, List, Table, Tag } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { LoginContext } from 'components/App';
import { NavBar } from 'components/shared/components/navbar';
import {
  ExpenseItem,
  ExpenseResponse,
  Tag as TagExpense,
} from 'models/ExpenseResponse';
import moment from 'moment';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import '../shared/styles/shared.css';

export const ExpensesHome = () => {
  const { authenticationState } = React.useContext(LoginContext);
  const [expenses, setExpeses] = React.useState<ExpenseResponse>();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const tagsComponent = (tag: [TagExpense]) =>
    tag.map((ta) => {
      return (
        <Tag color={'geekblue'} key={ta.id} style={{marginBottom: '4px'}}>
          {ta.tagName.toUpperCase()}
        </Tag>
      );
    });

  const columns: ColumnsType<ExpenseItem> = [
    {
      title: 'Concepto',
      dataIndex: 'concept',
      key: 'concept',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => <div>${text}</div>,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tag }) => <>{tagsComponent(tag)}</>,
    },
    {
      title: 'Fecha',
      key: 'date',
      dataIndex: 'dateAdded',
    },
  ];

  React.useEffect(() => {
    const fetch = async () => {
      const axiosConf = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
        },
      };
      const resp = await axios.get(
        'http://192.168.100.5:8080/api/expenses',
        axiosConf
      );
      setExpeses(resp.data.body);
    };
    fetch();
  }, []);

  return (
    <Layout>
      <Header style={{background: 'white'}}>
        <NavBar />
      </Header>
      <Content className='layout-content'>
        {!isTabletOrMobile && (
          <Table columns={columns} dataSource={expenses?.data} />
        )}
        {isTabletOrMobile && (
          <List
            grid={{
              gutter: 0,
              xs: 1,
              sm: 6,
              md: 6,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={expenses?.data}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.concept} extra={moment(item.dateAdded).format('DD MMMM YYYY')}>
                  <div>
                    <div style={{marginBottom: '8px'}}>Total Gastado <span style={{fontWeight: 700}}>${item.total}</span></div>
                    {tagsComponent(item.tag)}
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Content>
    </Layout>
  );
};
