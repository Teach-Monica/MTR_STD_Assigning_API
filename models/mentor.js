const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
