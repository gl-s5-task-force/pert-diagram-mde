import React from "react";

function Footer() {
  return (
    <div className="footer">
      <p>&copy; {new Date().getFullYear()}  I <span className="heart">🖤</span> PERT. All rights reserved.</p>
      <ul>
        <li>Privacy Policy</li>
        <li>Terms of Service</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}

export default Footer;