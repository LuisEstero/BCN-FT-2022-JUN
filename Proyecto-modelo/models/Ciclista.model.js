const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const ciclistaSchema = new Schema(
  {
    name: String,
    nationality: String,
    team: String,
    image: String
  },

  {
    timestamps: true,
  }
);


ciclistaSchema.pre("save", function(next) {
  // console.log(this)

  const nameToUpper = this.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')

  this.name = nameToUpper

    next();
});


 const Ciclista = model("Ciclista", ciclistaSchema);

module.exports = Ciclista;
