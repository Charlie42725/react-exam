const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// 中間件
app.use(cors());
app.use(express.json());

// 連接 MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/exam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// 定義內容模型
const contentSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  prompt: { type: String, required: true },
  steps: [{ type: String }],
  system: { type: String, required: true }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

// 定義分類模型
const categorySchema = new mongoose.Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  system: { type: String, required: true }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// API 路由
// 獲取所有內容
app.get('/api/contents', async (req, res) => {
  try {
    console.log('GET /api/contents - Query:', req.query);
    const { category, system } = req.query;
    const query = {};
    if (category) query.category = category;
    if (system) query.system = system;
    console.log('MongoDB query:', query);
    
    const contents = await Content.find(query);
    console.log('Found contents:', contents);
    
    res.json(contents);
  } catch (error) {
    console.error('Error fetching contents:', error);
    res.status(500).json({ 
      message: 'Error fetching contents',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 創建新內容
app.post('/api/contents', async (req, res) => {
  try {
    console.log('POST /api/contents - Body:', req.body);
    const content = new Content(req.body);
    const newContent = await content.save();
    console.log('Created content:', newContent);
    res.status(201).json(newContent);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(400).json({ 
      message: 'Error creating content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 更新內容
app.put('/api/contents/:id', async (req, res) => {
  try {
    console.log('PUT /api/contents/:id - ID:', req.params.id);
    console.log('PUT /api/contents/:id - Body:', req.body);
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    console.log('Updated content:', content);
    res.json(content);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(400).json({ 
      message: 'Error updating content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 刪除內容
app.delete('/api/contents/:id', async (req, res) => {
  try {
    console.log('DELETE /api/contents/:id - ID:', req.params.id);
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    console.log('Deleted content:', content);
    res.json({ message: 'Content deleted' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ 
      message: 'Error deleting content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 獲取所有分類
app.get('/api/categories', async (req, res) => {
  try {
    console.log('GET /api/categories - Query:', req.query);
    const { system } = req.query;
    const query = system ? { system } : {};
    console.log('MongoDB query:', query);
    
    const categories = await Category.find(query);
    console.log('Found categories:', categories);
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      message: 'Error fetching categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 創建新分類
app.post('/api/categories', async (req, res) => {
  try {
    console.log('POST /api/categories - Body:', req.body);
    const category = new Category(req.body);
    const newCategory = await category.save();
    console.log('Created category:', newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ 
      message: 'Error creating category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 更新分類
app.put('/api/categories/:id', async (req, res) => {
  try {
    console.log('PUT /api/categories/:id - ID:', req.params.id);
    console.log('PUT /api/categories/:id - Body:', req.body);
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    console.log('Updated category:', category);
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ 
      message: 'Error updating category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 刪除分類
app.delete('/api/categories/:id', async (req, res) => {
  try {
    console.log('DELETE /api/categories/:id - ID:', req.params.id);
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    console.log('Deleted category:', category);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ 
      message: 'Error deleting category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('MongoDB URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/exam');
}); 