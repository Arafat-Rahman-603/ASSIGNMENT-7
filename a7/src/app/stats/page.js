"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useAppContext } from "@/context/AppContext";

export default function Stats() {
  const { timeline, isLoaded } = useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isLoaded || !isClient) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  const interactionsByType = timeline.reduce((acc, curr) => {
    if (curr.type === "Meetup") return acc;
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(interactionsByType).map(key => ({
    name: key,
    value: interactionsByType[key]
  }));

  const COLORS = {
    Text: "#8b5cf6",
    Call: "#23503a",
    Video: "#22c55e"
  };

  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-2 text-sm text-slate-500">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Friendship Analytics</h1>

      <div className="glass-card p-8">
        <h2 className="text-sm font-semibold text-brand mb-8">By Interaction Type</h2>
        
        {data.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No interactions recorded yet. Go to a friend's page to check in!
          </div>
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#ccc"} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                />
                <Legend content={renderCustomLegend} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
