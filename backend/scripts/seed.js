const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const Task = require('../models/Task');

dotenv.config();

const employeesData = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Design',
    role: 'UX Designer',
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
  },
  {
    name: 'David Kim',
    email: 'david.kim@company.com',
    department: 'Engineering',
    role: 'Full Stack Developer',
  },
  {
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    department: 'HR',
    role: 'HR Specialist',
  },
  {
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    department: 'Engineering',
    role: 'DevOps Engineer',
  },
  {
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    department: 'Sales',
    role: 'Sales Manager',
  },
  {
    name: 'Robert Brown',
    email: 'robert.brown@company.com',
    department: 'Finance',
    role: 'Financial Analyst',
  },
  {
    name: 'Jennifer Lee',
    email: 'jennifer.lee@company.com',
    department: 'Design',
    role: 'UI Designer',
  },
  {
    name: 'Christopher Taylor',
    email: 'christopher.taylor@company.com',
    department: 'Engineering',
    role: 'Backend Developer',
  },
  {
    name: 'Amanda White',
    email: 'amanda.white@company.com',
    department: 'Marketing',
    role: 'Content Writer',
  },
  {
    name: 'Daniel Martinez',
    email: 'daniel.martinez@company.com',
    department: 'Engineering',
    role: 'Frontend Developer',
  },
  {
    name: 'Jessica Anderson',
    email: 'jessica.anderson@company.com',
    department: 'HR',
    role: 'Recruiter',
  },
  {
    name: 'Matthew Thomas',
    email: 'matthew.thomas@company.com',
    department: 'Sales',
    role: 'Sales Representative',
  },
  {
    name: 'Olivia Jackson',
    email: 'olivia.jackson@company.com',
    department: 'Finance',
    role: 'Accountant',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Employee.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Insert employees
    const employees = await Employee.insertMany(employeesData);
    console.log(`Inserted ${employees.length} employees`);

    // Create tasks
    const tasksData = [
      {
        title: 'Implement user authentication',
        description: 'Set up JWT-based authentication system with login and registration',
        status: 'in-progress',
        priority: 'high',
        employeeId: employees[0]._id,
        employeeName: employees[0].name,
        dueDate: '2025-01-20',
        createdAt: '2025-01-05',
        updatedAt: '2025-01-10',
      },
      {
        title: 'Design new landing page',
        description: 'Create wireframes and mockups for the updated landing page',
        status: 'completed',
        priority: 'medium',
        employeeId: employees[1]._id,
        employeeName: employees[1].name,
        dueDate: '2025-01-15',
        createdAt: '2025-01-02',
        updatedAt: '2025-01-12',
      },
      {
        title: 'Q1 Marketing Campaign',
        description: 'Plan and execute social media campaign for Q1 product launch',
        status: 'pending',
        priority: 'high',
        employeeId: employees[2]._id,
        employeeName: employees[2].name,
        dueDate: '2025-01-25',
        createdAt: '2025-01-08',
        updatedAt: '2025-01-08',
      },
      {
        title: 'API Documentation',
        description: 'Write comprehensive API documentation for v2.0',
        status: 'in-progress',
        priority: 'medium',
        employeeId: employees[3]._id,
        employeeName: employees[3].name,
        dueDate: '2025-01-22',
        createdAt: '2025-01-06',
        updatedAt: '2025-01-11',
      },
      {
        title: 'Employee Onboarding Process',
        description: 'Review and update the new employee onboarding checklist',
        status: 'completed',
        priority: 'low',
        employeeId: employees[4]._id,
        employeeName: employees[4].name,
        dueDate: '2025-01-18',
        createdAt: '2025-01-04',
        updatedAt: '2025-01-16',
      },
      {
        title: 'Database Migration',
        description: 'Migrate legacy data to new database schema',
        status: 'pending',
        priority: 'high',
        employeeId: employees[0]._id,
        employeeName: employees[0].name,
        dueDate: '2025-01-30',
        createdAt: '2025-01-09',
        updatedAt: '2025-01-09',
      },
      {
        title: 'Mobile App Prototype',
        description: 'Create interactive prototype for mobile application',
        status: 'in-progress',
        priority: 'high',
        employeeId: employees[1]._id,
        employeeName: employees[1].name,
        dueDate: '2025-01-28',
        createdAt: '2025-01-07',
        updatedAt: '2025-01-12',
      },
      {
        title: 'Performance Testing',
        description: 'Conduct load testing and performance optimization',
        status: 'completed',
        priority: 'medium',
        employeeId: employees[3]._id,
        employeeName: employees[3].name,
        dueDate: '2025-01-14',
        createdAt: '2025-01-03',
        updatedAt: '2025-01-13',
      },
      {
        title: 'Setup CI/CD Pipeline',
        description: 'Configure automated deployment pipeline for production',
        status: 'in-progress',
        priority: 'high',
        employeeId: employees[5]._id,
        employeeName: employees[5].name,
        dueDate: '2025-01-26',
        createdAt: '2025-01-10',
        updatedAt: '2025-01-15',
      },
      {
        title: 'Q1 Sales Target Review',
        description: 'Analyze Q1 sales performance and set Q2 targets',
        status: 'pending',
        priority: 'high',
        employeeId: employees[6]._id,
        employeeName: employees[6].name,
        dueDate: '2025-01-27',
        createdAt: '2025-01-11',
        updatedAt: '2025-01-11',
      },
      {
        title: 'Budget Analysis Report',
        description: 'Prepare monthly budget analysis and variance report',
        status: 'completed',
        priority: 'medium',
        employeeId: employees[7]._id,
        employeeName: employees[7].name,
        dueDate: '2025-01-16',
        createdAt: '2025-01-05',
        updatedAt: '2025-01-15',
      },
      {
        title: 'Design System Update',
        description: 'Update component library with new design tokens',
        status: 'in-progress',
        priority: 'medium',
        employeeId: employees[8]._id,
        employeeName: employees[8].name,
        dueDate: '2025-01-24',
        createdAt: '2025-01-09',
        updatedAt: '2025-01-14',
      },
      {
        title: 'Microservices Refactoring',
        description: 'Refactor monolithic service into microservices architecture',
        status: 'pending',
        priority: 'high',
        employeeId: employees[9]._id,
        employeeName: employees[9].name,
        dueDate: '2025-01-29',
        createdAt: '2025-01-12',
        updatedAt: '2025-01-12',
      },
      {
        title: 'Blog Post Series',
        description: 'Write 5-part blog series on product features',
        status: 'in-progress',
        priority: 'low',
        employeeId: employees[10]._id,
        employeeName: employees[10].name,
        dueDate: '2025-01-31',
        createdAt: '2025-01-08',
        updatedAt: '2025-01-13',
      },
      {
        title: 'React Component Library',
        description: 'Build reusable React components for frontend team',
        status: 'completed',
        priority: 'high',
        employeeId: employees[11]._id,
        employeeName: employees[11].name,
        dueDate: '2025-01-17',
        createdAt: '2025-01-04',
        updatedAt: '2025-01-16',
      },
      {
        title: 'Campus Recruitment Drive',
        description: 'Organize and conduct campus recruitment at universities',
        status: 'pending',
        priority: 'medium',
        employeeId: employees[12]._id,
        employeeName: employees[12].name,
        dueDate: '2025-02-05',
        createdAt: '2025-01-13',
        updatedAt: '2025-01-13',
      },
      {
        title: 'Client Presentation',
        description: 'Prepare and deliver quarterly business review to key clients',
        status: 'in-progress',
        priority: 'high',
        employeeId: employees[13]._id,
        employeeName: employees[13].name,
        dueDate: '2025-01-23',
        createdAt: '2025-01-07',
        updatedAt: '2025-01-14',
      },
      {
        title: 'Tax Filing Preparation',
        description: 'Prepare all documents and forms for annual tax filing',
        status: 'pending',
        priority: 'high',
        employeeId: employees[14]._id,
        employeeName: employees[14].name,
        dueDate: '2025-02-01',
        createdAt: '2025-01-10',
        updatedAt: '2025-01-10',
      },
    ];

    const tasks = await Task.insertMany(tasksData);
    console.log(`Inserted ${tasks.length} tasks`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

