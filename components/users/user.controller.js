exports.registerUser = async (req, res, next) => {
  try {
    res.status(200).json({ message: "login success" });
  } catch (error) {
    console.error(error);
  }
};