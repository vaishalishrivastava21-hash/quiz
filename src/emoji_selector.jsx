import React from "react";
import { auth } from "./firebase/firebaseConfig";
import { db } from "./firebase/firebaseConfig"; // adjust the path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import "./mood-selector.css";
import { useState,useEffect } from "react";
import happypng from "./assets/smile.png";
import sadpng from "./assets/sad.png";
import anxiouspng from "./assets/worried.png";
import angrypng from "./assets/angry.png";
const Moodupdate=() =>{
  const navigate = useNavigate();

  const user = auth.currentUser;
  const [quote, setQuote] = useState("");

const moods=
[
    {
    id:1,
    name:"Happy",
    src:happypng,
    color:"#fcfca9"
},
    {id:2,
    name:"Sad",
    src:sadpng,
    color: "#d2d9fc"
},
    {
    id:3,
    name:"Angry",
    src:angrypng,
    color:"#fcd4d2"
},
    {
    id:4,
    name:"Anxious",
    src:anxiouspng,
    color:"#fcd6a9"
},
];
const [currentmood, setcurrentmood]=useState("");
useEffect(() => {
  const savedMood = localStorage.getItem('mood');
  if (savedMood) {
    setMood(savedMood);
  }
    if (currentmood) {
      document.body.style.backgroundColor = currentmood.color;
      
    } else {
      document.body.style.backgroundColor = 'white'; // Default color
    }
  }, [currentmood]); // Dependency array ensures this runs when currentMood changes
  useEffect(() => {
  if (mood) {
    localStorage.setItem('mood', mood);
  }
}, [mood]);
  const saveMoodToFirestore = async (mood) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
  
    try {
      await addDoc(collection(db, "moods"), {
        uid: user.uid,
        displayName: user.displayName || "Anonymous",
        mood: mood.name,
        color: mood.color,
        timestamp: serverTimestamp(),
        
      });


      if (["Sad", "Angry", "Anxious"].includes(mood.name)) {
        navigate("/quiz");
      }
      console.log("Mood saved:", mood.name);
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  };
   

  
return(
  <>
  <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.displayName || "User"}! 👋</h1>
      
    </div>
    <div className="mood-container">
      <h1 >
         How are you feeling today?</h1>
    
    <div className="emoji-container">
        {
            moods.map((mood)=>(
                <button className="Emojibtn"   key={mood.id} onClick={()=>{
                    setcurrentmood(mood);}}>
                        <img className="emoji"  src={mood.src} />  
                    </button>
            )
        )
        }
    </div>
    {currentmood && (
        <div style={{padding:"3vh"}}>
          <h2>Your current mood is: {currentmood.name}</h2>
          <button
      style={{
        marginTop: "15px",
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "10px",
        backgroundColor: "#4caf50",
        color: "grey",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => {
        if (currentmood) {
          saveMoodToFirestore(currentmood); // Pass the selected mood
        } else {
          alert("Please select a mood first!");
        }
      }}

    >
      Save Mood
    </button>
    
          
        </div>)}
        
    </div>
    </>
    
)
}
export default Moodupdate;