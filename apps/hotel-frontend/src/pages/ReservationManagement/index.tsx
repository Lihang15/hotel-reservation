import { Button, Card, Select } from "antd";
import { message } from 'antd';
import { FC, useEffect, useRef, useState } from "react";
import styles from './styles.less';
import { ParamsType, ProColumns, ProFormInstance, ProTable } from "@ant-design/pro-components";
import { reservationList, updateReservation } from '@/services/reservation/api';
import Loading from "@/components/Loading";
import dayjs from "dayjs";
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";


const Poject: FC<any> = () => {

  //项目列表数据
  const [tableData, setTableData] = useState<any>();

  //分页
  const [pagination, setPagination] = useState<any>({current: 1,pageSize:10})
  // 查询参数
  const [params, setParams] = useState<{ [key: string]: string }>({});

  const [pageLoading, setPageLoading] = useState(true);


  const ref = useRef<ProFormInstance>()

    // 表格列和数据
    interface DataType {
      _id: string,
      guestName: string,
      phone: string,
      email: string,
      createdAt: string,
			arrivalTime: string,
			tableSize: string,
			status: string,
    }
    const fetchData = async () => {
      const resp = await reservationList({...params,current: pagination.current,pageSize: pagination.pageSize})
      const { code, message: errorMessage,data } = resp
      if (code !== 0) {
        message.error(errorMessage)
        return
      }
      const {rows,total,current,pageSize} = data
      setTableData(rows)
      setPagination((prev: any) => ({
        ...prev,
        total,
        current,
        pageSize,
      }));
    };
  // 初始化表格数据
  useEffect(() => {
   
    fetchData();
    setPageLoading(false)
  }, [params, pagination.current, pagination.pageSize]);


  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // setPagination({current: pagination})
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total
    })
  }

  const handleSearch = (param: ParamsType) => {
      setParams(param)
  };

  const columns: ProColumns[] = [
    {
      search: false,
      sorter: false,
      title: 'Guest Name',
      dataIndex: 'guestName',
      key: 'guestName',
    },
    {
      search: false,
      sorter: false,
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      search: false,
      sorter: false,
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      search: true,
      sorter: false,
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      render: (_,record)=>(<span>{dayjs(record.arrivalTime).format('YYYY-MM-DD')}</span>)
    },
    {
      search: false,
      sorter: false,
      title: 'Table Size',
      dataIndex: 'tableSize',
      key: 'tableSize',
    },
    {
      search: true,
      valueEnum: {
        pending: { text: 'Pending' },
        approved: { text: 'Approved' },
        cancelled: { text: 'Cancelled' },
        completed: { text: 'Completed' },
      },
      valueType: 'select',
      sorter: false,
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Select
          value={record.status}
          style={{ width: 120 }}
          onChange={async (value) => {
            try {
              await updateReservation({ _id: record._id }, { status: value });
              message.success('Status updated successfully!');
              fetchData(); // 刷新表格
            } catch (err) {
              message.error('Failed to update status.');
            }
          }}
          options={[
            { label: 'Pending', value: 'pending' },
            { label: 'Approved', value: 'approved' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Completed', value: 'completed' },
          ]}
        />
      ),
    },
    {
      search: false,
      sorter: false,
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    
  ];


  if(pageLoading){
    return <Loading />
  }

  return <div className={styles.container}>
    <Card>
      <div className={styles.content_area_top_table}>
        <ProTable<DataType> columns={columns} 
        formRef={ref}
        dataSource={tableData} 
        loading={pageLoading} 
        onChange={handleTableChange}
        rowKey={(record) => record._id}
        onSubmit={handleSearch}
        search={{
          defaultCollapsed: true,
          collapseRender: (collapse: boolean) => (collapse ? <DownOutlined /> : <UpOutlined />),
          optionRender: (searchConfig) => [
            <Button
              key="search"
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
              onClick={searchConfig.form?.submit}
              size="large"
            />,
            <Button
              key="reset"
              type="link"
              onClick={() => {
                searchConfig.form?.resetFields();
                searchConfig.form?.submit();
              }}
            >
              Clear
            </Button>,
          ],
        }}
         pagination={{ ...pagination, pageSizeOptions: [5, 10, 20], showSizeChanger: true }} />
      </div>
    </Card>
  </div>
}

export default Poject