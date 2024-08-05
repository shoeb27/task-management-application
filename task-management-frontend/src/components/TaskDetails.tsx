import { TaskStatus } from '@/enums/task';
import { AppDispatch } from '@/store/store';
import { handelDrawer, ITasks } from '@/store/taskSlice';
import { Col, Drawer, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">
      {' '}
      <strong>{title}:</strong>{' '}
    </p>
    {content}
  </div>
);

const TaskDetails = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    status: '',
  });
  const selector = useSelector((state: any) => state.task);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const task = selector.tasks.find(
      (item: ITasks) => item.id === selector.taskId
    );
    setData(task);
  }, [selector.isDrawerOpen]);

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      title="Task Details"
      onClose={() => dispatch(handelDrawer({ isDrawerOpen: false }))}
      open={selector.isDrawerOpen}
    >
      <Row>
        <Col span={12}>
          <DescriptionItem title="Title" content={data?.title} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Description" content={data?.description} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Status"
            content={
              <Tag color={(TaskStatus as any)[data?.status]} key={data?.status}>
                {data?.status?.toUpperCase()}
              </Tag>
            }
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default TaskDetails;
