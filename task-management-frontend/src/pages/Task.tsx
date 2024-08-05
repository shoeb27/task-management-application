import AddTask from '@/components/AddTask';
import TaskDetails from '@/components/TaskDetails';
import TaskList from '@/pages/TaskList';
import { AppDispatch } from '@/store/store';
import { openModel } from '@/store/taskSlice';
import { Button, Flex, Typography, theme } from 'antd';
import { useDispatch } from 'react-redux';

const Task = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    token: { colorPrimaryBorder },
  } = theme.useToken();

  return (
    <>
      <TaskDetails />
      <Flex align="center" justify="space-between" style={{ marginBottom: 20 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Task List
        </Typography.Title>
        <Button
          style={{
            borderColor: colorPrimaryBorder,
          }}
          onClick={() => dispatch(openModel({ isModalOpen: true }))}
        >
          Add Task
        </Button>
      </Flex>
      <TaskList />
      <AddTask />
    </>
  );
};

export default Task;
