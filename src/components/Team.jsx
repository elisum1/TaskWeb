import React from 'react';
import { motion } from 'framer-motion';

const Team = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen font-poppins"
    >
      <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">Team</h1>
      <p className="text-lg text-gray-600 text-center">Meet your team members:</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 p-6 rounded-md shadow-md border border-gray-300"
        >
          <h3 className="text-xl font-medium text-gray-800">Team Member 1</h3>
          <p className="text-gray-600">Role: Developer</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 p-6 rounded-md shadow-md border border-gray-300"
        >
          <h3 className="text-xl font-medium text-gray-800">Team Member 2</h3>
          <p className="text-gray-600">Role: Designer</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Team;
