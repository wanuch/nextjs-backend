import path from "path";

function buildFilePath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

async function getFileData(fs: any, filePath: any) {
  const fileData = await fs.readFile(filePath);
  return fileData;
}

export default async function handler(
  req: any,
  res: any
) {
  const fs = require('fs/promises');

  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date(),
      email: email,
      text: feedbackText
    };

    // store data in the db or file
    const filePath = buildFilePath();
    const fileData = await getFileData(fs, filePath);
    const data = JSON.parse(fileData);

    data.push(newFeedback);
    fs.writeFile(filePath, JSON.stringify(data));

    res.status(201).json({ message: "success!", feedback: newFeedback });
  } else {
    const filePath = buildFilePath();
    const fileData = await getFileData(fs, filePath);
    const data = JSON.parse(fileData);
    res.status(200).json({ feedback: data });
  }
}
