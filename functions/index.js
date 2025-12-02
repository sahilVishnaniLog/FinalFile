import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params"; // Required for secrets in v2
import { logger } from "firebase-functions/logger";
import axios from "axios";

// Define the secret parameter for the Unsplash Access Key
const unsplashAccessKey = defineSecret("UNSPLASH_ACCESS_API_KEY");

// Main exported function: Handles GET requests for Unsplash photo search
export const getApiData = onRequest(
  {
    secrets: [unsplashAccessKey], // Bind the secret to this function
    cors: true, // Enable CORS for development (restrict in production)
    memory: "256MiB", // Memory allocation
    timeoutSeconds: 60, // Timeout limit
  },
  async (req, res) => {
    // CORS is auto-handled by 'cors: true' – no manual headers needed

    // Access the secret value
    const accessKey = unsplashAccessKey.value();

    // Extract query params with defaults
    const {
      query = "cats", // Default search term for testing
      per_page = 8, // Number of results (Unsplash max 30)
      orientation = "landscape", // Image orientation filter
    } = req.query;

    // Validate secret
    if (!accessKey) {
      logger.error("UNSPLASH_ACCESS_API_KEY secret is missing or inaccessible");
      return res
        .status(500)
        .json({ error: "UNSPLASH_ACCESS_API_KEY secret is missing" });
    }

    // Validate query param
    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ error: "Valid 'query' parameter is required" });
    }

    // Unsplash API endpoint
    const apiUrl = "https://api.unsplash.com/search/photos";

    try {
      // Log the request
      logger.info(`Fetching Unsplash images for query: "${query}"`);

      // Make the API request
      const apiResponse = await axios.get(apiUrl, {
        params: {
          query,
          per_page: parseInt(per_page, 10), // Ensure it's a number
          orientation,
        },
        headers: {
          Authorization: `Client-ID ${accessKey}`, // Secure authentication via header
        },
      });

      // Map Unsplash response structure to match client expectations
      // Unsplash returns { results: [...] }, but client expects { result: [...] }
      res.status(200).json({
        result: apiResponse.data.results || [], // Array of photo objects with id, urls, alt_description, etc.
      });
    } catch (err) {
      // Enhanced error logging
      logger.error("Unsplash API request failed", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });

      // Propagate Unsplash errors directly (e.g., 401 for invalid key, 429 for rate limit)
      if (err.response) {
        // 401 for invalid key  , 429 for rate limit

        res.status(err.response.status).json(err.response.data);
      } else {
        // Network or other errors
        res.status(500).json({ error: "Failed to fetch from Unsplash API" });
      }
    }
  }
);
