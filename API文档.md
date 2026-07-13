# API 接口文档 — Melody Lab

## 基础信息
- **Base URL:** `http://localhost:3000`（部署后替换为线上 URL）
- **数据格式:** JSON
- **编码:** UTF-8

---

## 1. GET /api/chords — 和弦列表

### 请求示例
```
GET http://localhost:3000/api/chords
```

### 响应格式
```json
{
  "count": 7,
  "data": [
    {
      "id": 0,
      "name": "大三和弦",
      "symbol": "Maj",
      "intervals": [0, 4, 7],
      "noteCount": 3,
      "description": "明亮、稳定、愉悦"
    }
  ]
}
```

### 字段说明
| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 和弦索引 |
| name | string | 和弦中文名称 |
| symbol | string | 和弦符号 |
| intervals | number[] | 组成音的半音偏移（以根音为 0） |
| noteCount | number | 和弦包含的音数 |
| description | string | 和弦听感描述 |

---

## 2. GET /api/scales — 音阶列表

### 请求示例
```
GET http://localhost:3000/api/scales
```

### 响应格式
```json
{
  "count": 6,
  "data": [
    {
      "id": 0,
      "name": "大调音阶",
      "intervals": [0, 2, 4, 5, 7, 9, 11],
      "intervalCount": 7,
      "description": "明亮的常用音阶"
    }
  ]
}
```

### 字段说明
| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 音阶索引 |
| name | string | 音阶中文名称 |
| intervals | number[] | 音阶组成音的半音偏移 |
| intervalCount | number | 音阶包含的音数 |
| description | string | 音阶听感描述 |

---

## 3. GET /api/quiz — 随机乐理测验

### 请求示例
```
GET http://localhost:3000/api/quiz
```

### 响应格式
```json
{
  "question": "C大调音阶中第三个音是什么？",
  "options": ["E", "D", "F", "G"],
  "answer": 0
}
```

### 字段说明
| 字段 | 类型 | 说明 |
|------|------|------|
| question | string | 题目内容 |
| options | string[] | 四个选项 |
| answer | number | 正确答案的选项索引（0-3） |

---

## 错误处理
所有 API 在正常情况下都会返回 200。如果出现服务器错误，返回：
```json
{
  "error": "Internal Server Error",
  "status": 500
}
```

## 测试方式
1. **浏览器直接访问**：在地址栏输入 URL 即可看到 JSON 响应
2. **curl 命令行**：`curl http://localhost:3000/api/chords`
3. **Postman**：导入上述 URL 即可测试
