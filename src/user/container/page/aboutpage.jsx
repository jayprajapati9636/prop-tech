import React, { useEffect } from 'react';

const Footer = () => {

  useEffect(() => {
    // any side effects can be handled here if needed
  }, []);

  return (
    <div style={{ backgroundColor: "gray", color: "white", padding: "50px 0px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "30px", // Adds gap between the footer columns
        }}>
          {/* Contact Section */}
          <div className="col-lg-4" style={{ flex: "1", minWidth: "300px" }}>
            <div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: '20px' }}>Contact</h3>
              <address>43 Raymouth Rd. Baltemoer, London 3910</address>
              <ul className="list-unstyled links">
                <li><a href="tel://11234567890">+1(123)-456-7890</a></li>
                <li><a href="tel://11234567890">+1(123)-456-7890</a></li>
                <li><a href="mailto:info@mydomain.com">info@mydomain.com</a></li>
              </ul>
            </div>
          </div>

          {/* Sources Section */}
          <div className="col-lg-4" style={{ flex: "1", minWidth: "300px" }}>
            <div >
              <h3 style={{ fontSize: "1.8rem", marginBottom: '20px' }}>Sources</h3>
              <ul className="list-unstyled float-start links">
                <li><a href="#">About us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Vision</a></li>
                <li><a href="#">Mission</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Privacy</a></li>
              </ul>
              <ul className="list-unstyled float-start links">
                <li><a href="#">Partners</a></li>
                <li><a href="#">Business</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Creative</a></li>
              </ul>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-lg-4" style={{ flex: "1", minWidth: "300px" }}>
            <div className="widget">
              <h3 style={{ fontSize: "1.8rem", marginBottom: '20px' }}>Links</h3>
              <ul className="list-unstyled links">
                <li><a href="#">Our Vision</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>

              <ul className="list-unstyled social" style={{ display: "flex", gap: "10px" }}>
                <li><a href="#" style={{ fontSize: "1.5rem" }}><span className="icon-instagram"></span></a></li>
                <li><a href="#" style={{ fontSize: "1.5rem" }}><span className="icon-twitter"></span></a></li>
                <li><a href="#" style={{ fontSize: "1.5rem" }}><span className="icon-facebook"></span></a></li>
                <li><a href="#" style={{ fontSize: "1.5rem" }}><span className="icon-linkedin"></span></a></li>
                <li><a href="#" style={{ fontSize: "1.5rem" }}><span className="icon-pinterest"></span></a></li>
                <li><a href="#" style={{ fontSize: "1.5rem" }}><span className="icon-dribbble"></span></a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="row mt-5" style={{ marginTop: "50px", textAlign: "center" }}>
          <div className="col-12">
            <p>
              Copyright &copy; {new Date().getFullYear()}. All Rights Reserved. &mdash; Designed with love by
              <a href="https://untree.co" style={{ color: "white", textDecoration: "underline" }}>Untree.co</a>
            </p>
            <div>
              Distributed by
              <a href="https://themewagon.com/" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "underline" }}>themewagon</a>
            </div>
          </div>
        </div>
      </div>

      {/* Preloader */}
      <div id="overlayer" style={{
        position: "fixed", top: "0", left: "0", width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", display: "none", zIndex: "9999"
      }}></div>
      <div className="loader" style={{ display: "none", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        
      </div>
    </div>
  );
};

export default Footer;
