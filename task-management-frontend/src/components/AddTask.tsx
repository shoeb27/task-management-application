import { TaskStatus } from '@/enums/task';
import { AppDispatch } from '@/store/store';
import { addTasks, editTasks, ITasks, openModel } from '@/store/taskSlice';
import { Button, Form, Input, Modal, Select, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Create a new task form fields validation.
const rules = {
  title: [
    {
      required: true,
      message: 'Please input a title!',
    },
  ],
  description: [
    {
      required: true,
      message: 'Please input a description!',
    },
  ],
  status: [
    {
      required: true,
      message: 'Please input a status!',
    },
  ],
};

// Add task modal dialog for creating a new task and also updating the task.
// Antd modal and form validator are used to validate task form.
// Each form action is controled by state managmement like isModalOpen, isEditMode, editId etc...
const AddTask = () => {
  const selector = useSelector((state: any) => state.task);
  const dispatch = useDispatch<AppDispatch>();

  const [form] = Form.useForm();

  const handleCloseModel = () => {
    dispatch(openModel({ isModalOpen: false }));
  };

  // Is form valid or not.
  // Dispached addTask or editTask event to store.
  const handelSubmit = () => {
    form
      .validateFields()
      .then(values => {
        if (selector.editId) {
          dispatch(editTasks({ ...values, id: selector.editId }));
        } else {
          dispatch(addTasks(values));
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // Set initial status to 'Todo' when modal is opened.
  useEffect(() => {
    form.setFieldValue('status', 'Todo');
  }, []);

  // Reset form when modal is closed.
  useEffect(() => {
    form.resetFields();
  }, [selector.isModalOpen]);

  // Populate form fields with existing task data when modal is opened for edit.
  useEffect(() => {
    if (selector.editId) {
      const task = selector.tasks.find(
        (item: ITasks) => item.id === selector.editId
      );
      if (task) {
        form.setFieldsValue({
          title: task?.title,
          description: task?.description,
          status: task?.status,
        });
      }
    }
  }, [selector.editId]);

  return (
    <Modal
      centered
      open={selector.isModalOpen}
      title={!selector.editId ? 'Add New Task' : 'Edit Task'}
      destroyOnClose={true}
      closeIcon={false}
      footer={() => {
        return (
          <>
            <Button
              name="Cancel"
              type="default"
              htmlType="button"
              onClick={handleCloseModel}
            >
              Cancel
            </Button>
            <Button
              name="save"
              type="primary"
              htmlType="submit"
              onClick={handelSubmit}
            >
              Save
            </Button>
          </>
        );
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 25 }}
        layout="vertical"
        size={'large'}
        style={{ maxWidth: '100%', marginTop: 20 }}
      >
        {/* Task Title */}
        <Form.Item label="Title" name="title" rules={rules.title}>
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={rules.description}
        >
          <TextArea
            placeholder="Description"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        {/* Task Status */}
        <Form.Item label="Status" name="status" rules={rules.status}>
          <Select defaultValue={'Todo'}>
            <Select.Option value="Todo">
              <Tag color={TaskStatus['Todo']}>Todo</Tag>
            </Select.Option>
            <Select.Option value="InProgress">
              <Tag color={TaskStatus['InProgress']}>InProgress</Tag>
            </Select.Option>
            <Select.Option value="Done">
              <Tag color={TaskStatus['Done']}>Done</Tag>
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTask;
