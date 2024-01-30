const apiUrl = "https://your-backend-api-url";

export const sendEmailVerification = async (email, univName) => {
  try {
    const response = await fetch(`${apiUrl}/member/sendemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "email@example.com",
        univName: "OOO대학교",
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw new Error(`API 호출 중 오류: ${error.message}`);
  }
};
