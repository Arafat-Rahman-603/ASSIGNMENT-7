"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const savedFriends = localStorage.getItem("keenkeeper_friends");
      const savedTimeline = localStorage.getItem("keenkeeper_timeline");

      if (savedFriends) {
        setFriends(JSON.parse(savedFriends));
      } else {
        try {
          const res = await fetch("/friends.json");
          const data = await res.json();
          setFriends(data);
          localStorage.setItem("keenkeeper_friends", JSON.stringify(data));
        } catch (error) {
          console.error("Failed to fetch friends data", error);
        }
      }

      if (savedTimeline) {
        setTimeline(JSON.parse(savedTimeline));
      } else {
        const initialTimeline = [
          { id: "t1", friendId: 7, type: "Meetup", date: "2026-03-29T10:00:00Z", friendName: "Tom Baker" },
          { id: "t2", friendId: 1, type: "Text", date: "2026-03-28T14:30:00Z", friendName: "Sarah Chen" },
          { id: "t3", friendId: 7, type: "Meetup", date: "2026-03-26T18:00:00Z", friendName: "Olivia Martinez" },
          { id: "t4", friendId: 5, type: "Video", date: "2026-03-23T19:00:00Z", friendName: "Aisha Patel" },
        ];
        setTimeline(initialTimeline);
        localStorage.setItem("keenkeeper_timeline", JSON.stringify(initialTimeline));
      }
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    };

    loadData();
  }, []);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("keenkeeper_friends", JSON.stringify(friends));
      localStorage.setItem("keenkeeper_timeline", JSON.stringify(timeline));
    }
  }, [friends, timeline, isLoaded]);

  const addInteraction = (friendId, type) => {
    const friend = friends.find(f => f.id === parseInt(friendId));
    if (!friend) return;

    const newInteraction = {
      id: Date.now().toString(),
      friendId: parseInt(friendId),
      type,
      date: new Date().toISOString(),
      friendName: friend.name
    };

    setTimeline(prev => [newInteraction, ...prev]);
    
    setFriends(prev => prev.map(f => {
      if (f.id === parseInt(friendId)) {
        return {
          ...f,
          days_since_contact: 0,
          status: "on-track"
        };
      }
      return f;
    }));
  };

  const getFriendById = (id) => {
    return friends.find(f => f.id === parseInt(id));
  };

  return (
    <AppContext.Provider value={{ friends, timeline, isLoaded, addInteraction, getFriendById }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
