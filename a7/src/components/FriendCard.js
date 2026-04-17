import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function FriendCard({ friend }) {
  const statusColors = {
    "overdue": "bg-red-500 text-white",
    "almost due": "bg-orange-400 text-white",
    "on-track": "bg-brand text-white"
  };

  return (
    <Link href={`/friend/${friend.id}`}>
      <div className="glass-card p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer h-full">
        <div className="relative w-24 h-24 mb-4">
          <Image 
            src={friend.picture} 
            alt={friend.name}
            width={100}
            style={{width: "100%",height: "100%"}}
            loading="lazy"  
            height={100}
            className="rounded-full object-cover w-full h-full border-4 border-white shadow-sm"
          />
        </div>
        
        <h3 className="text-lg font-bold text-slate-800">{friend.name}</h3>
        <p className="text-sm text-slate-500 mb-4">{friend.days_since_contact}d ago</p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-6 mt-auto">
          {friend.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-green-50 text-brand-light text-xs font-semibold rounded-full uppercase tracking-wide">
              {tag}
            </span>
          ))}
        </div>
        
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize tracking-wide ${statusColors[friend.status]}`}>
          {friend.status.replace("-", " ")}
        </div>
      </div>
    </Link>
  );
}
