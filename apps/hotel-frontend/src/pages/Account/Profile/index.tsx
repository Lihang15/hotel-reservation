import { ProDescriptions } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import styles from './styles.less'
import { getCurrentAccount } from '@/utils/account';

export default () => {
    const currentAccount = getCurrentAccount()
  return (
    <div className={styles.container}>
    <ProDescriptions
      column={2}
      title="User basic information"
      tooltip="Users are assigned by the administrator and given corresponding rights"
    >
      <ProDescriptions.Item
        span={2}
        valueType="text"
        contentStyle={{
          maxWidth: '80%',
        }}
        ellipsis
        label="Username"
      >
        {currentAccount.guestName}
      </ProDescriptions.Item>


      <ProDescriptions.Item label="Date" valueType="dateTime">
        {dayjs(currentAccount.createdAt).format('YYYY-MM-DD HH:mm:ss')}
      </ProDescriptions.Item>
      <ProDescriptions.Item
        label="Role"
      >
        {currentAccount.role}
      </ProDescriptions.Item>

            
            



      
 
  
    </ProDescriptions>
    </div>


  );
};