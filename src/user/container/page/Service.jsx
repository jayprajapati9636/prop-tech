import React from 'react'
import Navbar from './Navbar'
const Service = () => {
  return (
    <>
    <Navbar />
    <div>
       <div >
        <h1 style={{ textAlign: "center", fontSize: "35px", fontWeight: "bold", marginTop: "50px",paddingTop:"30px" }}>Our Service</h1>
        <h6 style={{ textAlign: "center", fontSize: "18px", paddingBottom: "40px", color: "#6c757d" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum sit ea nobis quae vero voluptatibus.</h6>

        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", padding: "0 20px" }}>
          {/* Service Cards */}

          <div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out",display:"flex", flexFlow:'column',alignItems:"center"}}>
      <img src="/public/Image/housesale.png" alt="" style={{width:"100px",height:"70px",}}/>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>House for Sale</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

          <div style={{ backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out", display: "flex", flexFlow: 'column', alignItems: "center" }}>
            <img src="/Image/salehouse.png" alt="" style={{ width: "100px", height: "70px" }} />
            <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "#333" }}>Quality Properties</h3>
            <p style={{ fontSize: "14px", color: "#6c757d", marginBottom: "20px" }}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <a href="#" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>Read more</a>
          </div>
          {/* Add other cards here */}
<div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out", display:"flex", flexFlow:'column',alignItems:"center"}}>
      <img src="/public/Image/agent.png" alt="" style={{width:"100px",height:"70px",}}/>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>Real Estate Agent</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>


<div style={{backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "22%", padding: "20px", textAlign: "center", transition: "transform 0.3s ease-in-out",display:"flex", flexFlow:'column',alignItems:"center"}}>
      <img src="/public/Image/property.png" alt="" style={{width:"100px",height:"70px",}}/>
        <h3 style={{fontSize: "22px", fontWeight: "bold", color: "#333"}}>Property for Sale</h3>
        <p style={{fontSize: "14px", color: "#6c757d", marginBottom: "20px"}}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        <a href="#" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>Read more</a>
      </div>

      


        </div>
      </div>

    </div>
    </>
  )
}

export default Service
