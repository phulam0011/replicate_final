// import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "36ee57e4ed7b43f7917107a8cf380a1f7ee5941c7e8a57762b6ebc9b2037ea8e",
        input: { input_text: req.body.input},
      }),
    });
    console.log(response);

    if (response.status !== 201) {
      const error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }

    const prediction = await response.json();
    console.log(prediction);
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: 'Internal Server Error' }));
  }
}
