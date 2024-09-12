import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MyTasks = () => {
  const [todayTasks, setTodayTasks] = useState([
    { title: 'Task 1', description: 'This is the description of task 1.' },
    { title: 'Task 2', description: 'This is the description of task 2.' },
  ]);

  const [weekTasks, setWeekTasks] = useState([
    { title: 'Task 1', description: 'This is the description of task 1 for this week.' },
  ]);

  const [nextWeekTasks, setNextWeekTasks] = useState([
    { title: 'Task 1', description: 'This is the description of task 1 for next week.' },
  ]);

  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleAddTask = (setTasks, tasks) => {
    if (newTask.title && newTask.description) {
      setTasks([...tasks, newTask]);
      setNewTask({ title: '', description: '' });
    }
  };

  return (
    <div className="min-h-screen font-poppins text-gray-900 bg-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-left text-gray-800">
          My Tasks
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Today tasks block */}
          <motion.div
            className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm flex flex-col"
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Today</h2>
            <div className="space-y-2">
              {todayTasks.map((task, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 p-3 rounded-lg border border-gray-300"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* This Week tasks block */}
          <motion.div
            className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm flex flex-col"
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-lg font-semibold mb-3 text-gray-800">This Week</h2>
            <div className="space-y-2">
              {weekTasks.map((task, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 p-3 rounded-lg border border-gray-300"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Next Week tasks block */}
          <motion.div
            className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm flex flex-col"
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Next Week</h2>
            <div className="space-y-2">
              {nextWeekTasks.map((task, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 p-3 rounded-lg border border-gray-300"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
