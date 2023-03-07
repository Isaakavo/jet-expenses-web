import { Card, Layout, List, Modal, Spin, Table, Tag } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { ColumnsType } from 'antd/es/table';
import { LoadingScreen } from 'components/shared/components/loading';
import { NavBar } from 'components/shared/components/navbar';
import { useApi } from 'hooks/useApi';
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
  const [expenses, setExpeses] = React.useState<ExpenseResponse>();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const { data, error, loading, fetch } = useApi(
    '/api/expenses',
    'get',
    undefined,
    undefined,
    {
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    }
  );

  const tagsComponent = (tag: [TagExpense]) =>
    tag.map((ta) => {
      return (
        <Tag color={'geekblue'} key={ta.id} style={{ marginBottom: '4px' }}>
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
    if (data !== undefined) {
      const expenseRes = new ExpenseResponse(data.body);
      setExpeses(expenseRes);
    }
  }, [data]);
  //TODO make a hook to handle network requests
  React.useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return (
      <LoadingScreen />
    )
  }

  // TODO Make a reusable component
  if (error && !loading) {
    return (
      <Modal title='Sesión agotada' open={true}>
        <span>Por tu seguirad favor inicia sesion de nuevo</span>
      </Modal>
    );
  }

  return (
    <Layout>
      <Header
        style={{
          background: 'white',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
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
                <Card
                  title={item.concept}
                  extra={moment(item.dateAdded).format('DD MMMM YYYY')}
                >
                  <div>
                    <div style={{ marginBottom: '8px' }}>
                      Total Gastado{' '}
                      <span style={{ fontWeight: 700 }}>${item.total}</span>
                    </div>
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
