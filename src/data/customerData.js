// src/data/customerData.js
export const customerData = {
    profile: {
      id: "cust_12345",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "+1 705-123-4567",
      profilePicture: "/images/profile-placeholder.jpg",
      joinedDate: "2024-01-15",
      addresses: [
        {
          id: "addr_1",
          type: "Home",
          street: "123 Pine Street",
          city: "Sudbury",
          state: "Ontario",
          zipCode: "P3A 1A1",
          isDefault: true
        },
        {
          id: "addr_2",
          type: "Office",
          street: "45 Business Park, Suite 302",
          city: "Sudbury",
          state: "Ontario",
          zipCode: "P3E 5C1",
          isDefault: false
        }
      ]
    },
    
    wallet: {
      balance: 125.50,
      transactions: [
        {
          id: "trans_1",
          date: "2025-03-18",
          amount: 50.00,
          type: "credit",
          description: "Referral bonus"
        },
        {
          id: "trans_2",
          date: "2025-03-10",
          amount: -75.00,
          type: "debit",
          description: "Payment for Haircut & Style"
        },
        {
          id: "trans_3",
          date: "2025-02-25",
          amount: 150.00,
          type: "credit",
          description: "Wallet top-up"
        },
        {
          id: "trans_4",
          date: "2025-02-15",
          amount: -95.50,
          type: "debit",
          description: "Payment for Manicure & Pedicure"
        },
        {
          id: "trans_5",
          date: "2025-02-01",
          amount: 100.00,
          type: "credit",
          description: "Promotional credit"
        }
      ]
    },
    
    currentBookings: [
      {
        id: "book_1",
        serviceName: "Luxury Facial Treatment",
        businessName: "Glow Spa & Beauty",
        date: "2025-04-05",
        time: "14:00",
        price: 120.00,
        status: "confirmed",
        address: {
          type: "Home",
          street: "123 Pine Street",
          city: "Sudbury",
          state: "Ontario",
          zipCode: "P3A 1A1"
        }
      },
      {
        id: "book_2",
        serviceName: "Men's Haircut",
        businessName: "Modern Cuts",
        date: "2025-04-12",
        time: "10:30",
        price: 45.00,
        status: "pending",
        address: {
          type: "Office",
          street: "45 Business Park, Suite 302",
          city: "Sudbury",
          state: "Ontario",
          zipCode: "P3E 5C1"
        }
      }
    ],
    
    serviceHistory: [
      {
        id: "serv_1",
        serviceName: "Premium Manicure",
        businessName: "Nail Art Studio",
        date: "2025-03-15",
        time: "13:00",
        price: 55.00,
        rating: 5,
        status: "completed",
        address: {
          type: "Home",
          street: "123 Pine Street"
        }
      },
      {
        id: "serv_2",
        serviceName: "Hair Coloring",
        businessName: "Color Me Beautiful",
        date: "2025-03-02",
        time: "11:00",
        price: 130.00,
        rating: 4,
        status: "completed",
        address: {
          type: "Home",
          street: "123 Pine Street"
        }
      },
      {
        id: "serv_3",
        serviceName: "Deep Tissue Massage",
        businessName: "Relaxation Therapy",
        date: "2025-02-20",
        time: "16:30",
        price: 90.00,
        rating: 5,
        status: "completed",
        address: {
          type: "Office",
          street: "45 Business Park"
        }
      },
      {
        id: "serv_4",
        serviceName: "Men's Haircut",
        businessName: "Modern Cuts",
        date: "2025-02-10",
        time: "09:00",
        price: 45.00,
        rating: 4,
        status: "completed",
        address: {
          type: "Home",
          street: "123 Pine Street"
        }
      },
      {
        id: "serv_5",
        serviceName: "Full Body Waxing",
        businessName: "Smooth Skin Center",
        date: "2025-01-28",
        time: "14:00",
        price: 110.00,
        rating: 3,
        status: "completed",
        address: {
          type: "Home",
          street: "123 Pine Street"
        }
      },
      {
        id: "serv_6",
        serviceName: "Eyebrow Threading",
        businessName: "Perfect Brows",
        date: "2025-01-15",
        time: "11:30",
        price: 25.00,
        rating: 5,
        status: "completed",
        address: {
          type: "Office",
          street: "45 Business Park"
        }
      },
      {
        id: "serv_7",
        serviceName: "Pedicure",
        businessName: "Nail Art Studio",
        date: "2025-01-05",
        time: "15:00",
        price: 50.00,
        rating: 4,
        status: "completed",
        address: {
          type: "Home",
          street: "123 Pine Street"
        }
      },
      {
        id: "serv_8",
        serviceName: "Facial Cleanup",
        businessName: "Glow Spa & Beauty",
        date: "2024-12-26",
        time: "10:00",
        price: 60.00,
        rating: 4,
        status: "completed",
        address: {
          type: "Home",
          street: "123 Pine Street"
        }
      },
      {
        id: "serv_9",
        serviceName: "Hair Styling",
        businessName: "Color Me Beautiful",
        date: "2024-12-15",
        time: "12:00",
        price: 65.00,
        rating: 5,
        status: "completed",
        address: {
          type: "Home",
          street: "123 Pine Street"
        }
      },
      {
        id: "serv_10",
        serviceName: "Relaxation Massage",
        businessName: "Relaxation Therapy",
        date: "2024-12-05",
        time: "17:00",
        price: 80.00,
        rating: 5,
        status: "completed",
        address: {
          type: "Office",
          street: "45 Business Park"
        }
      },
      {
        id: "serv_11",
        serviceName: "Men's Haircut & Beard Trim",
        businessName: "Modern Cuts",
        date: "2024-11-28",
        time: "09:30",
        price: 60.00,
        rating: 4,
        status: "completed",
        address: {
          type: "Home",
          street: "123 Pine Street"
        }
      },
      {
        id: "serv_12",
        serviceName: "Spa Package",
        businessName: "Glow Spa & Beauty",
        date: "2024-11-15",
        time: "13:00",
        price: 200.00,
        rating: 5,
        status: "completed",
        address: {
          type: "Home",
          street: "123 Pine Street"
        }
      }
    ],
    
    stats: {
      totalServices: 30,
      pendingServices: 2,
      totalSpent: 1845.50,
      favoriteService: "Men's Haircut",
      favoriteBusinesses: ["Modern Cuts", "Glow Spa & Beauty"]
    }
  };