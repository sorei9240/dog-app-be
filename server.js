const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post("/predict", async (req, res) => {
  try {
    const response = await fetch(
      "https://huggingface.co/spaces/Sorei9240/dog-breed-id-model/api/predict",
      {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: req.body,
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching prediction" });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
