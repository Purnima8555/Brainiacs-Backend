import User from '../models/user.js';

export const registerUser = async (req, res) => {
  const { username, avatar, secretCode, parentEmail } = req.body;

  // Check if username already exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  // Create user
  const user = await User.create({
    username,
    avatar,
    secretCode,
    parentEmail,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req, res) => {
  const { username, secretCode } = req.body;

  const user = await User.findOne({ username });
  if (user && (await user.matchSecretCode(secretCode))) {
    res.json({
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
    });
  } else {
    res.status(401).json({ message: 'Invalid username or secret code' });
  }
};
