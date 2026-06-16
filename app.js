// ==========================================
// TRAVEL ETERNITY PARTNER - APPLICATION LOGIC
// ==========================================

// Mock Destination Database
let DESTINATIONS_DB = [
  {
    id: "bali",
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    description: "A tropical paradise famed for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
    tags: ["Beaches", "Adventure", "Nature", "Food Exploration", "Religious Tourism"],
    baseCost: {
      accommodation: { Budget: 25, "Mid-range": 80, Luxury: 250 },
      transport: 15,
      food: 20
    },
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
    baseCost: {
      accommodation: { Budget: 45, "Mid-range": 120, Luxury: 450 },
      transport: 25,
      food: 40
    },
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
    baseCost: {
      accommodation: { Budget: 50, "Mid-range": 130, Luxury: 480 },
      transport: 20,
      food: 50
    },
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
    baseCost: {
      accommodation: { Budget: 70, "Mid-range": 180, Luxury: 650 },
      transport: 50,
      food: 65
    },
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
    baseCost: {
      accommodation: { Budget: 60, "Mid-range": 160, Luxury: 500 },
      transport: 40,
      food: 55
    },
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
    baseCost: {
      accommodation: { Budget: 15, "Mid-range": 45, Luxury: 180 },
      transport: 10,
      food: 15
    },
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
    baseCost: {
      accommodation: { Budget: 20, "Mid-range": 60, Luxury: 200 },
      transport: 12,
      food: 22
    },
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
    baseCost: {
      accommodation: { Budget: 25, "Mid-range": 70, Luxury: 190 },
      transport: 35,
      food: 18
    },
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

// Pre-populated community reviews database
let MOCK_REVIEWS = [
  { id: 1, author: "Emma Watson", destination: "Bali, Indonesia", stars: 5, date: "June 05, 2026", text: "The generator scheduled Uluwatu Temple right at sunset, which was spectacular! The budget calculation was very accurate; I only spent $45 over the estimated mid-range hotel cost." },
  { id: 2, author: "Liam Neeson", destination: "Kyoto, Japan", stars: 4, date: "May 28, 2026", text: "Brilliant schedule! The Arashiyama Bamboo forest was set early in the morning so I beat the crowd. Would recommend shifting Nijo castle details if it rains." },
  { id: 3, author: "Carlos S.", destination: "Rome, Italy", stars: 5, date: "June 12, 2026", text: "Extremely useful budget planner. The warning tool flagged that Vatican ticket costs + food tour exceeded my daily limits. I modified the itinerary on the dashboard to fit my pocket." }
];

// ==========================================
// STATE MANAGEMENT & CRYPTO SIMULATION
// ==========================================
let currentUser = null;
let savedTrips = [];
let wishlist = [];
let currentGeneratedItinerary = null;

// Simulated Encryption (Masking / SHA-256 Mocking)
function simulateEncryption(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return "hash_" + Math.abs(hash).toString(16) + "_secure_enc";
}

// Show Toast Alert
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = '<i class="fa-solid fa-circle-check" style="color:var(--color-success)"></i>';
  if (type === "error") icon = '<i class="fa-solid fa-triangle-exclamation" style="color:var(--color-danger)"></i>';
  if (type === "warning") icon = '<i class="fa-solid fa-circle-exclamation" style="color:var(--color-warning)"></i>';
  if (type === "info") icon = '<i class="fa-solid fa-circle-info" style="color:var(--color-primary)"></i>';

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;
  container.appendChild(toast);
  
  // Trigger transition
  setTimeout(() => toast.classList.add("show"), 10);
  
  // Remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

let isBackendOnline = false;

// Check backend status and load initial configurations
async function checkBackendStatus() {
  try {
    const res = await fetch('/api/destinations');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        isBackendOnline = true;
        DESTINATIONS_DB = data;
        console.log("Connected to Travel Eternity Backend database successfully.");
      }
    }
  } catch (err) {
    console.warn("Backend server offline. Falling back to LocalStorage standalone mode.", err);
  }
}

// Load Persistent Data from LocalStorage
async function loadAppData() {
  await checkBackendStatus();
  
  const session = localStorage.getItem("travel_eternity_session");
  
  if (session) {
    currentUser = JSON.parse(session);
    updateHeaderAuthUI();
  } else {
    // Generate default guest explorer
    currentUser = {
      id: "guest_id",
      name: "Guest Explorer",
      username: "guest_partner",
      email: "explorer@traveleternity.com",
      preferences: ["Adventure", "Beaches", "Food Exploration"],
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
    };
  }
  
  if (isBackendOnline) {
    showToast("Connected to live SQLite database.", "info");
    try {
      const [tripsRes, wishlistRes, reviewsRes] = await Promise.all([
        fetch(`/api/trips?userId=${currentUser.id}`),
        fetch(`/api/wishlist?userId=${currentUser.id}`),
        fetch(`/api/reviews`)
      ]);
      
      if (tripsRes.ok) savedTrips = await tripsRes.json();
      if (wishlistRes.ok) wishlist = await wishlistRes.json();
      if (reviewsRes.ok) MOCK_REVIEWS = await reviewsRes.json();
    } catch (err) {
      console.error("Error fetching live database arrays:", err);
    }
  } else {
    const storedTrips = localStorage.getItem("travel_eternity_trips");
    const storedWishlist = localStorage.getItem("travel_eternity_wishlist");
    const storedReviews = localStorage.getItem("travel_eternity_reviews");
    
    savedTrips = storedTrips ? JSON.parse(storedTrips) : [];
    wishlist = storedWishlist ? JSON.parse(storedWishlist) : ["bali"]; // default
    
    if (storedReviews) {
      MOCK_REVIEWS = JSON.parse(storedReviews);
    }
  }
  
  syncPreferencesUI();
  renderRecommendations();
  renderFavoritesList();
  renderReviewsList();
}

// Save Data to LocalStorage
function saveStateToStorage() {
  localStorage.setItem("travel_eternity_trips", JSON.stringify(savedTrips));
  localStorage.setItem("travel_eternity_wishlist", JSON.stringify(wishlist));
  localStorage.setItem("travel_eternity_reviews", JSON.stringify(MOCK_REVIEWS));
}

// ==========================================
// ROUTING & NAVIGATION
// ==========================================
function switchView(targetViewId) {
  const landing = document.getElementById("landing-view");
  const dashboard = document.getElementById("dashboard-view");
  const navLinks = document.querySelectorAll(".nav-links a");
  
  // Deactivate all nav links
  navLinks.forEach(link => link.classList.remove("active"));

  if (targetViewId === "landing") {
    landing.style.display = "flex";
    dashboard.style.display = "none";
    document.querySelector('[data-target="landing"]').classList.add("active");
  } else {
    landing.style.display = "none";
    dashboard.style.display = "flex";
    
    // Highlight dashboard link
    document.getElementById("nav-link-dashboard").classList.add("active");
    
    // Router sub-panels
    if (["planner", "recs", "budget"].includes(targetViewId)) {
      let panelName = targetViewId;
      if (targetViewId === "recs") panelName = "recommendations";
      switchDashboardPanel(panelName);
    }
  }
  window.scrollTo(0, 0);
}

function switchDashboardPanel(panelId) {
  // Deactivate all sidebar items and panels
  document.querySelectorAll(".sidebar-menu-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-panel") === panelId) {
      item.classList.add("active");
    }
  });

  document.querySelectorAll(".dashboard-panel-view").forEach(panel => {
    panel.classList.remove("active");
  });

  const activePanel = document.getElementById(`panel-${panelId}`);
  if (activePanel) {
    activePanel.classList.add("active");
  }
  
  // Update nav-bar visual triggers if mapping directly
  const navMap = { "planner": "planner", "recommendations": "recs", "budget": "budget" };
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");
    const target = link.getAttribute("data-target");
    if (navMap[panelId] === target) {
      link.classList.add("active");
    }
  });

  // Specific panel actions
  if (panelId === "budget") {
    recalculateBudgetDetails();
  }
}

// Bind navigation clicks
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-target");
    switchView(target);
  });
});

document.querySelectorAll(".sidebar-menu-item").forEach(item => {
  item.addEventListener("click", () => {
    const targetPanel = item.getAttribute("data-panel");
    switchDashboardPanel(targetPanel);
  });
});

document.getElementById("logo-brand").addEventListener("click", (e) => {
  e.preventDefault();
  switchView("landing");
});

document.getElementById("hero-plan-btn").addEventListener("click", () => {
  switchView("planner");
});

// ==========================================
// PREFERENCES CONTROLLER
// ==========================================
function syncPreferencesUI() {
  if (!currentUser) return;
  
  // Render active chips in preferences box
  const chips = document.querySelectorAll("#dashboard-pref-chips .pref-chip");
  chips.forEach(chip => {
    const prefName = chip.getAttribute("data-pref");
    if (currentUser.preferences.includes(prefName)) {
      chip.classList.add("selected");
    } else {
      chip.classList.remove("selected");
    }
  });

  // Sync profile details
  document.getElementById("profile-name").textContent = currentUser.name;
  document.getElementById("profile-username").textContent = `@${currentUser.username}`;
  document.getElementById("profile-avatar").src = currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";
  
  if (currentUser.username !== "guest_partner") {
    document.getElementById("profile-member-badge").textContent = "Premium Partner";
    document.getElementById("profile-member-badge").className = "badge badge-success";
  } else {
    document.getElementById("profile-member-badge").textContent = "Basic Explorer";
    document.getElementById("profile-member-badge").className = "badge badge-primary";
  }
}

// Handle chip selection toggle
document.querySelectorAll("#dashboard-pref-chips .pref-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const prefName = chip.getAttribute("data-pref");
    if (currentUser.preferences.includes(prefName)) {
      // Keep at least one preference
      if (currentUser.preferences.length > 1) {
        currentUser.preferences = currentUser.preferences.filter(p => p !== prefName);
        chip.classList.remove("selected");
        showToast(`Removed preference: ${prefName}`, "info");
      } else {
        showToast("Please keep at least one travel preference", "warning");
      }
    } else {
      currentUser.preferences.push(prefName);
      chip.classList.add("selected");
      showToast(`Added preference: ${prefName}`, "success");
    }
    
    // Save updated preferences to storage if logged in
    if (currentUser.username !== "guest_partner") {
      localStorage.setItem("travel_eternity_session", JSON.stringify(currentUser));
      if (isBackendOnline) {
        fetch('/api/auth/preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: currentUser.username, preferences: currentUser.preferences })
        }).catch(err => console.error("Error saving preferences to server:", err));
      }
    }
    
    // Dynamically update recommendation scores based on updated preference chips!
    renderRecommendations();
  });
});

// ==========================================
// AUTHENTICATION CONTROLS
// ==========================================
const authBackdrop = document.getElementById("auth-modal-backdrop");
const loginTab = document.getElementById("tab-login-btn");
const registerTab = document.getElementById("tab-register-btn");
const loginFormView = document.getElementById("form-login-view");
const registerFormView = document.getElementById("form-register-view");

function openAuthModal(mode = "login") {
  authBackdrop.classList.add("active");
  setAuthTab(mode);
}

function closeAuthModal() {
  authBackdrop.classList.remove("active");
}

function setAuthTab(mode) {
  if (mode === "login") {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginFormView.classList.add("active");
    registerFormView.classList.remove("active");
  } else {
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
    loginFormView.classList.remove("active");
    registerFormView.classList.add("active");
  }
}

// Events
loginTab.addEventListener("click", () => setAuthTab("login"));
registerTab.addEventListener("click", () => setAuthTab("register"));
document.getElementById("close-auth-modal-btn").addEventListener("click", closeAuthModal);
document.getElementById("header-login-btn").addEventListener("click", () => openAuthModal("login"));
document.getElementById("header-signup-btn").addEventListener("click", () => openAuthModal("register"));

// Form Submit Handling
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const pass = document.getElementById("login-password").value;
  
  if (!username || !pass) return;
  
  if (isBackendOnline) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass })
      });
      
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Login failed.", "error");
        return;
      }
      currentUser = data;
    } catch (err) {
      showToast("Network error communicating with server.", "error");
      return;
    }
  } else {
    // Simulated authentication validation
    const encPass = simulateEncryption(pass);
    
    // Set session user
    currentUser = {
      id: "local_" + username,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      username: username.toLowerCase().replace(/\s+/g, '_'),
      email: `${username}@traveleternity.com`,
      preferences: ["Adventure", "Beaches", "Food Exploration"],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      encPassword: encPass // Password stored encrypted
    };
  }
  
  localStorage.setItem("travel_eternity_session", JSON.stringify(currentUser));
  updateHeaderAuthUI();
  await loadAppData(); // Re-trigger DB fetch for this user
  closeAuthModal();
  showToast(`Welcome back, ${currentUser.name}!`, "success");
});

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const username = document.getElementById("reg-username").value.trim();
  const pass = document.getElementById("reg-password").value;
  
  if (!name || !email || !username || !pass) return;
  
  if (isBackendOnline) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, username, password: pass })
      });
      
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Registration failed.", "error");
        return;
      }
      currentUser = data;
    } catch (err) {
      showToast("Network error communicating with server.", "error");
      return;
    }
  } else {
    // Encrypt password using simulated hash
    const encPass = simulateEncryption(pass);
    
    currentUser = {
      id: "local_" + username,
      name: name,
      username: username.toLowerCase().replace(/\s+/g, '_'),
      email: email,
      preferences: ["Adventure", "Nature"], // initial default preferences
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      encPassword: encPass
    };
  }
  
  localStorage.setItem("travel_eternity_session", JSON.stringify(currentUser));
  updateHeaderAuthUI();
  await loadAppData(); // Re-trigger DB fetch for this user
  closeAuthModal();
  showToast(`Account created securely for ${name}!`, "success");
});

// Sidebar & Header Sign Out
function handleLogout() {
  localStorage.removeItem("travel_eternity_session");
  currentUser = {
    name: "Guest Explorer",
    username: "guest_partner",
    email: "explorer@traveleternity.com",
    preferences: ["Adventure", "Beaches", "Food Exploration"],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  };
  updateHeaderAuthUI();
  syncPreferencesUI();
  renderRecommendations();
  switchView("landing");
  showToast("Logged out successfully.", "info");
}

document.getElementById("sidebar-logout-btn").addEventListener("click", handleLogout);

function updateHeaderAuthUI() {
  const container = document.getElementById("header-auth-section");
  if (currentUser && currentUser.username !== "guest_partner") {
    container.innerHTML = `
      <div class="user-profile-btn" id="header-profile-btn">
        <img src="${currentUser.avatar}" alt="${currentUser.name}">
        <span>${currentUser.name}</span>
      </div>
      <button class="icon-btn" id="header-logout-btn" title="Sign Out"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
    `;
    
    // Bind actions
    document.getElementById("header-profile-btn").addEventListener("click", () => {
      switchView("planner");
    });
    
    document.getElementById("header-logout-btn").addEventListener("click", handleLogout);
  } else {
    container.innerHTML = `
      <button class="secondary-btn" id="header-login-btn">Sign In</button>
      <button class="glow-btn" id="header-signup-btn">Get Started</button>
    `;
    // Rebind
    document.getElementById("header-login-btn").addEventListener("click", () => openAuthModal("login"));
    document.getElementById("header-signup-btn").addEventListener("click", () => openAuthModal("register"));
  }
}

// ==========================================
// ITINERARY GENERATOR ENGINE (ALGORITHM)
// ==========================================
const generatorForm = document.getElementById("itinerary-generator-form");
const generateBtn = document.getElementById("generate-itinerary-btn");

function getActivitiesForPref(destData, preferences, paceCount) {
  let matched = [];
  let unmatched = [];
  
  // Group activities based on matched categories
  Object.keys(destData.activities).forEach(cat => {
    const list = destData.activities[cat];
    if (preferences.includes(cat)) {
      matched = matched.concat(list);
    } else {
      unmatched = unmatched.concat(list);
    }
  });
  
  // Shuffle arrays to have variety
  matched.sort(() => 0.5 - Math.random());
  unmatched.sort(() => 0.5 - Math.random());
  
  // Join them prioritizing preferences
  let pool = matched.concat(unmatched);
  return pool;
}

function generateItinerary() {
  const destName = document.getElementById("trip-destination").value;
  const days = parseInt(document.getElementById("trip-days").value);
  const budget = parseFloat(document.getElementById("trip-budget").value);
  const accommodation = document.getElementById("trip-accommodation").value;
  const pace = document.getElementById("trip-activity-style").value;
  
  if (!destName || !days || !budget) {
    showToast("Please fill in all details to generate a plan.", "warning");
    return;
  }
  
  // Find destination details
  const destData = DESTINATIONS_DB.find(d => d.name === destName);
  if (!destData) {
    showToast("Destination data not found.", "error");
    return;
  }

  // Activity pace counts
  let paceCount = 3; // Balanced
  if (pace === "Relaxed") paceCount = 2;
  if (pace === "Packed") paceCount = 4;
  
  // Grab pool of activities
  const activityPool = getActivitiesForPref(destData, currentUser.preferences, paceCount * days);
  
  let schedule = [];
  let poolIndex = 0;
  
  // Setup standard base costs
  const hotelCostPerDay = destData.baseCost.accommodation[accommodation];
  const transitCostPerDay = destData.baseCost.transport;
  const foodCostPerDay = destData.baseCost.food;

  for (let d = 1; d <= days; d++) {
    let dayEvents = [];
    
    // 1. Morning Transport Event
    dayEvents.push({
      time: "08:30 AM",
      title: `Hotel Departure & Transit`,
      desc: `Depart hotel via local transport/ride-sharing to start today's itinerary route.`,
      cost: Math.round(transitCostPerDay * 0.4),
      category: "transportation",
      duration: "30 mins"
    });
    
    // 2. Meal: Breakfast (Included implicitly or explicitly)
    dayEvents.push({
      time: "09:00 AM",
      title: "Local Cafe Breakfast",
      desc: "Enjoy traditional breakfast and freshly brewed beverages.",
      cost: Math.round(foodCostPerDay * 0.25),
      category: "food",
      duration: "1 hour"
    });
    
    // Generate daily highlights based on activity counts
    let timeHours = 10.5; // Start main day activities at 10:30 AM
    
    for (let a = 0; a < paceCount; a++) {
      let activity = activityPool[poolIndex % activityPool.length];
      poolIndex++;
      
      // Format time string
      let hour = Math.floor(timeHours);
      let min = (timeHours % 1) === 0 ? "00" : "30";
      let ampm = hour >= 12 ? "PM" : "AM";
      let displayHour = hour > 12 ? hour - 12 : hour;
      if (displayHour === 0) displayHour = 12;
      
      dayEvents.push({
        time: `${displayHour}:${min} ${ampm}`,
        title: activity.title,
        desc: activity.desc,
        cost: activity.cost,
        category: "activity",
        duration: activity.duration
      });
      
      // Increment time (e.g. 2.5 hours)
      timeHours += 2.5;
      
      // Lunch insertion at mid-day
      if (a === 0) {
        dayEvents.push({
          time: "01:30 PM",
          title: "Gastronomy Lunch Spot",
          desc: "Taste the local dishes in a curated bistro.",
          cost: Math.round(foodCostPerDay * 0.35),
          category: "food",
          duration: "1 hour"
        });
        timeHours += 1; // account for lunch hour
      }
    }
    
    // Sunset Dinner insertion
    dayEvents.push({
      time: "07:30 PM",
      title: "Scenic Dinner Event",
      desc: "Premium restaurant dinner wrapping up the day's sights.",
      cost: Math.round(foodCostPerDay * 0.4),
      category: "food",
      duration: "2 hours"
    });

    // Daily hotel accommodation record
    dayEvents.push({
      time: "09:30 PM",
      title: `Overnight at ${accommodation} Stay`,
      desc: `Check-in / sleep at hotel accommodations. (Daily cost: $${hotelCostPerDay})`,
      cost: hotelCostPerDay,
      category: "accommodation",
      duration: "Overnight"
    });
    
    // Sort events by time index representation roughly
    schedule.push({
      day: d,
      events: dayEvents
    });
  }

  // Set global state
  currentGeneratedItinerary = {
    id: "trip_" + Date.now(),
    destination: destName,
    days: days,
    budget: budget,
    accommodation: accommodation,
    pace: pace,
    schedule: schedule
  };
  
  // Render output
  renderGeneratedItinerary();
  
  // Recalculate and display budget graphs
  recalculateBudgetDetails();
  
  // Scroll & show
  const outSection = document.getElementById("itinerary-output-section");
  outSection.style.display = "block";
  outSection.scrollIntoView({ behavior: "smooth" });
  
  showToast(`Personalized itinerary for ${destName} generated!`, "success");
}

generateBtn.addEventListener("click", generateItinerary);

// Render itinerary outputs
let activeDayTabIdx = 0;

function renderGeneratedItinerary() {
  if (!currentGeneratedItinerary) return;
  
  const destName = document.getElementById("out-dest-name");
  const duration = document.getElementById("out-duration");
  const budget = document.getElementById("out-budget");
  const style = document.getElementById("out-style");
  
  destName.textContent = `${currentGeneratedItinerary.destination} Itinerary`;
  duration.innerHTML = `<i class="fa-regular fa-calendar"></i> ${currentGeneratedItinerary.days} Days`;
  budget.innerHTML = `<i class="fa-solid fa-wallet"></i> Budget Limit: $${currentGeneratedItinerary.budget.toLocaleString()}`;
  style.innerHTML = `<i class="fa-solid fa-hotel"></i> ${currentGeneratedItinerary.accommodation} Accommodation`;
  
  // Render Tabs
  const tabContainer = document.getElementById("itinerary-day-tabs");
  tabContainer.innerHTML = "";
  
  for (let i = 0; i < currentGeneratedItinerary.days; i++) {
    const btn = document.createElement("button");
    btn.className = `day-tab-btn ${i === activeDayTabIdx ? "active" : ""}`;
    btn.textContent = `Day ${i + 1}`;
    btn.addEventListener("click", () => {
      activeDayTabIdx = i;
      renderActiveDayTimeline();
    });
    tabContainer.appendChild(btn);
  }
  
  // Render active day timeline
  renderActiveDayTimeline();
}

function renderActiveDayTimeline() {
  // Clear and update tabs visual classes
  const tabBtns = document.querySelectorAll("#itinerary-day-tabs .day-tab-btn");
  tabBtns.forEach((btn, idx) => {
    if (idx === activeDayTabIdx) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const timeline = document.getElementById("itinerary-timeline");
  timeline.innerHTML = "";
  
  const dayData = currentGeneratedItinerary.schedule[activeDayTabIdx];
  if (!dayData) return;
  
  dayData.events.forEach((event, eIdx) => {
    const eventCard = document.createElement("div");
    eventCard.className = "timeline-event";
    
    // Category visual badge config
    let badgeClass = "badge-primary";
    let iconClass = "fa-compass";
    if (event.category === "accommodation") { badgeClass = "badge-secondary"; iconClass = "fa-hotel"; }
    if (event.category === "transportation") { badgeClass = "badge-primary"; iconClass = "fa-plane"; }
    if (event.category === "food") { badgeClass = "badge-warning"; iconClass = "fa-utensils"; }
    if (event.category === "activity") { badgeClass = "badge-success"; iconClass = "fa-ticket"; }

    eventCard.innerHTML = `
      <div class="event-details">
        <span class="event-time">${event.time}</span>
        <h4>${event.title}</h4>
        <p>${event.desc}</p>
        <div class="event-meta">
          <span><i class="fa-regular fa-clock"></i> ${event.duration}</span>
          <span class="badge ${badgeClass}"><i class="fa-solid ${iconClass}"></i> ${event.category}</span>
        </div>
      </div>
      <div class="event-right">
        <span class="event-cost">$${event.cost}</span>
        <div class="event-actions">
          <button class="event-action-btn edit" onclick="triggerEditEvent(${activeDayTabIdx}, ${eIdx})" title="Edit event"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="event-action-btn delete" onclick="triggerDeleteEvent(${activeDayTabIdx}, ${eIdx})" title="Delete event"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    `;
    
    timeline.appendChild(eventCard);
  });
}

// Global actions exposed to window for inline HTML onclick calls
window.triggerDeleteEvent = function(dayIdx, eventIdx) {
  if (!currentGeneratedItinerary) return;
  
  const event = currentGeneratedItinerary.schedule[dayIdx].events[eventIdx];
  currentGeneratedItinerary.schedule[dayIdx].events.splice(eventIdx, 1);
  
  showToast(`Deleted event: ${event.title}`, "info");
  renderActiveDayTimeline();
  recalculateBudgetDetails();
};

window.triggerEditEvent = function(dayIdx, eventIdx) {
  if (!currentGeneratedItinerary) return;
  
  const event = currentGeneratedItinerary.schedule[dayIdx].events[eventIdx];
  
  // Fill edit modal fields
  document.getElementById("event-modal-title").textContent = "Edit Activity Details";
  document.getElementById("event-edit-day-idx").value = dayIdx;
  document.getElementById("event-edit-event-idx").value = eventIdx;
  
  document.getElementById("event-title").value = event.title;
  document.getElementById("event-time").value = event.time;
  document.getElementById("event-cost-val").value = event.cost;
  document.getElementById("event-duration").value = event.duration;
  document.getElementById("event-category").value = event.category;
  document.getElementById("event-desc").value = event.desc || "";
  
  // Open modal
  document.getElementById("event-modal-overlay").classList.add("active");
};

// Add Event Trigger
document.getElementById("timeline-add-event-btn").addEventListener("click", () => {
  if (!currentGeneratedItinerary) return;
  
  // Fill clean modal fields for new event
  document.getElementById("event-modal-title").textContent = "Add Custom Activity";
  document.getElementById("event-edit-day-idx").value = activeDayTabIdx;
  document.getElementById("event-edit-event-idx").value = -1; // Flag as new
  
  document.getElementById("event-title").value = "";
  document.getElementById("event-time").value = "12:00 PM";
  document.getElementById("event-cost-val").value = 15;
  document.getElementById("event-duration").value = "1.5 hours";
  document.getElementById("event-category").value = "activity";
  document.getElementById("event-desc").value = "";
  
  // Open modal
  document.getElementById("event-modal-overlay").classList.add("active");
});

// Cancel Event Edit Modal
document.getElementById("event-cancel-btn").addEventListener("click", () => {
  document.getElementById("event-modal-overlay").classList.remove("active");
});

// Submit Event Form
document.getElementById("timeline-event-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentGeneratedItinerary) return;
  
  const dayIdx = parseInt(document.getElementById("event-edit-day-idx").value);
  const eventIdx = parseInt(document.getElementById("event-edit-event-idx").value);
  
  const title = document.getElementById("event-title").value.trim();
  const time = document.getElementById("event-time").value.trim();
  const cost = parseFloat(document.getElementById("event-cost-val").value);
  const duration = document.getElementById("event-duration").value.trim();
  const category = document.getElementById("event-category").value;
  const desc = document.getElementById("event-desc").value.trim();
  
  if (eventIdx === -1) {
    // Add new event
    currentGeneratedItinerary.schedule[dayIdx].events.push({
      title, time, cost, duration, category, desc
    });
    showToast(`Added custom event: ${title}`, "success");
  } else {
    // Modify existing event
    const event = currentGeneratedItinerary.schedule[dayIdx].events[eventIdx];
    event.title = title;
    event.time = time;
    event.cost = cost;
    event.duration = duration;
    event.category = category;
    event.desc = desc;
    showToast(`Updated event: ${title}`, "success");
  }
  
  document.getElementById("event-modal-overlay").classList.remove("active");
  renderActiveDayTimeline();
  recalculateBudgetDetails();
});

// Print Itinerary Action
document.getElementById("print-itinerary-btn").addEventListener("click", () => {
  window.print();
});

// Download JSON Action
document.getElementById("download-json-btn").addEventListener("click", () => {
  if (!currentGeneratedItinerary) return;
  
  const filename = `${currentGeneratedItinerary.destination.replace(/[\s,]+/g, '_')}_itinerary.json`;
  const jsonStr = JSON.stringify(currentGeneratedItinerary, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Itinerary exported as JSON file successfully!", "info");
});

document.getElementById("save-itinerary-btn").addEventListener("click", async () => {
  if (!currentGeneratedItinerary) return;
  
  if (isBackendOnline && currentUser && currentUser.username !== "guest_partner") {
    try {
      const body = {
        id: currentGeneratedItinerary.id,
        userId: currentUser.id,
        destination: currentGeneratedItinerary.destination,
        days: currentGeneratedItinerary.days,
        budget: currentGeneratedItinerary.budget,
        accommodation: currentGeneratedItinerary.accommodation,
        pace: currentGeneratedItinerary.pace,
        schedule: currentGeneratedItinerary.schedule
      };
      
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (!res.ok) {
        showToast("Error saving trip to database.", "error");
        return;
      }
    } catch (err) {
      showToast("Network error syncing trip to database.", "error");
      return;
    }
  }
  
  // Avoid duplicate trip IDs in local state
  savedTrips = savedTrips.filter(t => t.id !== currentGeneratedItinerary.id);
  savedTrips.push(currentGeneratedItinerary);
  saveStateToStorage();
  
  showToast(`Trip to ${currentGeneratedItinerary.destination} saved successfully to profile!`, "success");
});

// ==========================================
// BUDGET PLANNER CALCULATOR
// ==========================================
function recalculateBudgetDetails() {
  if (!currentGeneratedItinerary) return;
  
  const limit = currentGeneratedItinerary.budget;
  let total = 0;
  
  let breakdown = {
    accommodation: 0,
    transportation: 0,
    food: 0,
    activity: 0
  };
  
  // Loop through all days and all events
  currentGeneratedItinerary.schedule.forEach(day => {
    day.events.forEach(event => {
      total += event.cost;
      if (breakdown.hasOwnProperty(event.category)) {
        breakdown[event.category] += event.cost;
      }
    } );
  });
  
  // Set UI summary numbers
  document.getElementById("budget-val-limit").textContent = `$${limit.toLocaleString()}`;
  document.getElementById("budget-val-total").textContent = `$${total.toLocaleString()}`;
  
  const diff = limit - total;
  const diffEl = document.getElementById("budget-val-diff");
  
  if (diff >= 0) {
    diffEl.textContent = `+$${diff.toLocaleString()}`;
    diffEl.style.color = "var(--color-success)";
  } else {
    diffEl.textContent = `-$${Math.abs(diff).toLocaleString()}`;
    diffEl.style.color = "var(--color-danger)";
  }
  
  // Set Warning Alert Panel
  const alertCard = document.getElementById("budget-status-alert");
  const alertIcon = document.getElementById("budget-alert-icon");
  const alertTitle = document.getElementById("budget-alert-title");
  const alertDesc = document.getElementById("budget-alert-desc");
  
  if (diff >= 0) {
    alertCard.className = "budget-alert-card success";
    alertIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    alertTitle.textContent = "Within Budget Limits";
    alertDesc.textContent = `Your travel plan is optimized perfectly. You are saving $${diff.toLocaleString()} under your budget limit!`;
  } else {
    alertCard.className = "budget-alert-card danger";
    alertIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    alertTitle.textContent = "Budget Limits Exceeded!";
    
    // AI-like suggestion
    let suggestionText = `You have exceeded your limit by $${Math.abs(diff).toLocaleString()}. We recommend `;
    if (breakdown.accommodation > limit * 0.4) {
      suggestionText += "changing accommodation style to a cheaper option, ";
    }
    suggestionText += "deleting secondary excursions, or editing dining costs on Day 1.";
    
    alertDesc.textContent = suggestionText;
    showToast("Budget threshold warning! Adjust expenses to stay within your limits.", "warning");
  }

  // Update progress bars
  const categories = ["hotel", "transport", "food", "activities"];
  const keys = ["accommodation", "transportation", "food", "activity"];
  
  categories.forEach((cat, idx) => {
    const key = keys[idx];
    const cost = breakdown[key];
    const pct = total > 0 ? Math.round((cost / total) * 100) : 0;
    
    document.getElementById(`bar-val-${cat}`).textContent = `$${cost}`;
    document.getElementById(`bar-pct-${cat}`).textContent = `${pct}%`;
    document.getElementById(`bar-fill-${cat}`).style.width = `${pct}%`;
  });
}

// ==========================================
// RECOMMENDATIONS ENGINE
// ==========================================
function renderRecommendations() {
  const container = document.getElementById("recommendations-grid-container");
  if (!container) return;
  
  container.innerHTML = "";
  
  // Map and score recommendations based on current user preferences
  const scoredDestinations = DESTINATIONS_DB.map(dest => {
    const overlapping = dest.tags.filter(t => currentUser.preferences.includes(t));
    const scorePct = Math.round((overlapping.length / dest.tags.length) * 100) || 30; // base rating 30%
    return { ...dest, matchScore: scorePct };
  });
  
  // Sort by match score
  scoredDestinations.sort((a, b) => b.matchScore - a.matchScore);
  
  scoredDestinations.forEach(dest => {
    const isWishlisted = wishlist.includes(dest.id);
    const card = document.createElement("div");
    card.className = "destination-card glass-panel";
    
    card.innerHTML = `
      <div class="dest-img-container">
        <img src="${dest.image}" alt="${dest.name}">
        <button class="dest-heart-btn ${isWishlisted ? "active" : ""}" onclick="toggleWishlist('${dest.id}')" title="Save to Favorites">
          <i class="${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i>
        </button>
        <span class="dest-match-badge">${dest.matchScore}% Match</span>
      </div>
      <div class="dest-content">
        <div class="dest-title-row">
          <h4>${dest.name}</h4>
          <span class="dest-rating"><i class="fa-solid fa-star"></i> 4.8</span>
        </div>
        <p>${dest.description}</p>
        <div class="dest-tags">
          ${dest.tags.slice(0, 3).map(t => `<span class="badge badge-secondary">${t}</span>`).join('')}
        </div>
        <div class="dest-footer">
          <span class="dest-price">$${dest.baseCost.accommodation["Mid-range"]} <span>/ night stay</span></span>
          <button class="glow-btn" style="padding: 6px 14px; font-size: 0.8rem;" onclick="preFillPlanner('${dest.name}')">Plan Trip</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

window.toggleWishlist = async function(destId) {
  if (isBackendOnline && currentUser && currentUser.username !== "guest_partner") {
    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, destId })
      });
      if (res.ok) {
        wishlist = await res.json();
        const isWishlisted = wishlist.includes(destId);
        showToast(isWishlisted ? "Saved destination to Wishlist!" : "Removed from Wishlist", isWishlisted ? "success" : "info");
      } else {
        showToast("Error updating wishlist on database.", "error");
      }
    } catch (err) {
      showToast("Network error syncing wishlist.", "error");
    }
  } else {
    if (wishlist.includes(destId)) {
      wishlist = wishlist.filter(id => id !== destId);
      showToast("Removed from Wishlist", "info");
    } else {
      wishlist.push(destId);
      showToast("Saved destination to Wishlist!", "success");
    }
  }
  
  saveStateToStorage();
  renderRecommendations();
  renderFavoritesList();
};

window.preFillPlanner = function(destName) {
  document.getElementById("trip-destination").value = destName;
  switchDashboardPanel("planner");
  showToast(`Prefilled planner for ${destName}!`, "info");
};

// ==========================================
// WISHLIST & FAVORITES PANEL
// ==========================================
function renderFavoritesList() {
  const container = document.getElementById("favorites-grid-container");
  if (!container) return;
  
  container.innerHTML = "";
  
  const favItems = DESTINATIONS_DB.filter(d => wishlist.includes(d.id));
  
  if (favItems.length === 0) {
    container.innerHTML = `
      <div class="glass-panel" style="grid-column: 1 / -1; padding: 40px; text-align: center;">
        <i class="fa-regular fa-heart" style="font-size: 3rem; color: var(--text-dimmed); margin-bottom: 15px; display: block;"></i>
        <h3>No Favorited Destinations</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">Browse recommendations and click the heart icon to start building a wishlist!</p>
        <button class="glow-btn" onclick="switchDashboardPanel('recommendations')">Browse Recommendations</button>
      </div>
    `;
    return;
  }
  
  favItems.forEach(dest => {
    const card = document.createElement("div");
    card.className = "destination-card glass-panel";
    
    card.innerHTML = `
      <div class="dest-img-container">
        <img src="${dest.image}" alt="${dest.name}">
        <button class="dest-heart-btn active" onclick="toggleWishlist('${dest.id}')">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
      <div class="dest-content">
        <div class="dest-title-row">
          <h4>${dest.name}</h4>
        </div>
        <p>${dest.description}</p>
        <div class="dest-footer">
          <span class="dest-price">Budget Stay: $${dest.baseCost.accommodation.Budget}/n</span>
          <button class="glow-btn" style="padding: 6px 14px; font-size: 0.8rem;" onclick="preFillPlanner('${dest.name}')">Plan Trip</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================
// REVIEWS & COMMUNITY FEED
// ==========================================
let reviewSelectedStars = 5;

// Bind star picker
document.querySelectorAll("#rating-star-picker span").forEach(star => {
  star.addEventListener("click", () => {
    const num = parseInt(star.getAttribute("data-star"));
    reviewSelectedStars = num;
    
    // Visual toggle
    document.querySelectorAll("#rating-star-picker span").forEach(s => {
      const sNum = parseInt(s.getAttribute("data-star"));
      if (sNum <= num) {
        s.className = "selected";
        s.innerHTML = '<i class="fa-solid fa-star"></i>';
      } else {
        s.className = "";
        s.innerHTML = '<i class="fa-regular fa-star"></i>';
      }
    });
  });
});

// Review submit button
document.getElementById("submit-review-btn").addEventListener("click", async () => {
  const destName = document.getElementById("review-dest-name").value.trim();
  const authorName = document.getElementById("review-author").value.trim();
  const feedback = document.getElementById("review-text").value.trim();
  
  if (!destName || !authorName || !feedback) {
    showToast("Please fill in all details to post a review.", "warning");
    return;
  }
  
  if (isBackendOnline) {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: authorName,
          destination: destName,
          stars: reviewSelectedStars,
          text: feedback
        })
      });
      
      if (res.ok) {
        const addedReview = await res.json();
        MOCK_REVIEWS.unshift(addedReview);
      } else {
        showToast("Error saving review to database.", "error");
        return;
      }
    } catch (err) {
      showToast("Network error submitting review.", "error");
      return;
    }
  } else {
    const newReview = {
      id: Date.now(),
      author: authorName,
      destination: destName,
      stars: reviewSelectedStars,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      text: feedback
    };
    
    MOCK_REVIEWS.unshift(newReview);
    saveStateToStorage();
  }
  
  // Clear inputs
  document.getElementById("review-dest-name").value = "";
  document.getElementById("review-author").value = "";
  document.getElementById("review-text").value = "";
  
  renderReviewsList();
  showToast("Your review has been securely posted!", "success");
});

function renderReviewsList() {
  const container = document.getElementById("community-reviews-list");
  if (!container) return;
  
  container.innerHTML = "";
  
  let totalStars = 0;
  
  MOCK_REVIEWS.forEach(review => {
    totalStars += review.stars;
    const card = document.createElement("div");
    card.className = "review-item-card glass-panel";
    
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= review.stars) {
        starsHtml += '<i class="fa-solid fa-star"></i> ';
      } else {
        starsHtml += '<i class="fa-regular fa-star"></i> ';
      }
    }
    
    card.innerHTML = `
      <div class="review-item-header">
        <div class="reviewer-profile">
          <div class="reviewer-avatar">${review.author.charAt(0).toUpperCase()}</div>
          <div class="reviewer-name">
            <h5>${review.author}</h5>
            <span>Visited: <b>${review.destination}</b> • ${review.date}</span>
          </div>
        </div>
        <div class="reviewer-stars">
          ${starsHtml}
        </div>
      </div>
      <p>"${review.text}"</p>
    `;
    container.appendChild(card);
  });
  
  // Calculate average
  const avg = MOCK_REVIEWS.length > 0 ? (totalStars / MOCK_REVIEWS.length).toFixed(1) : 0;
  document.getElementById("reviews-avg-rating").textContent = avg;
  document.getElementById("reviews-count-text").textContent = `Based on ${MOCK_REVIEWS.length} reviews`;
}

// ==========================================
// BOOTSTRAP INITIALIZATION
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  loadAppData();
});
