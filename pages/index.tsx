import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
   getData();
  }, []);
  const getData=async()=>{
    await fetch("http://localhost:8080/another", { headers: { authkey: "1234" } })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.text(); // Read response as text
    })
    .then((data) => {
      console.log("Response from server:", data); // Log the response
      setData(data); // Set the response data
    })
    .catch((error) => console.error("Fetch error:", error));
  
  }

  return (
    <div>
      {data ? (
        <div>
          <h2>Response from server:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
