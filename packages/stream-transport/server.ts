import express, { type Request, type Response } from "express";
import path from "path";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "url";

// 在 ES 模块中计算 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// 解析 JSON 请求体（如果需要）
app.use(express.json());

// 静态文件服务：所有位于 public 文件夹下的文件都会被作为静态资源提供
app.use(express.static(path.join(__dirname, "public")));

// 流式传输接口
app.post("/stream", async (req: Request, res: Response) => {
  // 设置响应头，启用分块传输（Chunked Transfer-Encoding）
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  const filePath = path.join(__dirname, "tsconfig.json");
  const readStream = createReadStream(filePath, { highWaterMark: 16 });

  // 将读取流直接 pipe 到响应中
  readStream.pipe(res);

  // readStream.on("data", (chunk) => {
  //   res.write(chunk);
  // });

  // 你可以选择在流结束后在服务器端做额外操作（例如记录日志）
  readStream.on("end", () => {
    console.log("Stream ended.");
    // 不再需要 手动 调用 res.end()
    // readStream.pipe(res) === readStream.pipe(res,{ end: true })
    // 即会自动调用 res.end()
    // res.end();
  });

  readStream.on("error", (err) => {
    console.error(err);
    res.status(500).end("Error reading file.");
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Streaming server running on port ${port}`);
});
