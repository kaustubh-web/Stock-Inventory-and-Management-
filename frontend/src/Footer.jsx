export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <p className="footer-kicker">Stock Inventory</p>
          <p className="footer-title">Built and maintained 🛠️ by Kaustubh Bramhe</p>
        </div>

        <div className="footer-contact-grid">
          <p>
            <span>Email ✉</span>
          support@inventory.com
          </p>
          <p>
            <span>Phone 📞</span>
            +91 9302527611
          </p>
          <p>
            <span>Address 📍🗺️</span>
            Nagpur, Maharashtra, India
          </p>
          <p>
            <a 
              href="https://www.linkedin.com/in/kaustubh-bramhe-1b7565291/" 
              target="_blank" 
              rel="noreferrer"
            >
              <span>LinkedIn 🔗</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
