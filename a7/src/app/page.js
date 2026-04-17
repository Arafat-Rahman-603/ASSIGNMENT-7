"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import FriendCard from "@/components/FriendCard";
import { useState } from "react";

export default function Home() {
  const { friends, timeline, isLoaded } = useAppContext();

  const [add, setAdd] = useState(false);

  if(add){
    alert("Add a friend is not working ! try later");
    setAdd(false);
  }

  const totalFriends = friends.length;
  const onTrack = friends.filter(f => f.status === "on-track").length;
  const needAttention = friends.filter(f => f.status === "overdue" || f.status === "almost due").length;
  
  const currentMonth = new Date().getMonth();
  const interactionsThisMonth = timeline.filter(t => new Date(t.date).getMonth() === currentMonth).length;

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white font-semibold py-3 px-6 rounded-md transition-colors shadow-sm cursor-pointer"
        onClick={()=>setAdd(true)}>
          <Plus size={20} />
          Add a Friend
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-brand mb-2">{totalFriends}</div>
          <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Friends</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-brand mb-2">{onTrack}</div>
          <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">On Track</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-brand mb-2">{needAttention}</div>
          <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Need Attention</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-brand mb-2">{interactionsThisMonth}</div>
          <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Interactions This Month</div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {friends.map(friend => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
}
