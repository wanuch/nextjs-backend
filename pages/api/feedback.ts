import path from "path";

export default function handler(
  req: any,
  res: any
) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString,
      email: email,
      text: feedbackText
    };

    // store data in the db or file
    const fs = require('fs').promises;
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFile(filePath);

    var data = [];
    try { data = JSON.parse(fileData) } catch (e) { }

    data.push(newFeedback);
    fs.writeFile(filePath, JSON.stringify(data));

    res.status(201).json({ message: "success!", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "That work!!" });
  }
}
