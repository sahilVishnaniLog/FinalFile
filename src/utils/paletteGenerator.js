import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // NOTE the api key is stored in the environment variables

// creating a ew client instance of google generative AI
const genAI = new GoogleGenAI({ apiKey: API_KEY }); // NOTE
// image => base
const convertImageToBase64 = async (imageURL) => {
  try {
    // first we fetch the image
    const response = await fetch(imageURL);
    if (!response.ok) {
      throw new Error(
        `failed to fetch the image from the URL,
        ${response.statusText}`
      );
    }
    // convert  to blob
    const blob = await response.blob();
    const mimeType = blob.type; // get the mime type of the image

    // blob=> base64String
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64, mimeType);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("error  converting image to base64: ", err.message);
    throw err;
  }
};

// defining the structure of the data to be generated
const colorObjectSchema = {
  type: "OBJECT",
  properties: {
    main: {
      type: "STRING",
      description: "The Dominant shade",
    },
    light: {
      type: "STRING",
      description:
        "The lighter shade, pastel version for hover states/backgrounds",
    },
    dark: {
      type: "STRING",
      description: "The darker shade, for active states",
    },
    contrast: {
      type: "STRING",
      description:
        "The contrasting color for text readability  over the main  color keep betwen white and black and its shades",
    },
    required: ["main", "light", "dark", "contrast"],
  },
};
const schema = {
  type: "OBJECT",
  properties: {
    primary: colorObjectSchema,
    secondary: colorObjectSchema,
    success: colorObjectSchema,
    info: colorObjectSchema,
    warning: colorObjectSchema,
    error: colorObjectSchema,

    required: ["primary", "secondary", "success", "info", "warning", "error"],
  },
};

// writing the function to make the API call // API_GET_REQUESTS_GOOGLE_GENERATIVE_AI
const generatePalette = async (imageURL) => {
  try {
    const { base64, mimeType } = await convertImageToBase64(imageURL);

    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Analyze the image and gerate a 6 coloṙplaette fitting MUI guidelines. ",
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64,
              },
            },
          ],
        },
      ],
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Failed to generate palette");
  } catch (err) {
    console.error("GenAI Palette Error:", err);
    throw new Error("Failed to generate palette");
  }
};
// calling the function to generate the palette

export default generatePalette;
