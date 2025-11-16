import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/logger"; // Fixed
import axios from "axios";

export const getApiData = onRequest(
  {
    secrets: ["UNSPLASH_API_KEY"],
    cors: ["http://localhost:5173"],
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Max-Age", "3600");
      return res.status(204).send("");
    }

    const accessKey = process.env.UNSPLASH_API_KEY; // reference to sectretive ( Access key) saved in firebase lambda-function
    const {
      query = "cats",
      per_page = 8,
      orientation = "landscape",
    } = req.query;

    if (!accessKey) {
      logger.error("UNSPLASH_API_KEY secret is missing");
      return res.status(500).json({ error: "Server misconfigured" }); // Fixed
    }

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const apiUrl = "https://api.unsplash.com/search/photos";

    try {
      logger.info(`Fetching Unsplash images for: "${query}"`);
      const apiResponse = await axios.get(apiUrl, {
        params: {
          query,
          per_page,
          orientation,
          client_id: accessKey,
        },
      });
      res.status(200).json(apiResponse.data);
    } catch (error) {
      logger.error("Unsplash API failed", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      res.status(500).json({ error: "Failed to fetch images" }); // Fixed
    }
  }
);
