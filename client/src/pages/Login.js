const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({
    token,
    user
  });
});