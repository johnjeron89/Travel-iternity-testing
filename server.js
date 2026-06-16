const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize Database connection
const dbPath = path.join(__dirname, 'travel_eternity.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    createTables();
  }
});

// Helper: Secure password hashing using native node crypto (PBKDF2)
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

// Table schema creation
function createTables() {
  db.serialize(() => {
    // 1. Destinations Table
    db.run(`
      CREATE TABLE IF NOT EXISTS destinations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT,
        description TEXT,
        tags TEXT,
        baseCost TEXT,
        activities TEXT
      )
    `);

    // 2. Users Table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        salt TEXT NOT NULL,
        preferences TEXT,
        avatar TEXT
      )
    `);

    // 3. Trips Table
    db.run(`
      CREATE TABLE IF NOT EXISTS trips (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        destination TEXT NOT NULL,
        days INTEGER NOT NULL,
        budget REAL NOT NULL,
        accommodation TEXT,
        pace TEXT,
        schedule TEXT
      )
    `);

    // 4. Wishlist Table
    db.run(`
      CREATE TABLE IF NOT EXISTS wishlist (
        user_id TEXT NOT NULL,
        dest_id TEXT NOT NULL,
        PRIMARY KEY (user_id, dest_id)
      )
    `);

    // 5. Reviews Table
    db.run(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        destination TEXT NOT NULL,
        stars INTEGER NOT NULL,
        date TEXT,
        text TEXT
      )
    `, () => {
      // Seed initial data once tables are ready
      seedDatabase();
    });
  });
}

// Seed Mock Data
function seedDatabase() {
  db.get("SELECT COUNT(*) as count FROM destinations", (err, row) => {
    if (err) return console.error(err);
    if (row.count > 0) return; // Already seeded

    console.log("Seeding initial destinations and reviews into SQLite database...");
    
    // Seed Destinations
    const initialDestinations = [
      {
        id: "bali",
        name: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
        description: "A tropical paradise famed for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
        tags: ["Beaches", "Adventure", "Nature", "Food Exploration", "Religious Tourism"],
        baseCost: { accommodation: { Budget: 25, "Mid-range": 80, Luxury: 250 }, transport: 15, food: 20 },
        activities: {
          "Adventure": [
            { title: "White Water Rafting on Ayung River", cost: 45, desc: "Raft down the wild rapids surrounded by lush Bali rainforest.", duration: "3 hours" },
            { title: "ATV Quad Biking in Ubud Caves", cost: 60, desc: "Ride through rice fields, bamboo forests, and mud tracks.", duration: "2 hours" },
            { title: "Mount Batur Sunrise Trekking", cost: 50, desc: "Early morning hike up an active volcano to catch a gorgeous sunrise.", duration: "5 hours" }
          ],
          "Nature": [
            { title: "Ubud Monkey Forest Walk", cost: 8, desc: "Explore the sanctuary of grey long-tailed macaques.", duration: "1.5 hours" },
            { title: "Tegenungan Waterfall Visit", cost: 5, desc: "Swim in the refreshing natural pool of a towering waterfall.", duration: "2 hours" },
            { title: "Tegalalang Rice Terraces Trek", cost: 10, desc: "Walk the scenic terraced hillside valleys and snap photos.", duration: "2 hours" }
          ],
          "Beaches": [
            { title: "Surf Lesson at Kuta Beach", cost: 20, desc: "Learn surfing from professional instructors on soft sandy breaks.", duration: "2 hours" },
            { title: "Snorkeling at Nusa Penida", cost: 40, desc: "Swim with majestic Manta Rays in crystal-clear waters.", duration: "4 hours" },
            { title: "Sunset Seafood Dinner at Jimbaran", cost: 30, desc: "Fresh grilled snapper and prawns on the beach as sun goes down.", duration: "2 hours" }
          ],
          "Historical Places": [
            { title: "Explore Ubud Royal Palace", cost: 0, desc: "Walk the historical compound of the local royal family.", duration: "1 hour" },
            { title: "Gunung Kawi Cliff Shrine Visit", cost: 12, desc: "11th-century temple complex carved into sheer cliff faces.", duration: "2 hours" }
          ],
          "Shopping": [
            { title: "Shopping at Ubud Art Market", cost: 15, desc: "Browse handmade bags, silk scarves, and wooden carvings.", duration: "2 hours" },
            { title: "Seminyak Boutique Shopping", cost: 50, desc: "Walk through high-end fashion boutiques and design galleries.", duration: "3 hours" }
          ],
          "Food Exploration": [
            { title: "Balinese Cooking Class", cost: 35, desc: "Visit a morning organic market and cook authentic local dishes.", duration: "4 hours" },
            { title: "Traditional Babi Guling Lunch", cost: 10, desc: "Savor spit-roasted pig with spicy rice and vegetables.", duration: "1 hour" }
          ],
          "Religious Tourism": [
            { title: "Tanah Lot Pilgrimage Temple", cost: 15, desc: "Visit the offshore temple perched on a wave-swept rock.", duration: "2 hours" },
            { title: "Uluwatu Sunset Temple & Kecak Dance", cost: 25, desc: "Clifftop temple with dramatic sea views and fire dance.", duration: "3 hours" },
            { title: "Tirta Empul Holy Water Temple", cost: 8, desc: "Participate in a spiritual purification ritual in natural springs.", duration: "2 hours" }
          ]
        }
      },
      {
        id: "kyoto",
        name: "Kyoto, Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
        description: "Famed for its thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
        tags: ["Historical Places", "Nature", "Religious Tourism", "Food Exploration", "Shopping"],
        baseCost: { accommodation: { Budget: 45, "Mid-range": 120, Luxury: 450 }, transport: 25, food: 40 },
        activities: {
          "Historical Places": [
            { title: "Nijo Castle Wooden Palace Walk", cost: 10, desc: "Walk on chirping 'nightingale floors' built to detect ninja assassins.", duration: "2 hours" },
            { title: "Gion District Walking Tour", cost: 15, desc: "Walk the traditional streets and look out for geishas in kimonos.", duration: "2 hours" },
            { title: "Kinkaku-ji Golden Pavilion", cost: 5, desc: "Breathtaking Zen temple covered in brilliant gold leaf.", duration: "1.5 hours" }
          ],
          "Nature": [
            { title: "Arashiyama Bamboo Grove Walk", cost: 0, desc: "Stroll through towering stalks of green bamboo.", duration: "2 hours" },
            { title: "Philosopher's Path Hiking", cost: 0, desc: "Scenic stone path along a canal lined with cherry blossom trees.", duration: "1.5 hours" }
          ],
          "Religious Tourism": [
            { title: "Fushimi Inari Shrine Hike", cost: 0, desc: "Hike up the mountain through thousands of vibrant orange torii gates.", duration: "3 hours" },
            { title: "Kiyomizu-dera Temple View", cost: 6, desc: "Historic wooden temple overlooking Kyoto with natural springs.", duration: "2 hours" }
          ],
          "Food Exploration": [
            { title: "Nishiki Food Market Tasting", cost: 20, desc: "Sample skewers, octopus, mochi, and fresh green tea.", duration: "2 hours" },
            { title: "Traditional Kaiseki Dinner Banquet", cost: 110, desc: "Multi-course high art dining featuring seasonal delicacies.", duration: "2 hours" }
          ],
          "Shopping": [
            { title: "Kawaramachi Souvenir Shopping", cost: 30, desc: "Pick up matcha sweets, handmade knives, and ceramics.", duration: "2.5 hours" }
          ]
        }
      },
      {
        id: "rome",
        name: "Rome, Italy",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
        description: "A potent blend of haunting ruins, awe-inspiring art and vibrant street life, Rome is one of the world's most romantic and charismatic capitals.",
        tags: ["Historical Places", "Food Exploration", "Religious Tourism", "Shopping"],
        baseCost: { accommodation: { Budget: 50, "Mid-range": 130, Luxury: 480 }, transport: 20, food: 50 },
        activities: {
          "Historical Places": [
            { title: "Skip-the-Line Colosseum & Forum Tour", cost: 35, desc: "Walk the gladiatorial arena and Rome's ancient civic center.", duration: "3 hours" },
            { title: "Pantheon Dome Exploration", cost: 8, desc: "Stand under the open oculus of Rome's best preserved temple.", duration: "1 hour" },
            { title: "Trevi Fountain Coin Toss", cost: 2, desc: "Toss a coin into the gorgeous Baroque masterpiece fountain.", duration: "0.5 hours" }
          ],
          "Food Exploration": [
            { title: "Roman Street Food & Pizza Tour", cost: 40, desc: "Eat Roman pizza, supplì rice balls, and organic gelato.", duration: "2.5 hours" },
            { title: "Fresh Pasta & Tiramisu Class", cost: 55, desc: "Learn to knead pasta from scratch with a local chef.", duration: "3 hours" }
          ],
          "Religious Tourism": [
            { title: "Vatican Museums & Sistine Chapel", cost: 30, desc: "Admire Michelangelo's ceiling frescoes and the Papal collections.", duration: "4 hours" },
            { title: "St. Peter's Basilica Dome Climb", cost: 10, desc: "Climb the steps for a panoramic view of Rome and the square.", duration: "2 hours" }
          ],
          "Shopping": [
            { title: "Via Del Corso Window Shopping", cost: 15, desc: "Walk the prime commercial avenue of Rome for fashion goods.", duration: "2 hours" }
          ]
        }
      },
      {
        id: "swiss-alps",
        name: "Swiss Alps, Switzerland",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
        description: "Spectacular alpine peaks, dramatic waterfalls, glacial lakes, and cozy mountain villages perfect for skiing and alpine hiking.",
        tags: ["Nature", "Adventure", "Food Exploration"],
        baseCost: { accommodation: { Budget: 70, "Mid-range": 180, Luxury: 650 }, transport: 50, food: 65 },
        activities: {
          "Adventure": [
            { title: "First Glider Zip Line at Grindelwald", cost: 32, desc: "Fly like an eagle over scenic mountain peaks at 80 km/h.", duration: "1 hour" },
            { title: "Paragliding over Interlaken Lakes", cost: 160, desc: "Tandem paraglider flight over gorgeous turquoise water valleys.", duration: "2 hours" }
          ],
          "Nature": [
            { title: "Lauterbrunnen 72 Waterfalls Trail Hike", cost: 0, desc: "Walk down a valley carved between towering granite cliffs.", duration: "3 hours" },
            { title: "Trümmelbach Cave Waterfalls Tour", cost: 15, desc: "Subterranean waterfalls carrying glacial meltwater inside mountains.", duration: "2 hours" }
          ],
          "Food Exploration": [
            { title: "Authentic Alpine Cheese Fondue Dinner", cost: 45, desc: "Melted Swiss cheeses, potatoes, and bread in a mountain cabin.", duration: "2 hours" }
          ]
        }
      },
      {
        id: "reykjavik",
        name: "Reykjavik, Iceland",
        image: "https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=600&q=80",
        description: "The gateway to a magical land of hot springs, waterfalls, black sand beaches, volcanic craters and dancing Northern Lights.",
        tags: ["Nature", "Adventure", "Historical Places"],
        baseCost: { accommodation: { Budget: 60, "Mid-range": 160, Luxury: 500 }, transport: 40, food: 55 },
        activities: {
          "Nature": [
            { title: "Golden Circle Route Tour", cost: 70, desc: "Visit Gullfoss Waterfall, Geysir geothermal field and Thingvellir.", duration: "7 hours" },
            { title: "Blue Lagoon Geothermal Spa Soak", cost: 85, desc: "Relax in milky blue silica-rich hot water springs.", duration: "3 hours" },
            { title: "Northern Lights Night Expedition", cost: 50, desc: "Hunt for the mesmerizing Aurora Borealis in dark clear skies.", duration: "4 hours" }
          ],
          "Adventure": [
            { title: "Glacier Hiking at Solheimajokull", cost: 95, desc: "Walk on blue glacial ice with crampons, axes, and helmets.", duration: "4 hours" }
          ]
        }
      },
      {
        id: "agra",
        name: "Taj Mahal (Agra), India",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
        description: "Home of the iconic Taj Mahal, Agra offers a deep dive into Mughal history, majestic forts, and rich culinary treasures.",
        tags: ["Historical Places", "Religious Tourism", "Food Exploration", "Shopping"],
        baseCost: { accommodation: { Budget: 15, "Mid-range": 45, Luxury: 180 }, transport: 10, food: 15 },
        activities: {
          "Historical Places": [
            { title: "Taj Mahal Sunrise Guided Tour", cost: 20, desc: "Watch the sun lift over the white marble monument of love.", duration: "3 hours" },
            { title: "Agra Fort Mughal Palace Visit", cost: 10, desc: "Explore the walled sister palace and dungeons of ancient emperors.", duration: "2 hours" },
            { title: "Tomb of Itimad-ud-Daulah (Baby Taj)", cost: 5, desc: "Visit the delicate jewel box mausoleum alongside the Yamuna River.", duration: "1.5 hours" }
          ],
          "Religious Tourism": [
            { title: "Jama Masjid Architectural Exploration", cost: 0, desc: "Admire the red sandstone grand mosque of Shah Jahan.", duration: "1.5 hours" }
          ],
          "Food Exploration": [
            { title: "Agra Street Petha & Chaat Tasting", cost: 8, desc: "Taste spicy bhalla chaat and traditional translucent sugar candy.", duration: "2 hours" },
            { title: "Mughlai Royal Dinner Banquet", cost: 25, desc: "Dine on creamy paneer, buttery flatbreads, and aromatic biryani.", duration: "2 hours" }
          ],
          "Shopping": [
            { title: "Marble Inlay Handicrafts Shopping", cost: 15, desc: "Browse marble tables and figures with semi-precious stone inlay.", duration: "2 hours" }
          ]
        }
      },
      {
        id: "goa",
        name: "Goa, India",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        description: "Famous for its pristine sandy beaches, active nightlife, 17th-century Portuguese churches, and delicious spice plantations.",
        tags: ["Beaches", "Adventure", "Nature", "Food Exploration", "Historical Places"],
        baseCost: { accommodation: { Budget: 20, "Mid-range": 60, Luxury: 200 }, transport: 12, food: 22 },
        activities: {
          "Beaches": [
            { title: "Relaxation at Palolem Beach", cost: 0, desc: "Lounge under palm-fringed shacks at Goa's beautiful southern bay.", duration: "3 hours" },
            { title: "Sunset Drinks & Shack Dining at Anjuna", cost: 18, desc: "Watch waves crash under orange sunset skies with seafood.", duration: "2.5 hours" },
            { title: "Dolphin Spotting Boat Ride", cost: 15, desc: "Boat tour out to spot playful humpback dolphins in the sea.", duration: "2 hours" }
          ],
          "Adventure": [
            { title: "Scuba Diving at Grande Island", cost: 45, desc: "Discover shallow reefs, shipwrecks, and exotic marine life.", duration: "4 hours" },
            { title: "Water Sports at Calangute Beach", cost: 25, desc: "Get your adrenaline rushing with parasailing and jet skis.", duration: "2 hours" }
          ],
          "Nature": [
            { title: "Dudhsagar Waterfalls Jeep Safari", cost: 20, desc: "Ride through dense jungle tracks to reach the massive four-tiered falls.", duration: "5 hours" },
            { title: "Sahakari Spice Plantation Tour", cost: 10, desc: "Walk through fields of green cardamom, cloves, and vanilla orchids.", duration: "2.5 hours" }
          ],
          "Historical Places": [
            { title: "Basilica of Bom Jesus Heritage Walk", cost: 0, desc: "Visit the iconic UNESCO heritage church housing St. Francis Xavier ruins.", duration: "1.5 hours" }
          ],
          "Food Exploration": [
            { title: "Goan Fish Curry & Bebinca Tasting", cost: 12, desc: "Feast on coconut curry rice and traditional layered sweet cake.", duration: "1.5 hours" }
          ]
        }
      },
      {
        id: "ladakh",
        name: "Ladakh, India",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
        description: "A high-altitude region of spectacular mountain valleys, crystal-clear blue lakes, dramatic passes, and ancient Buddhist monasteries.",
        tags: ["Adventure", "Nature", "Religious Tourism", "Historical Places"],
        baseCost: { accommodation: { Budget: 25, "Mid-range": 70, Luxury: 190 }, transport: 35, food: 18 },
        activities: {
          "Adventure": [
            { title: "River Rafting in Zanskar & Indus Confluence", cost: 30, desc: "Raft glacial waters flanked by stark canyon mountains.", duration: "3 hours" },
            { title: "Mountain Biking down Khardung La Pass", cost: 40, desc: "Cycle down one of the world's highest motorable passes.", duration: "4 hours" }
          ],
          "Nature": [
            { title: "Pangong Tso Blue Lake Excursion", cost: 25, desc: "Behold the massive saltwater lake that spans from India into Tibet.", duration: "6 hours" },
            { title: "Nubra Valley Double-Humped Camel Ride", cost: 15, desc: "Ride through high cold desert sand dunes on rare Bactrian camels.", duration: "2 hours" }
          ],
          "Religious Tourism": [
            { title: "Thiksey Monastery Morning Prayers", cost: 5, desc: "Witness the early morning chanting rituals of Tibetan Buddhist monks.", duration: "2.5 hours" },
            { title: "Hemis Monastery Spiritual Tour", cost: 5, desc: "Walk the largest monastery museum featuring ancient scrolls.", duration: "2 hours" }
          ],
          "Historical Places": [
            { title: "Leh Palace Architectural Walk", cost: 8, desc: "Explore the nine-story former royal palace overlooking Leh city.", duration: "2 hours" }
          ]
        }
      }
    ];

    const stmt = db.prepare("INSERT INTO destinations (id, name, image, description, tags, baseCost, activities) VALUES (?, ?, ?, ?, ?, ?, ?)");
    initialDestinations.forEach(dest => {
      stmt.run(
        dest.id,
        dest.name,
        dest.image,
        dest.description,
        JSON.stringify(dest.tags),
        JSON.stringify(dest.baseCost),
        JSON.stringify(dest.activities)
      );
    });
    stmt.finalize();
    console.log("Destinations seeded successfully.");

    // Seed Reviews
    const initialReviews = [
      { author: "Emma Watson", destination: "Bali, Indonesia", stars: 5, date: "June 05, 2026", text: "The generator scheduled Uluwatu Temple right at sunset, which was spectacular! The budget calculation was very accurate; I only spent $45 over the estimated mid-range hotel cost." },
      { author: "Liam Neeson", destination: "Kyoto, Japan", stars: 4, date: "May 28, 2026", text: "Brilliant schedule! The Arashiyama Bamboo forest was set early in the morning so I beat the crowd. Would recommend shifting Nijo castle details if it rains." },
      { author: "Carlos S.", destination: "Rome, Italy", stars: 5, date: "June 12, 2026", text: "Extremely useful budget planner. The warning tool flagged that Vatican ticket costs + food tour exceeded my daily limits. I modified the itinerary on the dashboard to fit my pocket." }
    ];

    const revStmt = db.prepare("INSERT INTO reviews (author, destination, stars, date, text) VALUES (?, ?, ?, ?, ?)");
    initialReviews.forEach(rev => {
      revStmt.run(rev.author, rev.destination, rev.stars, rev.date, rev.text);
    });
    revStmt.finalize();
    console.log("Community reviews seeded successfully.");
  });
}

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. Get Destinations
app.get('/api/destinations', (req, res) => {
  db.all("SELECT * FROM destinations", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Parse JSON columns back to javascript types
    const parsed = rows.map(row => ({
      id: row.id,
      name: row.name,
      image: row.image,
      description: row.description,
      tags: JSON.parse(row.tags),
      baseCost: JSON.parse(row.baseCost),
      activities: JSON.parse(row.activities)
    }));
    
    res.json(parsed);
  });
});

// 2. Authentication: Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  db.get("SELECT id FROM users WHERE username = ?", [username.toLowerCase()], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.status(400).json({ error: 'Username is already taken.' });

    const { salt, hash } = hashPassword(password);
    const userId = 'user_' + Date.now();
    const defaultPrefs = JSON.stringify(["Adventure", "Nature"]);
    const avatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80";

    db.run(
      `INSERT INTO users (id, name, email, username, password, salt, preferences, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, name, email, username.toLowerCase(), hash, salt, defaultPrefs, avatar],
      function(insertErr) {
        if (insertErr) return res.status(500).json({ error: insertErr.message });
        
        res.status(201).json({
          id: userId,
          name: name,
          email: email,
          username: username.toLowerCase(),
          preferences: ["Adventure", "Nature"],
          avatar: avatar
        });
      }
    );
  });
});

// 3. Authentication: Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username.toLowerCase()],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: 'Invalid username or password.' });

      const valid = verifyPassword(password, user.salt, user.password);
      if (!valid) return res.status(401).json({ error: 'Invalid username or password.' });

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        preferences: JSON.parse(user.preferences || "[]"),
        avatar: user.avatar
      });
    }
  );
});

// 4. Update Profile Preferences
app.post('/api/auth/preferences', (req, res) => {
  const { username, preferences } = req.body;
  if (!username || !preferences) {
    return res.status(400).json({ error: 'Username and preferences are required.' });
  }

  db.run(
    "UPDATE users SET preferences = ? WHERE username = ?",
    [JSON.stringify(preferences), username.toLowerCase()],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, preferences });
    }
  );
});

// 5. Get Saved Trips
app.get('/api/trips', (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId is required.' });

  db.all("SELECT * FROM trips WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const parsed = rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      destination: row.destination,
      days: row.days,
      budget: row.budget,
      accommodation: row.accommodation,
      pace: row.pace,
      schedule: JSON.parse(row.schedule)
    }));
    res.json(parsed);
  });
});

// 6. Save or Update Trip
app.post('/api/trips', (req, res) => {
  const { id, userId, destination, days, budget, accommodation, pace, schedule } = req.body;
  if (!id || !userId || !destination || !days) {
    return res.status(400).json({ error: 'Missing required trip parameters.' });
  }

  db.run(
    `INSERT INTO trips (id, user_id, destination, days, budget, accommodation, pace, schedule)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       user_id=excluded.user_id,
       destination=excluded.destination,
       days=excluded.days,
       budget=excluded.budget,
       accommodation=excluded.accommodation,
       pace=excluded.pace,
       schedule=excluded.schedule`,
    [id, userId, destination, days, budget, accommodation, pace, JSON.stringify(schedule)],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

// 7. Delete Saved Trip
app.delete('/api/trips/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM trips WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// 8. Get Wishlist
app.get('/api/wishlist', (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId is required.' });

  db.all("SELECT dest_id FROM wishlist WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const list = rows.map(r => r.dest_id);
    res.json(list);
  });
});

// 9. Toggle Wishlist Item
app.post('/api/wishlist', (req, res) => {
  const { userId, destId } = req.body;
  if (!userId || !destId) {
    return res.status(400).json({ error: 'userId and destId are required.' });
  }

  db.get("SELECT * FROM wishlist WHERE user_id = ? AND dest_id = ?", [userId, destId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (row) {
      // Exists: delete it
      db.run("DELETE FROM wishlist WHERE user_id = ? AND dest_id = ?", [userId, destId], function(deleteErr) {
        if (deleteErr) return res.status(500).json({ error: deleteErr.message });
        sendUpdatedWishlist(userId, res);
      });
    } else {
      // Doesn't exist: insert it
      db.run("INSERT INTO wishlist (user_id, dest_id) VALUES (?, ?)", [userId, destId], function(insertErr) {
        if (insertErr) return res.status(500).json({ error: insertErr.message });
        sendUpdatedWishlist(userId, res);
      });
    }
  });
});

function sendUpdatedWishlist(userId, res) {
  db.all("SELECT dest_id FROM wishlist WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const list = rows.map(r => r.dest_id);
    res.json(list);
  });
}

// 10. Get Reviews
app.get('/api/reviews', (req, res) => {
  db.all("SELECT * FROM reviews ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 11. Add Review
app.post('/api/reviews', (req, res) => {
  const { author, destination, stars, text } = req.body;
  if (!author || !destination || !stars || !text) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  db.run(
    "INSERT INTO reviews (author, destination, stars, date, text) VALUES (?, ?, ?, ?, ?)",
    [author, destination, stars, date, text],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: this.lastID,
        author,
        destination,
        stars,
        date,
        text
      });
    }
  );
});

// Handle fallbacks: HTML 5 router behavior (serve index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Travel Eternity Partner backend running on http://localhost:${PORT}`);
});
