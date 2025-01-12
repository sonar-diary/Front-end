const DALLE_API_ENDPOINT = process.env.REACT_APP_DALLE_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export async function generateImage(drawingBase64, theme) {
  try {
    const response = await fetch(DALLE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Transform this drawing into ${theme.style}, maintain original composition`,
        image: drawingBase64,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      throw new Error("이미지 생성 실패");
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error("Dalle API 에러:", error);
    throw error;
  }
}
