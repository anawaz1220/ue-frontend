// src/data/dummyServicesData.js

const dummyServicesData = [
    {
      id: "serv001",
      name: "Premium Haircut & Styling",
      category: "Hair treatments",
      price: 75.00,
      duration: { hours: 1, minutes: 15 },
      description: "Complete haircut and styling service with wash and blow dry.",
      itemsNeededByCustomer: ["Preferred hairstyle reference (optional)"],
      itemsBusinessWillBring: ["Professional hair scissors", "Styling products", "Hair dryer", "Styling tools"],
      serviceProcedure: [
        "Hair analysis and consultation",
        "Hair wash with premium shampoo and conditioner",
        "Precision haircut based on face shape and preferences",
        "Blow dry and styling",
        "Finishing touches with quality styling products"
      ],
      isActive: true,
      rating: 4.9,
      reviewCount: 87
    },
    {
      id: "serv002",
      name: "Deluxe Korean Glass Skin Facial",
      category: "Korean facial services",
      price: 120.00,
      duration: { hours: 1, minutes: 30 },
      description: "Advanced 10-step Korean skincare facial for radiant, glass-like skin.",
      itemsNeededByCustomer: ["Clean face (makeup removed)", "Information about skin allergies"],
      itemsBusinessWillBring: [
        "Korean skincare products",
        "Facial steamer",
        "LED light therapy device",
        "Facial massage tools",
        "Disposable facial towels"
      ],
      serviceProcedure: [
        "Skin analysis and consultation",
        "Double cleansing with oil-based and water-based cleansers",
        "Gentle exfoliation",
        "Facial steaming",
        "Essence application",
        "Sheet mask treatment",
        "Serum application",
        "Eye cream application",
        "Moisturizing",
        "SPF application (daytime) or sleeping mask (evening)"
      ],
      isActive: true,
      rating: 4.8,
      reviewCount: 65
    },
    {
      id: "serv003",
      name: "Full Body Waxing Package",
      category: "Waxing services",
      price: 160.00,
      duration: { hours: 2, minutes: 0 },
      description: "Complete body waxing including arms, legs, back, and bikini area.",
      itemsNeededByCustomer: ["Clean, dry skin", "Comfortable loose clothing to wear afterwards"],
      itemsBusinessWillBring: [
        "Premium waxing products",
        "Pre and post-waxing skincare products",
        "Disposable materials",
        "Sanitized equipment"
      ],
      serviceProcedure: [
        "Skin preparation with cleansing",
        "Application of pre-waxing oil or powder",
        "Waxing in sections with professional technique",
        "Post-waxing soothing treatment",
        "Aftercare instructions"
      ],
      isActive: true,
      rating: 4.7,
      reviewCount: 42
    },
    {
      id: "serv004",
      name: "Ayurvedic Facial with Herbs",
      category: "Ayurvedic facial services",
      price: 95.00,
      duration: { hours: 1, minutes: 0 },
      description: "Traditional Ayurvedic facial using natural herbs and oils based on dosha type.",
      itemsNeededByCustomer: ["Clean face", "Information about skin sensitivities"],
      itemsBusinessWillBring: [
        "Ayurvedic herbs and oils",
        "Natural ubtan mixtures",
        "Steam equipment",
        "Pure rose water",
        "Organic facial oils"
      ],
      serviceProcedure: [
        "Dosha (body constitution) assessment",
        "Gentle cleansing with herbal wash",
        "Exfoliation with natural ubtan",
        "Facial massage with dosha-specific oils",
        "Herbal face pack application",
        "Steam treatment",
        "Rose water toning",
        "Moisturizing with natural oils"
      ],
      isActive: true,
      rating: 4.6,
      reviewCount: 38
    },
    {
      id: "serv005",
      name: "Deluxe Manicure & Pedicure Combo",
      category: "Pedicure and manicure services",
      price: 85.00,
      duration: { hours: 1, minutes: 45 },
      description: "Complete hand and foot care treatment with premium products and nail polish.",
      itemsNeededByCustomer: ["Removed old nail polish (if applicable)"],
      itemsBusinessWillBring: [
        "Professional nail care kit",
        "Premium nail polishes",
        "Foot and hand soak materials",
        "Exfoliating scrubs",
        "Moisturizing masks and lotions"
      ],
      serviceProcedure: [
        "Nail analysis and consultation",
        "Warm soak for hands and feet",
        "Gentle exfoliation",
        "Cuticle care",
        "Nail shaping",
        "Relaxing hand and foot massage",
        "Moisturizing mask application",
        "Nail polish application",
        "Quick-dry topcoat"
      ],
      isActive: true,
      rating: 4.8,
      reviewCount: 56
    },
    {
      id: "serv006",
      name: "Complete Spa Day Package",
      category: "Service packages",
      price: 250.00,
      duration: { hours: 4, minutes: 0 },
      description: "Comprehensive spa package including facial, massage, hair treatment, and nail care.",
      itemsNeededByCustomer: ["Clean skin", "Comfortable clothing"],
      itemsBusinessWillBring: [
        "Full professional spa setup",
        "Premium skincare products",
        "Massage oils and equipment",
        "Hair treatment products",
        "Nail care kit"
      ],
      serviceProcedure: [
        "Initial consultation",
        "Relaxing facial treatment",
        "Full body massage",
        "Hair treatment mask and styling",
        "Manicure and pedicure",
        "Light refreshments",
        "Personalized skincare recommendations"
      ],
      isActive: true,
      rating: 4.9,
      reviewCount: 29
    }
  ];
  
  export default dummyServicesData;