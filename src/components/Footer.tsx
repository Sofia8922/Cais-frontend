function Footer() {
    return (
    <footer className="footer" style={{position: 'static'}}>
        <div>
            <a style={{fontWeight: 'normal', color: '#574030', textDecoration: 'none', fontSize: '1.25rem'}} target="_blank" href="https://chatgpt.com/">Support</a>
            {/* <br/> */}
            <a style={{fontWeight: 'normal', color: '#574030', textDecoration: 'none', fontSize: '1.25rem', marginLeft: '24px'}} href="mailto:Cais@shop.nl">Contact Us</a>
        </div>
        <br/>
        <span style={{fontWeight: 'normal', color: '#574030', fontSize: '1.25rem'}}>© 5000 BCE - 2026, Cáis Inc.</span>
    </footer>)
}

export default Footer;