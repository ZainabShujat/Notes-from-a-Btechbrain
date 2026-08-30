export type CareerDomain = {
  id: string;
  name: string;
  examples: string[];
};

export const DOMAINS: CareerDomain[] = [
  { id: "software", name: "Software & Digital Systems", examples: ["Software Engineer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "Cloud Engineer"] },
  { id: "medicine", name: "Medicine & Clinical Care", examples: ["Doctor", "Surgeon", "Nurse", "Pharmacist", "Physiotherapist"] },
  { id: "mental-health", name: "Mental Health & Human Support", examples: ["Psychologist", "Therapist", "Counselor", "Psychiatrist", "Occupational Therapist"] },
  { id: "education", name: "Teaching & Education", examples: ["School Teacher", "Professor", "Curriculum Designer", "Special Educator", "Academic Counselor"] },
  { id: "law", name: "Law & Justice", examples: ["Lawyer", "Judge", "Forensic Expert", "Public Prosecutor", "Legal Advisor"] },
  { id: "government", name: "Government & Bureaucracy", examples: ["IAS Officer", "IPS Officer", "Railway Officer", "Public Administrator", "Diplomat"] },
  { id: "finance", name: "Finance & Accounting", examples: ["Chartered Accountant", "Auditor", "Tax Consultant", "Actuary", "Financial Analyst"] },
  { id: "startups", name: "Startups & Business Operations", examples: ["Entrepreneur", "Business Analyst", "Operations Manager", "HR Manager", "Product Manager"] },
  { id: "journalism", name: "Journalism & Public Communication", examples: ["Journalist", "Editor", "News Anchor", "PR Professional", "Translator"] },
  { id: "film", name: "Film, Media & Storytelling", examples: ["Filmmaker", "Screenwriter", "Actor", "Cinematographer", "Video Editor"] },
  { id: "design", name: "Design & Visual Creativity", examples: ["Graphic Designer", "Animator", "UI/UX Designer", "Fashion Designer", "Illustrator"] },
  { id: "human-behavior", name: "Human Behavior & Society", examples: ["Sociologist", "Anthropologist", "Behavioral Scientist", "Political Analyst", "UX Researcher"] },
  { id: "politics", name: "Politics & Policy", examples: ["Politician", "Policy Analyst", "Economist", "Election Strategist", "Social Worker"] },
  { id: "science", name: "Science & Research", examples: ["Physicist", "Biotechnologist", "Neuroscientist", "Chemist", "Microbiologist"] },
  { id: "space", name: "Space, Aerospace & Advanced Tech", examples: ["Aerospace Engineer", "Robotics Engineer", "Astronomer", "AI Researcher", "Drone Engineer"] },
  { id: "civil", name: "Civil Infrastructure & Urban Life", examples: ["Civil Engineer", "Architect", "Urban Planner", "Surveyor", "Structural Engineer"] },
  { id: "transport", name: "Transport & Logistics", examples: ["Truck Driver", "Logistics Manager", "Warehouse Worker", "Pilot", "Railway Operator"] },
  { id: "agriculture", name: "Agriculture & Food Systems", examples: ["Farmer", "Agricultural Scientist", "Dairy Specialist", "Food Technologist", "Fisheries Officer"] },
  { id: "environment", name: "Environment & Conservation", examples: ["Environmental Scientist", "Climatologist", "Forestry Officer", "Wildlife Conservationist", "Ecologist"] },
  { id: "skilled-trades", name: "Skilled Technical Trades", examples: ["Electrician", "Welder", "Plumber", "Carpenter", "Mechanic"] },
  { id: "service", name: "Service & Everyday Labor", examples: ["Sanitation Worker", "Domestic Worker", "Tailor", "Barber", "Cook"] },
  { id: "hospitality", name: "Hospitality & Tourism", examples: ["Chef", "Hotel Manager", "Baker", "Travel Planner", "Event Manager"] },
  { id: "internet", name: "Internet & Creator Economy", examples: ["YouTuber", "Content Strategist", "Streamer", "Social Media Manager", "Community Manager"] },
  { id: "rare", name: "Rare & Lesser-Known Careers", examples: ["Museum Curator", "Paleontologist", "Archivist", "Marine Biologist", "Restoration Artist"] },
  { id: "emerging", name: "Interdisciplinary & Emerging Careers", examples: ["Bioinformatician", "Computational Linguist", "AI Ethicist", "HCI Researcher", "Science Communicator"] },
];

export const PHASE_2 = [
  "Why Some Careers Become Prestige Symbols",
  "Why India Pushes Stability So Hard",
  "Why Some Careers Earn More Than Others",
  "Why Emotionally Exhausting Careers Are Often Underpaid",
  "Why Some People Choose Passion Over Stability",
  "Why Some Careers Consume Your Entire Identity",
  "Why Burnout Is Normalized in Certain Industries",
  "Why Some Careers Have Better Work-Life Balance",
  "Why Society Notices Some Jobs More Than Others",
  "Why So Many Students Feel Lost While Choosing Careers",
];

export const PHASE_3 = [
  "Government Jobs vs Startup Culture",
  "Doctor vs Software Engineer",
  "Creative Careers vs Corporate Careers",
  "Research vs Entrepreneurship",
  "Careers Built Around People vs Careers Built Around Systems",
  "High Stability Careers vs High Freedom Careers",
  "White Collar Work vs Blue Collar Work",
  "Careers Society Romanticizes vs Careers Society Depends On",
];

export const PHASE_4 = [
  "Why We Attach Self-Worth to Work",
  "Why Some Careers Feel Meaningful Despite Lower Salaries",
  "Why Different Careers Change the Way People Think",
  "Why Career Choices Are Never Just About Careers",
  "What I Learned After Exploring So Many Different Lives Through Work",
  "The Kind of Life I Think I Want",
];
