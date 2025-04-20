import { Modal} from 'antd';
import { ProForm,  ProFormDatePicker, ProFormDigit } from '@ant-design/pro-components';
import dayjs from 'dayjs';

const CreateForm = ({ onClose, onSubmit }) => {
  const handleFinish = async (values) => {
    const escapedValues = {
      ...values,
    };
   
    onSubmit(escapedValues);
  };

  return (
    <Modal
      title="Create Reservation"
      open
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <ProForm
        onFinish={handleFinish}
        initialValues={{
        //   prjectName: 'my project',
        //   useMode: 'chapter',
        }}
        autoFocusFirstInput
        submitter={{
          searchConfig: {
            submitText: 'Submit',
            resetText: 'Reset'
          },
          submitButtonProps: {
            type: 'primary',
          },
         
        }}
      >

<ProFormDatePicker
  width="md"
  name="arrivalTime"
  label="Arrival Time"
  placeholder="Select Month and Day"
  fieldProps={{
    // format: 'MM-DD',
    picker: 'date',
    onChange: (value) => {
      console.log('User picked:', value?.format('MM-DD'));
    },
    disabledDate: (date) => {
      // 限制只能选当前年份
      const currentYear = dayjs().year();
      return date.year() !== currentYear;
    },
  }}
  rules={[
    { required: true, message: 'Please enter the Arrival Time!' },
  ]}
  transform={(value) => {
    // 组合当前年 + 用户选的月日
    const fullDate = dayjs(`${dayjs().year()}-${value.format('MM-DD')}`, 'YYYY-MM-DD');
    return {
      arrivalTime: fullDate.toDate(),
    };
  }}
/>
<ProFormDigit
  width="md"
  name="tableSize"
  label="Table Size"
  placeholder="Enter table size (1 - 20)"
  min={1}
  max={20}
  fieldProps={{
    precision: 0, // 只允许整数
  }}
  rules={[
    { required: true, message: 'Please enter Table Size' },
    {
      validator: async (_, value) => {
        if (value < 1 || value > 20) {
          return Promise.reject('Table Size must be between 1 and 20!');
        }
      },
    },
  ]}
/>
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
