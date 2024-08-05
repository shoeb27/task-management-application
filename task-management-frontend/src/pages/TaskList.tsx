import { TaskStatus } from '@/enums/task';
import { AppDispatch } from '@/store/store';
import {
  deleteTasks,
  fetchTasks,
  handelDrawer,
  openModel,
} from '@/store/taskSlice';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, TableProps, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type ColumnsType<T extends object> = TableProps<T>['columns'];

interface DataType {
  id: number;
  title: string;
  description: string;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 350,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    width: 150,
    filters: [
      {
        text: 'Todo',
        value: 'Todo',
      },
      {
        text: 'InProgress',
        value: 'InProgress',
      },
      {
        text: 'Done',
        value: 'Done',
      },
    ],
    filterSearch: true,
    filterMode: 'menu',
    onFilter: (value, record) => {
      return record.status.includes(value as string);
    },
    sorter: (a, b) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    },
    render: tag => (
      <Tag color={(TaskStatus as any)[tag]} key={tag}>
        {tag.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    render: record => {
      const dispatch = useDispatch<AppDispatch>();

      return (
        <Space size="middle">
          <Tooltip placement="bottom" title="Edit Task">
            <EditOutlined
              onClick={() =>
                dispatch(
                  openModel({
                    isModalOpen: true,
                    editId: record.id,
                    isEditMode: true,
                  })
                )
              }
              style={{ fontSize: 20, cursor: 'pointer' }}
            />
          </Tooltip>

          <Tooltip placement="bottom" title="Delete Task">
            <DeleteOutlined
              onClick={() => dispatch(deleteTasks({ id: record.id }))}
              style={{ fontSize: 20, cursor: 'pointer' }}
            />
          </Tooltip>
        </Space>
      );
    },
  },
];

const TaskList = () => {
  const [data, setData] = useState([]);
  const selector = useSelector((state: any) => state.task);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, []);

  useEffect(() => {
    setData(
      selector.tasks.map((item: DataType) => {
        return {
          key: item.id,
          id: item.id,
          title: item.title,
          description: item.description,
          status: item.status,
        };
      })
    );
  }, [selector.tasks]);

  return (
    <Table
      loading={selector.loading}
      columns={columns}
      rowKey="key"
      pagination={{ pageSize: 10, position: ['bottomRight', 'none'] }}
      dataSource={data}
      scroll={{ y: 410 }}
      onRow={record => {
        return {
          onClick: () => {
            dispatch(handelDrawer({ isDrawerOpen: true, taskId: record.id }));
          },
        };
      }}
    />
  );
};

export default TaskList;
