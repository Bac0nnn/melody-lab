# API 接口文档 — Melody Lab

## 基础信息
- **Base URL:** `https://bac0nnn.github.io/melody-lab`（部署后替换）
- **数据格式:** JSON
- **编码:** UTF-8

---

## 1. GET /api/chords — 和弦列表

### 请求示例
```
GET https://bac0nnn.github.io/melody-lab/api/chords
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

### 支持的 7 种和弦
| ID | 符号 | 名称 | 音程 |
|----|------|------|------|
| 0 | Maj | 大三和弦 | 根音、大三度、纯五度 |
| 1 | min | 小三和弦 | 根音、小三度、纯五度 |
| 2 | 7 | 属七和弦 | 大三和弦 + 小七度 |
| 3 | Maj7 | 大七和弦 | 大三和弦 + 大七度 |
| 4 | min7 | 小七和弦 | 小三和弦 + 小七度 |
| 5 | dim | 减三和弦 | 根音、小三度、减五度 |
| 6 | sus4 | 挂留四和弦 | 根音、纯四度、纯五度 |

---

## 2. GET /api/scales — 音阶列表

### 请求示例
```
GET https://bac0nnn.github.io/melody-lab/api/scales
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

---

## 3. GET /api/quiz — 随机乐理测验

### 请求示例
```
GET https://bac0nnn.github.io/melody-lab/api/quiz
```

### 响应格式
```json
{
  "question": "C大调音阶中第三个音是什么？",
  "options": ["E", "D", "F", "G"],
  "answer": 0
}
```

---

## 错误处理
```json
{
  "error": "Internal Server Error",
  "status": 500
}
```

## 测试方式
1. **浏览器直接访问**地址栏
2. **curl：** `curl https://bac0nnn.github.io/melody-lab/api/chords`
3. **Postman** 导入 URL 测试

