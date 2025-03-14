import { cn } from "../../lib/utils";

export interface TestimonialAuthor {
  name: string;
}

interface TestimonialCardProps {
  author: TestimonialAuthor;
  rating?: string;
  text: string;
  href?: string;
}

export function TestimonialCard({ author, rating, text, href }: TestimonialCardProps) {
  return (
    <div className={cn(
      "flex flex-col gap-4",
      "w-[320px] p-6 rounded-xl",
      "bg-white shadow-lg",
      "border border-gray-100",
      "hover:shadow-xl transition-shadow duration-300"
    )}>
      <div>
        <div className="font-medium text-gray-900">{author.name}</div>
        {rating && (
          <div className="text-sm text-[#C5A267] font-semibold">{rating}</div>
        )}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">
        {text || "Customer only provided a positive review"}
      </p>
      {href && (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer" 
          className="text-sm text-[#C5A267] hover:text-[#B49157] transition-colors duration-200"
        >
          View on Google
        </a>
      )}
    </div>
  );
}
