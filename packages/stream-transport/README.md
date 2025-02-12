# 流式传输接口配置笔记

本文总结了如何使用 Express 和 Node.js 实现流式传输接口，将文件内容以数据块（chunk）的方式逐步发送给客户端。通过这种方式，客户端可以实时接收和展示数据，实现“流式加载”的效果。

---

## 响应头设置
为了实现流式传输，需要在响应中设置以下头部信息：

- **Content-Type**  
  设置为合适的 MIME 类型（例如 `text/plain; charset=utf-8`），告知客户端响应内容的格式。

- **Transfer-Encoding**  
  设置为 `chunked`，启用分块传输（Chunked Transfer-Encoding）。这样，数据将以一块块（chunk）的形式发送，而不是一次性发送完整响应。

```js
res.setHeader("Content-Type", "text/plain; charset=utf-8");
res.setHeader("Transfer-Encoding", "chunked");
```

## 使用流式读取文件

- 采用 fs.createReadStream 实现文件的流式读取，而不是使用一次性读取整个文件的 readFile 方法
- 通过设置 highWaterMark，可以控制每次读取的最大数据块大小
- highWaterMark 只是内部缓冲区的最大容量，并不保证每次返回的 chunk 恰好为 16 字节。实际返回的数据块可能因为底层 I/O 调用或数据合并而略有不同

```js
    // 创建流式读取对象
    const readStream = createReadStream(filePath, { highWaterMark: 16 });
```

## 可以中断的流式读取
```js
  readStream.pause(); // 暂停读取
  readStream.resume(); // 恢复读取
```

## 可以使用 pipe 方法 直接将流式读取对象 连接到 响应对象

- 使用 pipe 方法 直接将流式读取对象 连接到 响应对象，会自动调用 res.end() 方法

```js
  readStream.pipe(res);
  // 所以 readStream.on("end") 中不需要 手动 调用 res.end() 方法
```
