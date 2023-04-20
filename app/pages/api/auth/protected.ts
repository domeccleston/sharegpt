export default async function protected(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token)

  try {
    res.status(200).json({ message: "This is protected data." });
  } catch (error) {
    res.status(500).json({ message: "Unauthorized" });
  }
}
