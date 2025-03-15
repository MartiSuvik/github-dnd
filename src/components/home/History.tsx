// Define HistoryMilestone type
export interface HistoryMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

// Milestone Data
export const milestones: HistoryMilestone[] = [
  {
    year: "2025",
    title: "Sustainable Initiative",
    description: "Launched our commitment to sustainable luxury design.",
    image: "https://res.cloudinary.com/designcenter/image/upload/Sustainable%20Interior%20Design%20%E2%80%93%20Eco-Friendly%20Luxury%20Spaces.avif",
    alt: "Hand-drawn architectural concept of a sustainable interior design project by D&D Design Center.",
  },
  {
    year: "2020",
    title: "Luxury Showroom Expansion",
    description: "Expanded our high-end showroom with modern installations.",
    image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Furniture%20Showroom%20Expansion%20%E2%80%93%20Brooklyn%20and%20NYC.avif",
    alt: "High-end furniture showroom expansion with modern wooden installations and architectural lighting.",
  },
  {
    year: "2015",
    title: "Design Excellence Award",
    description: "Received prestigious recognition for innovative design solutions.",
    image: "https://res.cloudinary.com/designcenter/image/upload/Award-Winning%20Custom%20Furniture%20and%20Interior%20Design%20NYC.avif",
    alt: "Gold-toned architectural design detail representing an award-winning bespoke furniture project in NYC.",
  },
  {
    year: "2006",
    title: "Foundation",
    description: "D&D Design Center was established in New York, USA.",
    image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Custom%20Furniture%20in%20New%20York%20City%20%E2%80%93%20Brooklyn%20Design%20Experts.avif",
    alt: "Scenic view of New York City featuring iconic architecture, symbolizing D&D Design Center's influence in bespoke furniture.",
  },
];
