const mongoose = require('mongoose');
require('dotenv').config();

const categorySchema = new mongoose.Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  system: { type: String, required: true }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

const initCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/exam');
    console.log('Connected to MongoDB');

    // 刪除所有索引
    await Category.collection.dropIndexes();
    console.log('Dropped all indexes');

    // 清除現有分類
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // 研發補助系統分類
    const rdCategories = [
      {
        value: 'rd-course-links',
        label: '課程連結',
        system: 'rd'
      },
      {
        value: 'rd-ai-math',
        label: 'AI怎麼應用在數學',
        system: 'rd'
      },
      {
        value: 'rd-exam-structure',
        label: '會考架構分析',
        system: 'rd'
      },
      {
        value: 'rd-prediction',
        label: '預測考題及個人分析報告',
        system: 'rd'
      }
    ];

    // 企業內訓系統分類
    const corpCategories = [
      {
        value: 'corp-course-links',
        label: '課程連結',
        system: 'corp'
      },
      {
        value: 'corp-ai-english',
        label: 'AI怎麼應用在英文',
        system: 'corp'
      },
      {
        value: 'corp-exam-structure',
        label: '考試架構分析',
        system: 'corp'
      },
      {
        value: 'corp-prediction',
        label: '預測考題及個人分析報告',
        system: 'corp'
      }
    ];

    // 插入分類
    await Category.insertMany([...rdCategories, ...corpCategories]);
    console.log('Categories initialized successfully');

    // 顯示創建的分類
    const categories = await Category.find();
    console.log('Created categories:', categories);

    process.exit(0);
  } catch (error) {
    console.error('Error initializing categories:', error);
    process.exit(1);
  }
};

initCategories(); 