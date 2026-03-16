const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: String,
  description: String,

  dueDate: Date,

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"]
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"]
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Task", taskSchema);

router.post("/", auth, async (req, res) => {

  const task = new Task({
    ...req.body,
    userId: req.userId
  });

  await task.save();

  res.json(task);

});

router.get("/", auth, async (req, res) => {

  const tasks = await Task.find({
    userId: req.userId
  });

  res.json(tasks);

});

router.put("/:id", auth, async (req, res) => {

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);

});

router.delete("/:id", auth, async (req, res) => {

  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Task deleted" });

});



