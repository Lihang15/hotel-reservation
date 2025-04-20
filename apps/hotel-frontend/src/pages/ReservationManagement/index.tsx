import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, ConfigProvider, Input, InputRef, Modal, Space, TableColumnType, Tag, Tooltip } from "antd";
import { message } from 'antd';
import { FC, useEffect, useRef, useState } from "react";
import styles from './styles.less';
import { ProColumns, ProFormInstance, ProTable } from "@ant-design/pro-components";
import { reservationList, updateProject, createProject } from '@/services/reservation/api';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { history } from "@umijs/max";
import Loading from "@/components/Loading";
import CreateForm from "./Form/Create";
import EditForm from "./Form/Edit";

// ConfigProvider.config({
//   locale: 'en',
// });

const Poject: FC<any> = () => {

  //项目列表数据
  const [tableData, setTableData] = useState<any>();

  //分页
  const [pagination, setPagination] = useState<any>({current: 1,pageSize:5})
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
    type DataIndex = keyof DataType;
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
  // 初始化项目数据
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


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);


    // 更新 params，存储列名和输入值
    setParams((prevParams) => ({
      ...prevParams,
      [dataIndex]: selectedKeys[0], // 将列名和输入值存储到 params 中
    }));
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  const handlePatternClick = (id: number):any =>{
    const fetch = async ()=>{
       await updateProject({id},{isCurrent: true}) 
       history.push(`/project/${id}/pattern`,{id})
    }  
   
   fetch()

  }
  const getColumnSearchProps = (dataIndex: any): ProColumns<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleProjectNameCilck = (record: any)=>{
    message.info('Successfully toggle chart statistics')
  }
  const handleAddClick = async()=>{
    setIsAddProject(true)
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
           <Button type='primary' size="small" onClick={() => {
            setCurrentRecord(record);
            setCancelConfirmVisible(true);
          }}>Cancel Reservation </Button> 
          
           <Button type='primary' size="small" onClick={() => {
          setCurrentRecord(record);
          setEditModalVisible(true);
        }}>Edit Reservation</Button> 
        </Space>
      ),
    },
  ];
    // add项目
    const [isAddProject, setIsAddProject] = useState<any>(false)
    const handleAddFormSubmit = async (values: any) => {
      console.log('表单提交数据:', values);
        // 转义路径中的反斜杠
      const escapedValues = {
        ...values,
      };
        const resp = await createProject(escapedValues)
        const { code, message: m } = resp
        if (code === 0) {
          setIsAddProject(false); // 提交成功后关闭浮层
          fetchData();
        } else {
          message.error(m);
          return
        }
      };

    // edit
    const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // cancel


const [cancelConfirmVisible, setCancelConfirmVisible] = useState(false);

// 调用取消接口
const cancelReservation = async (record) => {
  try {
    await fetch(`/api/reservations/${record._id}/cancel`, {
      method: 'POST',
    });
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
        
                    <Button type='primary'  onClick={handleAddClick}>Create Reservation</Button>
                  ]}
        rowKey={(record) => record._id}
        
          search={false}
         pagination={{ ...pagination, pageSizeOptions: [5, 10, 20], showSizeChanger: true }} />
      </div>
    </Card>

    {
        isAddProject && (
          <CreateForm
            onClose={() => setIsAddProject(false)}
            onSubmit={handleAddFormSubmit}
          />
        )
      }

      

    {editModalVisible && (
            <EditForm
              record={currentRecord}
              onClose={() => setEditModalVisible(false)}
              onSubmit={async (values) => {
                // await updateReservation(currentRecord._id, values);
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