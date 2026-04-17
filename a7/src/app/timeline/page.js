"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, Video, Handshake, Filter } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function Timeline() {
  const { timeline, isLoaded } = useAppContext();
  const [filter, setFilter] = useState("All");

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  const filteredTimeline = filter === "All" 
    ? timeline 
    : timeline.filter(t => t.type === filter);

  const getIcon = (type) => {
    switch(type) {
      case "Call": return <Phone size={20} className="text-slate-600" />;
      case "Text": return <MessageSquare size={20} className="text-slate-600" />;
      case "Video": return <Video size={20} className="text-slate-600" />;
      default: return <Handshake size={20} className="text-amber-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Timeline</h1>

      <div className="mb-8 relative max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Filter size={16} className="text-slate-400" />
        </div>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block w-full pl-10 pr-10 py-2 text-base border-slate-200 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm rounded-md bg-white border"
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredTimeline.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-100">
            No interactions found.
          </div>
        ) : (
          filteredTimeline.map(entry => (
            <div key={entry.id} className="glass-card p-4 flex items-center gap-4 hover:shadow-md transition-shadow hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                {getIcon(entry.type)}
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  {entry.type} <span className="font-normal text-slate-500">with</span> {entry.friendName}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {new Date(entry.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
