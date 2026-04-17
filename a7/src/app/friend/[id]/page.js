"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { Phone, MessageSquare, Video, BellRing, Archive, Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";

export default function FriendDetail({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const { getFriendById, addInteraction, isLoaded } = useAppContext();
  
  const friend = getFriendById(id);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Friend not found</h2>
        <button onClick={() => router.push("/")} className="text-brand hover:underline">
          Go back to Home
        </button>
      </div>
    );
  }

  const statusColors = {
    "overdue": "bg-red-500 text-white",
    "almost due": "bg-orange-400 text-white",
    "on-track": "bg-brand text-white"
  };

  const handleInteraction = (type) => {
    addInteraction(friend.id, type);
    toast.success(`${type} interaction recorded for ${friend.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <img 
                src={friend.picture} 
                alt={friend.name}
                className="rounded-full object-cover w-full h-full border-4 border-white shadow-sm"
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{friend.name}</h2>
            
            <div className={`px-4 py-1 rounded-full text-xs font-bold capitalize tracking-wide mb-4 ${statusColors[friend.status]}`}>
              {friend.status.replace("-", " ")}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {friend.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-green-50 text-brand-light text-xs font-semibold rounded-full uppercase tracking-wide">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-slate-600 italic mb-4">"{friend.bio}"</p>
            <p className="text-sm text-slate-500">Preferred: {friend.email}</p>
          </div>

          <button className="glass-card py-4 flex items-center justify-center gap-2 font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <BellRing size={18} />
            Snooze 2 Weeks
          </button>
          
          <button className="glass-card py-4 flex items-center justify-center gap-2 font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Archive size={18} />
            Archive
          </button>

          <button className="glass-card py-4 flex items-center justify-center gap-2 font-medium text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 size={18} />
            Delete
          </button>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-slate-800 mb-1">{friend.days_since_contact}</span>
              <span className="text-sm text-slate-500">Days Since Contact</span>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-slate-800 mb-1">{friend.goal}</span>
              <span className="text-sm text-slate-500">Goal (Days)</span>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold text-slate-800 mb-2">
                {new Date(friend.next_due_date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-sm text-slate-500">Next Due</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Relationship Goal</h3>
              <button className="text-sm font-medium border border-slate-200 px-3 py-1 rounded hover:bg-slate-50">Edit</button>
            </div>
            <p className="text-slate-600">Connect every <span className="font-bold text-slate-800">{friend.goal} days</span></p>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => handleInteraction("Call")}
                className="flex flex-col items-center justify-center gap-3 py-6 rounded-lg border border-slate-100 bg-slate-50 hover:bg-brand hover:text-white transition-colors group"
              >
                <Phone size={24} className="text-slate-600 group-hover:text-white" />
                <span className="font-semibold">Call</span>
              </button>
              
              <button 
                onClick={() => handleInteraction("Text")}
                className="flex flex-col items-center justify-center gap-3 py-6 rounded-lg border border-slate-100 bg-slate-50 hover:bg-brand hover:text-white transition-colors group"
              >
                <MessageSquare size={24} className="text-slate-600 group-hover:text-white" />
                <span className="font-semibold">Text</span>
              </button>

              <button 
                onClick={() => handleInteraction("Video")}
                className="flex flex-col items-center justify-center gap-3 py-6 rounded-lg border border-slate-100 bg-slate-50 hover:bg-brand hover:text-white transition-colors group"
              >
                <Video size={24} className="text-slate-600 group-hover:text-white" />
                <span className="font-semibold">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
