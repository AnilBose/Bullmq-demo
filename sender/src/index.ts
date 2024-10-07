import express from "express";
import { Request, Response } from "express";
import { Queue, Worker, Job, QueueOptions, QueueEvents } from "bullmq";

const app = express();
app.use(express.json());
const port = 3000;
const queueOptions: QueueOptions = {
  connection: {
    host: "localhost",
    port: 6379,
  },
};

// Create a BullMQ queue
const myQueue = new Queue("myQueue", queueOptions);
// Create a QueueEvents listener
const queueEvents = new QueueEvents("myQueue", queueOptions);
queueEvents.on("completed", (job) => {
  console.log(`Job completed: ${job.jobId}, returned data: ${job.returnvalue}`);
  // You can handle the returned data here
});

// Listen for "failed" event
queueEvents.on("failed", (job) => {
  console.log(`Job failed: ${job.jobId}, error: ${job.failedReason}`);
  // You can handle the error here
});
// Add a job to the queue
app.post("/addJob", async (req: Request, res: Response) => {
  const data = req.body;
  console.log("data:", data);
  await myQueue.add("myJob", data);
  res.send("Job added to queue");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
