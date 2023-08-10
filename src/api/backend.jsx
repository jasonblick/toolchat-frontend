// src/api/backend.jsx

import axios from "axios";

const baseURL = "http://54.183.125.140:80";

export const findSimilarTextChunks = async (token, textQuery, documentId) => {
  try {
    const response = await axios.post(
      `${baseURL}/findSimilarTextChunks`, 
      { text_query: textQuery, document_id: documentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error finding similar text chunks:", error);
    return { error: error.message };
  }
};

export const invokeDocQA = async (token, model, message, apiKey, chunks) => {
  try {
    const response = await axios.post(
      `${baseURL}/invokeDocQA`,
      { model, message, api_key: apiKey, chunks: chunks },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error invoking Lambda function:", error);
    return { error: error.message };
  }
};

