import { Worker, Job } from "bullmq";

// Define Redis connection options
const connection = {
  host: "localhost",
  port: 6379, // Redis default port
};

// Connect to the BullMQ queue with explicit connection options
const worker = new Worker(
  "myQueue",
  async (job: Job) => {
    console.log("Processing job with data:", job.data);
    console.log("JobId:", job.id);
    // Perform your task here
    // throw new Error("Something went wrong");
    return "Job completed for jobId: " + job.id;
  },
  { connection }
); // Explicitly pass the connection option here
