import { useState } from "react";

export default function useFetchMusic() {
  const tracks = [
    {
      id: "wake_up_01",
      title: "Intro - The Way Of Waking Up (feat. Alan Watts)",
      album: "Wake Up",
      artist: "The Kyoto Connection",
      genre: "Electronic",
      source:
        "https://storage.googleapis.com/uamp/The_Kyoto_Connection_-_Wake_Up/01_-_Intro_-_The_Way_Of_Waking_Up_feat_Alan_Watts.mp3",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      trackNumber: 1,
      totalTrackCount: 13,
      duration: 90,
      site: "http://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957/",
    },
    {
      id: "wake_up_02",
      title: "Geisha",
      album: "Wake Up",
      artist: "The Kyoto Connection",
      genre: "Electronic",
      source:
        "https://storage.googleapis.com/uamp/The_Kyoto_Connection_-_Wake_Up/02_-_Geisha.mp3",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      trackNumber: 2,
      totalTrackCount: 13,
      duration: 267,
      site: "http://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957/",
    },
    {
      id: "wake_up_03",
      title: "Voyage I - Waterfall",
      album: "Wake Up",
      artist: "The Kyoto Connection",
      genre: "Electronic",
      source:
        "https://storage.googleapis.com/uamp/The_Kyoto_Connection_-_Wake_Up/03_-_Voyage_I_-_Waterfall.mp3",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      trackNumber: 3,
      totalTrackCount: 13,
      duration: 264,
      site: "http://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957/",
    },
    // ... (other tracks remain the same, only changing the image URLs)
    {
      id: "spatial_06",
      title: "10 feet from shore",
      album: "Spatial Audio",
      artist: "Watson Wu",
      genre: "Ambience",
      source: "https://storage.googleapis.com/uamp/Spatial Audio/Shore.wav",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      trackNumber: 6,
      totalTrackCount: 6,
      duration: 180,
      site: "https://library.soundfield.com/track/114",
    },
  ];

  return { tracks };
}
