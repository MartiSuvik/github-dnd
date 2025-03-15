// Define Subcategory structure
export interface Subcategory {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    parentId: number;
  }
  
  // Define Category structure
  export interface Category {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    hasSubcategories: boolean;
    subcategories?: Subcategory[];
  }
  
  // Combined type for display flexibility
  export type DisplayItem = Category | Subcategory;
  
  // Main categories with subcategories
  export const mainCategories: Category[] = [
    {
      id: 1,
      title: "KITCHEN",
      subtitle: "Culinary Excellence",
      description: "Luxury kitchens designed for functionality, aesthetics, and efficiency. Tailored to meet modern culinary demands with premium materials and craftsmanship.",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Kitchen%20Interiors%20%E2%80%93%20Custom%20Cabinetry%20and%20Marble%20Finishes.avif",
      hasSubcategories: true,
      subcategories: [
        {
          id: 101,
          title: "MODERN",
          subtitle: "Contemporary Kitchen",
          description: "Clean lines, high-end appliances, and minimalist design create a modern culinary experience.",
          image: "https://res.cloudinary.com/designcenter/image/upload/Home/Product_2/Kitchen/Modern/Kitchen_Modern_8.avif",
          parentId: 1,
        },
        {
          id: 102,
          title: "TRADITIONAL",
          subtitle: "Classic Kitchen",
          description: "Timeless elegance with rich wooden cabinetry, intricate moldings, and warm tones.",
          image: "https://res.cloudinary.com/designcenter/image/upload/Home/Product_2/Kitchen/Traditional/Kitchen_Traditional_8.avif",
          parentId: 1,
        },
        {
          id: 103,
          title: "ART_DECO",
          subtitle: "Artistic Kitchen",
          description: "Bold geometric patterns, luxurious metals, and glamorous finishes define this artistic space.",
          image: "https://res.cloudinary.com/designcenter/image/upload/Home/Product_2/Kitchen/Art_Deco/Kitchen_Art_Deco_16.avif",
          parentId: 1,
        },
      ],
    },
    {
      id: 2,
      title: "FURNITURE",
      subtitle: "Elegant Comfort",
      description: "Experience the perfect blend of luxury and functionality with handcrafted bespoke furniture, tailored for sophisticated living spaces.",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Living%20Room%20Design%20%E2%80%93%20Custom%20Sofas%20and%20Decor%20NYC.avif",
      hasSubcategories: true,
      subcategories: [
        {
          id: 201,
          title: "LIVING ROOM",
          subtitle: "Living Space",
          description: "Refined living room furniture designed to bring timeless elegance and comfort to your home.",
          image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Living%20Room%20Design%20%E2%80%93%20Custom%20Sofas%20and%20Decor%20NYC.avif",
          parentId: 2,
        },
        {
          id: 202,
          title: "DINING ROOM",
          subtitle: "Dining Space",
          description: "Exquisite handcrafted dining tables and seating, creating the perfect ambiance for memorable gatherings.",
          image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Dining%20Room%20Furniture%20%E2%80%93%20Custom%20Tables%20and%20Seating.avif",
          parentId: 2,
        },
        {
          id: 203,
          title: "BEDROOM",
          subtitle: "Bedroom Space",
          description: "Bespoke bedroom furniture crafted for serenity, luxury, and exceptional comfort.",
          image: "https://res.cloudinary.com/designcenter/image/upload/Custom%20Luxury%20Bedroom%20Design%20%E2%80%93%20High-End%20Interiors%20NYC.avif",
          parentId: 2,
        },
      ],
    },
    {
      id: 3,
      title: "LIGHT",
      subtitle: "Outshine the Standard",
      description: "Illuminate your interiors with premium lighting designs, blending innovation and elegance to create stunning atmospheres.",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Lighting%20Design%20%E2%80%93%20Modern%20Fixtures%20for%20High-End%20Homes.avif",
      hasSubcategories: false,
    },
    {
      id: 4,
      title: "BATH",
      subtitle: "Inner Peace of Italy",
      description: "Transform your bathroom into a spa-like retreat with exquisite materials, luxury vanities, and sophisticated fixtures.",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Bathroom%20Design%20%E2%80%93%20Bespoke%20Vanities%20and%20Interiors.avif",
      hasSubcategories: false,
    },
    {
      id: 5,
      title: "OUTDOOR",
      subtitle: "Outdoor Elegance",
      description: "Bespoke outdoor furniture and designs for relaxation, entertaining, and luxury alfresco living.",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Outdoor%20Furniture%20%E2%80%93%20Custom%20Patio%20and%20Terrace%20Designs.avif",
      hasSubcategories: false,
    },
    {
      id: 6,
      title: "OFFICE",
      subtitle: "Calming Office",
      description: "Elevate your workspace with premium office furniture designed for productivity, elegance, and comfort.",
      image: "https://res.cloudinary.com/designcenter/image/upload/Bespoke%20Office%20Furniture%20%E2%80%93%20Luxury%20Workspaces%20NYC.avif",
      hasSubcategories: false,
    },
  ];
  