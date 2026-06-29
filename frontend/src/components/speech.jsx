import { useState } from "react";
import axios from "axios";

function SpeechBox() {

    const [text,setText]=useState("");

    const recognition =
      new window.webkitSpeechRecognition() ||
      new window.SpeechRecognition();

    recognition.lang="en-US";

    recognition.onresult=(e)=>{
        setText(e.results[0][0].transcript);
    };

    const startListening=()=>{
        recognition.start();
    }

    const saveText=async()=>{

        await axios.post("http://127.0.0.1:8000/save",{
            text:text
        });

        alert("Saved");
    }

    const speak=async()=>{

        const res=await axios.post(
            "http://127.0.0.1:8000/speak",
            {text},
            {responseType:"blob"}
        );

        const url=URL.createObjectURL(res.data);

        const audio=new Audio(url);

        audio.play();
    }

    return(

<div className="bg-white p-10 rounded-xl shadow-xl w-[700px]">

<h1 className="text-3xl font-bold mb-5">

Speech Application

</h1>

<textarea
value={text}
onChange={(e)=>setText(e.target.value)}
className="w-full border rounded p-4 h-56"
/>

<div className="flex gap-4 mt-5">

<button
onClick={startListening}
className="bg-blue-500 text-white px-5 py-3 rounded">

🎤 Mic

</button>

<button
onClick={saveText}
className="bg-green-500 text-white px-5 py-3 rounded">

Save

</button>

<button
onClick={speak}
className="bg-purple-500 text-white px-5 py-3 rounded">

Speak

</button>

</div>

</div>

    )

}

export default SpeechBox;