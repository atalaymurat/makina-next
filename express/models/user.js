const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
  {
    name: { firstName: String, lastName: String },
    accountType: {
      type: String,
      enum: ['user', 'seller', 'manufacturer'],
      default: 'user',
    },
    locale: {
      type: String,
      enum: ['tr', 'en'],
      default: 'tr',
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    phone: {
      mobile: String,
      business: String,
      home: String,
      company: String,
      other: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    methods: {
      type: [String],
      enum: ['local', 'google', 'facebook', 'linkedin'],
      default: 'local',
    },
    local: {
      email: {
        type: String,
        lowercase: true,
      },
      email_verified: {
        type: Boolean,
        default: false,
      },
      password: {
        type: String,
      },
      passChanged: {
        type: Date,
      },
      confirmStr: String,
      resetPassToken: String,
    },
    facebook: {
      id: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
      },
      picture: String,
    },
    linkedin: {
      id: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
      },
      picture: String,
    },
    google: {
      id: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
      },
      picture: {
        type: String,
      },
    },
    photos: [{ value: String }]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: {
      virtuals: false,
    },
  }
)

userSchema.pre('save', async function (next) {
  try {
    console.log('entered user schema pre save')
    // Eger Local hesap methodu post edilmiyorsa pass geçiyoruz

    const user = this
    //check if the user modified to know if password already hashed
    if (!user.isModified('local.password')) {
      next()
    }
    // Generate a Salt
    const salt = await bcrypt.genSaltSync(10)
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hashSync(this.local.password, salt)
    // Assign hash version to orijinal pass to store in db
    this.local.password = passwordHash
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    //Return compare of passes True or False
    return await bcrypt.compareSync(newPassword, this.local.password)
  } catch (error) {
    throw new Error(error)
  }
}

const User = mongoose.model('user', userSchema)

module.exports = User
