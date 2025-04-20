import { Modal } from 'antd';
import { ProForm, ProFormDatePicker, ProFormDigit } from '@ant-design/pro-components';
import dayjs from 'dayjs';

const EditForm = ({ onClose, onSubmit, record }) => {
  const handleFinish = async (values) => {
    const escapedValues = {
      ...values,
    };
    onSubmit(escapedValues);
  };

  return (
    <Modal
      title="Edit Reservation"
      open
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <ProForm
        onFinish={handleFinish}
        initialValues={{
          arrivalTime: record?.arrivalTime ? dayjs(record.arrivalTime) : undefined,
          tableSize: record?.tableSize,
        }}
        autoFocusFirstInput
        submitter={{
          searchConfig: {
            submitText: 'Update',
            resetText: 'Reset',
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
            picker: 'date',
            disabledDate: (date) => {
              const currentYear = dayjs().year();
              return date.year() !== currentYear;
            },
          }}
          rules={[
            { required: true, message: 'Please enter the Arrival Time!' },
          ]}
         
        />

        <ProFormDigit
          width="md"
          name="tableSize"
          label="Table Size"
          placeholder="Enter table size (1 - 20)"
          min={1}
          max={20}
          fieldProps={{
            precision: 0,
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

export default EditForm;
