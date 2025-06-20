const saveUser = (usersCollection) => async (req, res) => {
  const { uid, email, name, photoURL, phone, address } = req.body;

  if (!uid || !email || !name) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const existing = await usersCollection.findOne({ uid });

    if (existing) {
      return res.status(200).send({ message: "User already exists" });
    }

    const userDoc = { uid, email, name, photoURL, phone, address };
    await usersCollection.insertOne(userDoc);

    res.status(201).send({ message: "User created successfully", user: userDoc });
  } catch (error) {
    res.status(500).send({ message: "Error saving user", error: error.message });
  }
};

const getUser = (usersCollection) => async (req, res) => {
  const { uid, email } = req.query;
  // console.log(req.query)

  if (!uid && !email) {
    return res.status(400).send({ message: "Missing uid or email query parameter" });
  }

  try {
    // Prefer email if provided
    const query = email ? { email } : { uid };

    const user = await usersCollection.findOne(query);
    // console.log(user)

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user); // sending only the user object
  } catch (error) {
    res.status(500).send({ message: "Error fetching user", error: error.message });
  }
};

module.exports = { saveUser, getUser };
