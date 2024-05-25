const express = require('express'); 
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import the cors package
const app = express();

app.use(express.static('uploads'))

// Middleware to allow CORS
// Middleware to allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware to allow CORS
app.use(cors()); // Add this line to enable CORS for all routes
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://jimmypro:Ayelzi%40123@cluster0.dghdweg.mongodb.net/test', {

}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schema
const ItemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  contact: String,
  imagePath: String,
  searchNumber: { type: Number, default: 0 } // Initialize searchNumber with a default value of 0
});


// Create model
const Item = mongoose.model('Item', ItemSchema);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer upload configuration
const upload = multer({ storage });

// POST route to handle file upload
app.post('/api/items', upload.single('image'), (req, res) => {
  const newItem = new Item({
    itemName: req.body.itemName,
    description: req.body.description,
    contact: req.body.contact,
    imagePath: req.file.path,
    searchNumber: 0 
  });

  newItem.save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

// GET route to fetch items from MongoDB
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
 
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});




// Update the searchNumber field for searched items
app.post('/api/search', async (req, res) => {
  try {
    const searchQuery = req.body.searchQuery.toLowerCase();
    const results = await Item.find({
      $or: [
        { description: { $regex: searchQuery, $options: 'i' } },
        { itemName: { $regex: searchQuery, $options: 'i' } }
      ]
    });

    // Increment searchNumber for each item in the results
    await Promise.all(results.map(async (item) => {
      item.searchNumber += 1;
      await item.save();
    }));

    res.json(results);
  } catch (error) {
    console.error('Error handling search:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// GET route to fetch lost items from MongoDB
app.get('/api/Lost', async (req, res) => {
  try {
    const items = await Lost.find();
    const totalLost = Lost.length;
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});





//lost insert

const LostSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  reward: String,

  imagePath: String, // Add profilePicture field to store image path
  searchNumber: { type: Number, default: 0 } // Initialize searchNumber with a default value of 0
});

// Create model for accounts collection
const Lost = mongoose.model('Lost', LostSchema);

// Multer storage configuration for profile pictures
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer upload configuration for profile pictures
const imageUploaded = multer({ storage: imageStorage });

// POST route to handle file upload for profile pictures
app.post('/api/lost', imageUploaded.single('imagePath'), (req, res) => {
  try {
    const { itemName, description, reward, searchNumber } = req.body;
    const profilePicturePath = req.file ? req.file.path : null; // Check if profile picture uploaded

    // Create a new account document with profile picture path
    const newAccount = new Lost({ itemName, description, reward,searchNumber, imagePath: profilePicturePath });

    // Save the new account document to the database
    newAccount.save()
      .then(account => res.status(201).json({ message: 'Account created successfully', account }))
      .catch(err => res.status(500).json({ message: 'Failed to create account', error: err }));
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Update the searchNumber field for searched Lost
app.post('/api/searchlost', async (req, res) => {
  try {
    const searchQuery = req.body.searchQuery.toLowerCase();
    const results = await Lost.find({
      $or: [
        { description: { $regex: searchQuery, $options: 'i' } },
        { itemName: { $regex: searchQuery, $options: 'i' } }
      ]
    });

    // Increment searchNumber for each item in the results
    await Promise.all(results.map(async (item) => {
      item.searchNumber += 1;
      await item.save();
    }));

    res.json(results);
  } catch (error) {
    console.error('Error handling search:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// sign up

// Define schema for accounts collection
// Define schema for accounts collection
const AccountSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  profilePicture: String,
  type: { type: String, enum: ['admin', 'user'], default: 'user' } // Add type field with default value 'user' and enum constraint
});

// Create model for accounts collection
const Account = mongoose.model('Account', AccountSchema);

// Multer storage configuration for profile pictures
const profilePictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer upload configuration for profile pictures
const profilePictureUpload = multer({ storage: profilePictureStorage });

// POST route to handle file upload for profile pictures
app.post('/api/accounts', profilePictureUpload.single('profilePicture'), (req, res) => {
  try {
    const { username, password, email, phone, type} = req.body;
    const profilePicturePath = req.file ? req.file.path : null; // Check if profile picture uploaded

    // Create a new account document with profile picture path
    const newAccount = new Account({ username, password, email, phone,type, profilePicture: profilePicturePath });

    // Save the new account document to the database
    newAccount.save()
      .then(account => res.status(201).json({ message: 'Account created successfully', account }))
      .catch(err => res.status(500).json({ message: 'Failed to create account', error: err }));
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { itemName, description, contact } = req.body;
  
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { itemName, description, contact }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle deleting an item
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// admin edit lost

app.put('/api/Lost/:id', async (req, res) => {
  const { id } = req.params;
  const { itemName, description } = req.body;
  
  try {
    const updatedItem = await Lost.findByIdAndUpdate(id, { itemName, description }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle deleting an item
app.delete('/api/Lost/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await Lost.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define route handler for fetching all user accounts
app.get('/api/accountsfetch', async (req, res) => {
  try {
    // Fetch all user accounts from the Accounts collection
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching user accounts:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Handle edit account
app.put('/api/update/:id', async (req, res) => {
  const accountId = req.params.id;
  console.log(accountId)
  const { username, email, phone, password, type } = req.body;

  try {
    const updatedAccount = await Account.findByIdAndUpdate(accountId, { username, email, phone, password, type }, { new: true });
    res.json(updatedAccount);
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Handle delete account
app.delete('/api/accounts/:id', async (req, res) => {
  const accountId = req.params.id;

  try {
    await Account.findByIdAndDelete(accountId);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Update the account schema to include email and phone
const accountSchema1 = new mongoose.Schema({
  username: String,
  password: String,
  email: String, // Add email field
  phone: String, // Add phone field
  profilePicture: String ,// Add profilePicture field to store image path
  type: String
});

const Accounts = mongoose.model('Accounts', accountSchema1);

// POST route to handle login
// POST route to handle login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the Accounts collection based on the provided username
    const user = await Accounts.findOne({ username });

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isPasswordValid = user.password === password;

    // If passwords don't match, return error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Log the entire user object to ensure it contains the 'type' field
    console.log('User:', user);

    // Extract userType from the user object
    const userType = user.type;

    // Log the extracted userType to ensure it's not undefined
    console.log('User type:', userType);

    // Return user details including email, phone, profile picture, and user type
    res.status(200).json({
      username: user.username,
      email: user.email,
      phone: user.phone,
      profilePicture: user.profilePicture,
      userType: userType // Include userType in the response
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Chat Schema
const ChatSchema = new mongoose.Schema({
  message: String,
  username: String,
  date: { type: Date, default: Date.now }
});

// Create model
const Chat = mongoose.model('Chat', ChatSchema);

// POST route to handle chat messages
app.post('/api/chats', async (req, res) => {
  try {
    const { message, username } = req.body;
    const newChat = new Chat({ message, username });
    await newChat.save();
    res.status(201).json({ message: 'Message inserted successfully' });
  } catch (error) {
    console.error('Error inserting message:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Route to fetch chats
app.get('/api/chats', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 }) // Fetch last 10 chats
    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Define route handler for updating user data
app.put('/api/edit', async (req, res) => {
  const { username, email, phone, profilePicture } = req.body;

  try {
    // Find the user in the Accounts collection based on the provided username
    const user = await Account.findOne({ username });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data with provided information
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }

    // Save the updated user data to the database
    await user.save();

    res.status(200).json({ message: 'User data updated successfully', user });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Define schema for the Claim collection
const ClaimSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  username: String,
  contact: String,
  phone:String
});

// Create model for the Claim collection
const Claim = mongoose.model('Claim', ClaimSchema);

// POST route to handle claiming items
app.post('/claim', (req, res) => {
  // Extract data from request body
  const { itemName, description, username, contact, phone } = req.body;

  // Create a new claim document
  const newClaim = new Claim({ itemName, description, username, contact, phone });

  // Save the new claim document to the database
  newClaim.save()
    .then(() => {
      res.json({ success: true, message: 'Item claimed successfully.' });
    })
    .catch(err => {
      console.error('Error claiming item:', err);
      res.status(500).json({ success: false, message: 'Failed to claim item.' });
    });
});


// GET route to fetch all claimed items from the Claim collection
app.get('/claim', async (req, res) => {
  try {
    // Fetch all claimed items from the Claim collection
    const claimedItems = await Claim.find();
    res.status(200).json(claimedItems);
  } catch (error) {
    console.error('Error fetching claimed items:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Define schema for verify collection
const VerifySchema = new mongoose.Schema({
  username: String,
  message: String,
});

// Create model for verify collection
const Verify = mongoose.model('Verify', VerifySchema);

// Route to handle POST request to /verify endpoint
app.post('/verify', async (req, res) => {
  try {
    const { username, message } = req.body;

    // Insert data into the verify collection
    const newVerification = new Verify({
      username,
      message,
    });
    await newVerification.save();

    res.json({ success: true, message: 'Verification inserted successfully.' });
  } catch (error) {
    console.error('Error inserting verification:', error);
    res.status(500).json({ success: false, message: 'Failed to insert verification.' });
  }
});

// Route to handle verification data
// Route to handle verification data
app.get('/verify', async (req, res) => {
  try {
    const { username } = req.query;
    
    let verificationData;

    if (username) {
      // Fetch verification data for the specified username
      verificationData = await Verify.find({ username });
    } else {
      // Fetch all verification data
      verificationData = await Verify.find();
    }

    res.json(verificationData);
  } catch (error) {
    console.error('Error fetching verification data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Define mongoose schema for replies
const replySchema = new mongoose.Schema({
  username: String,
  message: String,
});

// Define mongoose model for replies
const Reply = mongoose.model('Reply', replySchema);

// Route to handle storing replies
app.post('/api/replies', async (req, res) => {
  try {
    const { username, message } = req.body;

    // Create a new reply document
    const newReply = new Reply({
      username,
      message,
    });

    // Save the reply to the database
    await newReply.save();

    // Respond with success message
    res.status(201).json({ message: 'Reply stored successfully.' });
  } catch (error) {
    // Respond with error message if something went wrong
    console.error('Error storing reply:', error);
    res.status(500).json({ error: 'An error occurred while storing the reply.' });
  }
});
// Route to handle verification data
app.get('/api/replies', async (req, res) => {
  try {
    // Fetch verification data from MongoDB
    const replyData = await Reply.find();
    res.json(replyData);
  } catch (error) {
    console.error('Error fetching reply data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// SSE route for real-time updates
// SSE route for real-time updates
app.get('/api/chats/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendUpdate = async () => {
    try {
      const chats = await Chat.find().sort({ createdAt: -1 }).limit(10); // Fetch last 10 chats
      res.write(`data: ${JSON.stringify(chats)}\n\n`);
    } catch (err) {
      console.error(err);
      res.status(500).end(); // End the response in case of an error
    }
  };

  const intervalId = setInterval(sendUpdate, 3000); // Send updates every 3 seconds

  // Send initial data
  sendUpdate();

  req.on('close', () => {
    clearInterval(intervalId);
    res.end(); // End the response when the client connection closes
  });
});


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('Server is on!');











