import axios from "axios";

export async function getImagesFn(token: string) {
  try {
    const res = await axios.get<any>("http://localhost:8000/images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
