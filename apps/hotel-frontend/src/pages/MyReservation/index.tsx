import { Button, Card, Modal, Space } from "antd";
import { message } from 'antd';
import { FC, useEffect, useRef, useState } from "react";
import styles from './styles.less';
import { ProColumns, ProFormInstance, ProTable } from "@ant-design/pro-components";
import { reservationList, updateReservation, createReservation } from '@/services/reservation/api';
import Loading from "@/components/Loading";
import CreateForm from "./Form/Create";
import EditForm from "./Form/Edit";
import dayjs from "dayjs";


const Poject: FC<any> = () => {

  //项目列表数据
  const [tableData, setTableData] = useState<any>();

  //分页
  const [pagination, setPagination] = useState<any>({current: 1,pageSize:10})

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
      const resp = await reservationList({current: pagination.current,pageSize: pagination.pageSize})
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
  }, [pagination.current, pagination.pageSize]);


  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // setPagination({current: pagination})
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total
    })
    

  }

  const handleAddClick = async()=>{
    setisAddReservation(true)
  }

  const columns: ProColumns[] = [
    {
      sorter: false,
      title: 'Guest Name',
      dataIndex: 'guestName',
      key: 'guestName',
    },
    {
      sorter: false,
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      sorter: false,
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      sorter: false,
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      render: (_,record)=>(<span>{dayjs(record.arrivalTime).format('YYYY-MM-DD')}</span>)
    },
    {
      sorter: false,
      title: 'Table Size',
      dataIndex: 'tableSize',
      key: 'tableSize',
    },
    {
      sorter: false,
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      sorter: false,
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      hideInSearch: true,
      render: (record: any) => (
        <Space size="middle">
            {record.status === 'pending' && (
        <Button
          type="primary"
          size="small"
          danger
          onClick={() => {
            setCurrentRecord(record);
            setCancelConfirmVisible(true);
          }}
        >
          Cancel
        </Button>
      )}
          
           <Button type='primary' size="small" onClick={() => {
            
          setCurrentRecord(record);
          setEditModalVisible(true);
        }}>Edit</Button> 
        </Space>
      ),
    },
  ];
    // add项目
    const [isAddReservation, setisAddReservation] = useState<any>(false)
    const handleAddFormSubmit = async (values: any) => {
      console.log('表单提交数据:', values);
        const resp = await createReservation(values)
        const { code, message: m } = resp
        if (code === 0) {
          setisAddReservation(false); // 提交成功后关闭浮层
          fetchData();
        } else {
          message.error(m);
          return
        }
      };

    // edit
    const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  // cancel


const [cancelConfirmVisible, setCancelConfirmVisible] = useState(false);

// 调用取消接口
const cancelReservation = async (record: any) => {
  try {
    await updateReservation({_id: currentRecord?._id}, {status: 'cancelled'});
    fetchData()
    message.success('Reservation cancelled successfully!');
    setCancelConfirmVisible(false);
  } catch (err) {
    message.error('Failed to cancel reservation.');
  }
};

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
         toolBarRender={() => [
        
                    <Button type='primary'  onClick={handleAddClick}>Create</Button>
                  ]}
        rowKey={(record) => record._id}
        
          search={false}
         pagination={{ ...pagination, pageSizeOptions: [5, 10, 20], showSizeChanger: true }} />
      </div>
    </Card>

    {
        isAddReservation && (
          <CreateForm
            onClose={() => setisAddReservation(false)}
            onSubmit={handleAddFormSubmit}
          />
        )
      }

      

    {editModalVisible && (
            <EditForm
              record={currentRecord}
              onClose={() => setEditModalVisible(false)}
              onSubmit={async (values: any) => {
                await updateReservation({_id: currentRecord?._id}, values);
                fetchData()
                setEditModalVisible(false);
                // loadData();
              }}
            />
          )}

    <Modal
      open={cancelConfirmVisible}
      title="Cancel Reservation"
      onOk={() => cancelReservation(currentRecord)}
      onCancel={() => setCancelConfirmVisible(false)}
      okText="Yes, Cancel it"
      cancelText="No"
      destroyOnClose
    >
      <p>Are you sure you want to cancel this reservation?</p>
    </Modal>
  </div>
}

export default Poject