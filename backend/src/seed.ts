import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import prisma from './lib/prisma';
import { User } from './models/models';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/values_vruksha';

async function main() {
  // Connect to MongoDB
  console.log('🔄 Connecting to MongoDB for seeding...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB.');

  // 1. Seed Admin User in MongoDB
  const adminEmail = 'admin@valuesvruksha.in';
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();
    console.log('✅ MongoDB Admin user password reset successfully.');
  } else {
    const admin = new User({
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    });
    await admin.save();
    console.log('✅ MongoDB Admin user seeded:', adminEmail);
  }

  // 2. Seed default services in SQLite
  const services = [
    { title: 'Accounting & Bookkeeping', description: 'Comprehensive bookkeeping, financial statements, bank reconciliation, MIS reporting, accounts finalization, and accounting outsourcing services.', icon: 'Calculator', features: JSON.stringify(['Bookkeeping & Accounting', 'Financial Statements', 'Bank Reconciliation', 'MIS Reporting', 'Accounts Finalization', 'Accounting Outsourcing']) },
    { title: 'GST Services', description: 'Complete GST compliance from registration to litigation support, including return filing, audit, assessments, and E-invoicing.', icon: 'Receipt', features: JSON.stringify(['GST Registration', 'GST Return Filing', 'GST Audit & Annual Return', 'GST Assessments & Litigation Support', 'GST Notice Replies', 'Refund Processing', 'E-Invoicing', 'E-Way Bill']) },
    { title: 'Income Tax Services', description: 'Comprehensive income tax compliance including return filing, tax planning, TDS, assessments, appeals, and PAN/TAN services.', icon: 'Landmark', features: JSON.stringify(['Income Tax Return Filing', 'Tax Planning', 'TDS Compliance', 'Income Tax Assessments', 'Appeals & Notice Handling', 'PAN & TAN Services']) },
    { title: 'Company & Secretarial Services', description: 'End-to-end company formation, ROC compliance, annual filings, and corporate governance advisory.', icon: 'Building2', features: JSON.stringify(['Company Incorporation', 'LLP Registration', 'ROC Compliance', 'Annual Filings', 'Director KYC', 'Corporate Governance Advisory']) },
    { title: 'Payroll & HR Compliance', description: 'Complete payroll processing, PF & ESI compliance, professional tax, Form 16 generation, and labour law compliance.', icon: 'Users', features: JSON.stringify(['Payroll Processing', 'PF & ESI Compliance', 'Professional Tax', 'Form 16 Generation', 'Labour Law Compliance']) },
    { title: 'Virtual CFO Services', description: 'Strategic financial leadership including budgeting, cash flow management, investor reporting, and business expansion planning.', icon: 'Briefcase', features: JSON.stringify(['Financial Planning & Budgeting', 'Cash Flow Management', 'Business Performance Review', 'MIS Dashboard Reporting', 'Profitability Analysis', 'Cost Optimization', 'Working Capital Management', 'Investor & Bank Reporting', 'Fund Raising Assistance']) },
  ];

  for (const s of services) {
    await prisma.service.upsert({ where: { id: services.indexOf(s) + 1 }, update: {}, create: s }).catch(async () => {
      await prisma.service.create({ data: s });
    });
  }
  console.log('✅ Services seeded in SQLite');

  // 3. Seed default courses in SQLite
  const courses = [
    'Certified Accounting Professional', 'GST Practical Training', 'Income Tax Practical Training',
    'Tally Prime with GST', 'MS Excel for Finance', 'Data Science & Artificial Intelligence',
    'Machine Learning with Python', 'Entrepreneurship Training Program', 'Payroll Management',
    'Banking & Finance', 'Stock Market & Investment Basics', 'Employability Skills',
    'Soft Skills & Communication', 'Interview Preparation', 'Corporate Readiness Programs'
  ];

  for (const title of courses) {
    const existing = await prisma.course.findFirst({ where: { title } });
    if (!existing) {
      await prisma.course.create({ data: { title, description: `Professional training program: ${title}` } });
    }
  }
  console.log('✅ Courses seeded in SQLite');
  
  // Close MongoDB connection
  await mongoose.disconnect();
  console.log('✅ MongoDB connection closed.');
}

main()
  .then(() => { console.log('\n✅ Seed completed successfully!\n'); process.exit(0); })
  .catch((e) => { console.error('❌ Seed error:', e); process.exit(1); });

