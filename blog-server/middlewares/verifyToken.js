const admin = require("../config/firebaseAdmin");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader)
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];
  // console.log(token)
  try {
    const decodedUser = await admin.auth().verifyIdToken(token);
    req.user = decodedUser; // attach decoded user data to request
    // console.log(decodedUser)
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).send({ message: "Forbidden: Invalid token" });
  }
};

module.exports = verifyToken;
