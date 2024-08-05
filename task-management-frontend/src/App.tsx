import './App.css';

import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/Layout';
import Task from '@/pages/Task';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Task />} />
          <Route path="task-list" element={<Task />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
