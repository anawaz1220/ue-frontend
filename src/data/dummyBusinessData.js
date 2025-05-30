// src/data/dummyBusinessData.js

const dummyBusinessData = {
    id: "b12345",
    name: "Elegant Styles Salon",
    logo: "/images/ue.png", // Using the placeholder image you provided
    address: "123 Cedar Street, Sudbury, Ontario",
    city: "Sudbury",
    province: "Ontario",
    postalCode: "P3E 1A1",
    phone: "+1 (705) 123-4567",
    email: "contact@elegantstyles.com",
    website: "www.elegantstyles.com",
    description: "Elegant Styles is a premium salon offering a wide range of beauty services. We specialize in hair styling, facials, and body treatments with highly trained professionals using top-quality products.",
    operatingHours: [
      { day: "Monday", hours: "9:00 AM - 7:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 7:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 7:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 8:00 PM" },
      { day: "Friday", hours: "9:00 AM - 8:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    rating: 4.8,
    reviewsCount: 127,
    metrics: {
      totalEarnings: 45750.00,
      totalJobsCompleted: 312,
      totalJobsInProgress: 8,
      jobsThisMonth: 42,
      earningsThisMonth: 6320.00,
      averageRating: 4.8
    },
    socialMedia: {
      facebook: "facebook.com/elegantstyles",
      instagram: "instagram.com/elegantstyles",
      twitter: "twitter.com/elegantstyles"
    },
    registeredSince: "2024-01-15",
    businessOwner: {
      name: "Sarah Johnson",
      phone: "+1 (705) 987-6543",
      email: "sarah@elegantstyles.com"
    },
    staff: [
      { id: "s1", name: "Maria Lopez", role: "Hair Stylist", specialization: "Coloring" },
      { id: "s2", name: "David Chen", role: "Beautician", specialization: "Facials" },
      { id: "s3", name: "Priya Singh", role: "Nail Technician", specialization: "Manicures" },
      { id: "s4", name: "James Wilson", role: "Massage Therapist", specialization: "Deep Tissue" }
    ]
  };
  
  export default dummyBusinessData;