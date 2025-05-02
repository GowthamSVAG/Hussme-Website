const taskSchema = new mongoose.Schema({
  // ...existing fields...
  companyProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProfile',
    required: true
  },
  taskId: {
    type: Number,
    required: true
  },
  // ...other fields...
});

// Add a pre-save hook to automatically generate company-specific task IDs
taskSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastTask = await this.constructor.findOne(
      { companyProfileId: this.companyProfileId },
      {},
      { sort: { taskId: -1 } }
    );
    this.taskId = lastTask ? lastTask.taskId + 1 : 1;
  }
  next();
});