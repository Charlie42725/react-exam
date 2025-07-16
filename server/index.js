const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// 環境變數配置
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/exam';
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// CORS 配置
const corsOptions = {
  origin: NODE_ENV === 'development' ? true : CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
};

// 中間件
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 請求日誌中間件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});




// 連接 MongoDB (使用超時處理)
const connectToDatabase = async () => {
  try {
    // 設置連接超時
    await Promise.race([
      mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5秒超時
        connectTimeoutMS: 5000,
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
      )
    ]);
    

    console.log('✅ MongoDB 連接成功');
    console.log(`📍 數據庫: ${MONGODB_URI}`);
  } catch (err) {
    console.warn('⚠️  MongoDB 連接失敗，將使用模擬數據模式');
    console.warn(`❌ 錯誤詳情: ${err.message}`);
    console.log('💡 要使用真實數據庫，請確保 MongoDB 正在運行');
  }
};

// 初始化數據庫連接
connectToDatabase();

// 監聽 MongoDB 連接事件
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB 錯誤:', err);

});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB 連接中斷');
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB 連接已斷開');
});

// 定義內容模型
const contentSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: [true, '分類是必填項'],
    trim: true,
    minlength: [1, '分類不能為空']
  },
  title: { 
    type: String, 
    required: [true, '標題是必填項'],
    trim: true,
    minlength: [1, '標題不能為空'],
    maxlength: [200, '標題不能超過200個字符']
  },
  prompt: { 
    type: String, 
    required: [true, '提示內容是必填項'],
    trim: true,
    minlength: [1, '提示內容不能為空']
  },
  steps: [{ 
    type: String,
    trim: true
  }],
  system: { 
    type: String, 
    required: [true, '系統類型是必填項'],
    enum: {
      values: ['rd', 'enterprise'],
      message: '系統類型必須是 rd 或 enterprise'
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 內容模型索引
contentSchema.index({ category: 1, system: 1 });
contentSchema.index({ createdAt: -1 });

const Content = mongoose.model('Content', contentSchema);

// 定義分類模型
const categorySchema = new mongoose.Schema({
  value: { 
    type: String, 
    required: [true, '分類值是必填項'],
    unique: true,
    trim: true,
    minlength: [1, '分類值不能為空']
  },
  label: { 
    type: String, 
    required: [true, '分類標籤是必填項'],
    trim: true,
    minlength: [1, '分類標籤不能為空']
  },
  system: { 
    type: String, 
    required: [true, '系統類型是必填項'],
    enum: {
      values: ['rd', 'enterprise'],
      message: '系統類型必須是 rd 或 enterprise'
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 分類模型索引
categorySchema.index({ system: 1 });
categorySchema.index({ value: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);



// ============ 模擬數據結束 ============

// 輸入驗證中間件
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: '無效的ID格式'
    });
  }
  next();
};

// 統一響應格式
const sendResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

// 錯誤處理中間件
const errorHandler = (err, req, res, next) => {
  console.error('❌ 服務器錯誤:', err);

  // Mongoose 驗證錯誤
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return sendResponse(res, 400, false, '數據驗證失敗', { errors: messages });
  }

  // Mongoose 重複鍵錯誤
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return sendResponse(res, 400, false, `${field} 已存在`);
  }

  // Mongoose 轉換錯誤
  if (err.name === 'CastError') {
    return sendResponse(res, 400, false, '無效的ID格式');
  }

  // 預設錯誤
  const statusCode = err.statusCode || 500;
  const message = NODE_ENV === 'development' ? err.message : '服務器內部錯誤';
  
  sendResponse(res, statusCode, false, message);
};

// API 路由
// 健康檢查
app.get('/api/health', (req, res) => {
  sendResponse(res, 200, true, '服務正常運行', {
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    database: mongoose.connection.readyState === 1 ? '已連接' : '未連接'
  });
});

// 內容相關路由
// 獲取所有內容
app.get('/api/contents', async (req, res, next) => {
  try {
    const { category, system, page = 1, limit = 50 } = req.query;
    

    // 構建查詢條件
    const query = {};
    if (category) query.category = category;
    if (system) query.system = system;
    
    // 分頁參數
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;
    
    // 執行查詢
    const [contents, total] = await Promise.all([
      Content.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Content.countDocuments(query)
    ]);
    
    sendResponse(res, 200, true, '獲取內容成功', {
      contents,
      pagination: {
        current: pageNum,
        total: Math.ceil(total / limitNum),
        count: contents.length,
        totalCount: total
      }
    });
  } catch (error) {
    next(error);
  }
});

// 創建新內容
app.post('/api/contents', async (req, res, next) => {
  try {
    const content = new Content(req.body);
    const savedContent = await content.save();
    
    sendResponse(res, 201, true, '內容創建成功', savedContent);
  } catch (error) {
    next(error);
  }
});

// 獲取單個內容
app.get('/api/contents/:id', validateObjectId, async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return sendResponse(res, 404, false, '內容不存在');
    }
    
    sendResponse(res, 200, true, '獲取內容成功', content);
  } catch (error) {
    next(error);
  }
});

// 更新內容
app.put('/api/contents/:id', validateObjectId, async (req, res, next) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!content) {
      return sendResponse(res, 404, false, '內容不存在');
    }
    
    sendResponse(res, 200, true, '內容更新成功', content);
  } catch (error) {
    next(error);
  }
});

// 刪除內容
app.delete('/api/contents/:id', validateObjectId, async (req, res, next) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    
    if (!content) {
      return sendResponse(res, 404, false, '內容不存在');
    }
    
    sendResponse(res, 200, true, '內容刪除成功', { deletedContent: content });
  } catch (error) {
    next(error);
  }
});

// 分類相關路由
// 獲取所有分類
app.get('/api/categories', async (req, res, next) => {
  try {
    const { system } = req.query;
    

    // 使用真實數據庫
    const query = system ? { system } : {};
    const categories = await Category.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    sendResponse(res, 200, true, '獲取分類成功', categories);
  } catch (error) {
    next(error);
  }
});

// 創建新分類
app.post('/api/categories', async (req, res, next) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    
    sendResponse(res, 201, true, '分類創建成功', savedCategory);
  } catch (error) {
    next(error);
  }
});

// 獲取單個分類
app.get('/api/categories/:id', validateObjectId, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return sendResponse(res, 404, false, '分類不存在');
    }
    
    sendResponse(res, 200, true, '獲取分類成功', category);
  } catch (error) {
    next(error);
  }
});

// 更新分類
app.put('/api/categories/:id', validateObjectId, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!category) {
      return sendResponse(res, 404, false, '分類不存在');
    }
    
    sendResponse(res, 200, true, '分類更新成功', category);
  } catch (error) {
    next(error);
  }
});

// 刪除分類
app.delete('/api/categories/:id', validateObjectId, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return sendResponse(res, 404, false, '分類不存在');
    }
    
    sendResponse(res, 200, true, '分類刪除成功', { deletedCategory: category });
  } catch (error) {
    next(error);
  }
});

// 404 處理
app.use('*', (req, res) => {
  sendResponse(res, 404, false, '路由不存在');
});

// 錯誤處理中間件
app.use(errorHandler);

// 優雅關閉
process.on('SIGTERM', () => {
  console.log('🔄 收到 SIGTERM 信號，正在關閉服務器...');
  mongoose.connection.close(() => {
    console.log('✅ MongoDB 連接已關閉');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🔄 收到 SIGINT 信號，正在關閉服務器...');
  mongoose.connection.close(() => {
    console.log('✅ MongoDB 連接已關閉');
    process.exit(0);
  });
});

// 啟動服務器
app.listen(PORT, () => {
  console.log('🚀 服務器啟動成功');
  console.log(`📍 端口: ${PORT}`);
  console.log(`🌍 環境: ${NODE_ENV}`);
  console.log(`🔗 API地址: http://localhost:${PORT}/api`);
  console.log(`💾 數據庫: ${MONGODB_URI}`);
});

module.exports = app;