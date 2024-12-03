import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { Search } from 'lucide-react';
import { useState, FC } from 'react';
import { useRouter } from 'next/navigation'


const searchStyle: React.CSSProperties = {
  borderRadius: "50px",
  paddingLeft: "40px",
  width: "350px",
  backgroundColor: "transparent",
  color: "white"
};

const searchIconStyle: React.CSSProperties = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#6c757d"
};

const profileImageStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover"
};

const logoStyle: React.CSSProperties = {
  height: "40px",
  width: "auto",
  marginRight: "30px"
};

// Define the categories based on the Products model
const categories = ['Shoes', 'Dresses', 'Coats', 'Shirts', 'Pants'];

const NavBar: FC<{ search: string; setSearch: (value: string) => void }> = ({ search, setSearch }) => {
  const navigate = useRouter()

  const handleLogout = () => {
    localStorage.clear();
    navigate.push("/");
  };

  const filteredCategory = (category: string) => {
    // Implement filtering logic based on the selected category
    console.log(`Filtering category: ${category}`);
    // You can call a function to fetch products based on the selected category
    // For example, you might want to navigate to the AllProducts page with a query parameter
    navigate.push(`/Admin/AllProducts?category=${category}`);
  };

  return (<>
   
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(113.49deg, #984D38 -30.3%, #181E41 58.12%)"
      }}
    >
      <Container fluid>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" style={logoStyle}>
            <path d="M60 15 L70 5 L80 5 L90 15 L75 45 L60 15" fill="none" stroke="#333" strokeWidth="2" />
            <text x="95" y="30" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#333">ELEGANCE</text>
            <line x1="95" y1="35" x2="180" y2="35" stroke="#333" strokeWidth="1" />
            <text x="95" y="45" fontFamily="Arial" fontSize="10" fill="#666">BOUTIQUE</text>
          </svg>
        </Navbar.Brand>
        <div className="position-relative d-flex align-items-center">
          <Search style={searchIconStyle} size={20} />
          <Form.Control
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="me-2"
            aria-label="Search"
            style={searchStyle}
          />
        </div> 
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto ms-5"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/Admin/AdminStatistics" className="px-4" style={{ color: "#f8f9fa" }}>Home</Nav.Link>
            <Nav.Link href="/Admin/AllUsers" className="px-4" style={{ color: "#f8f9fa" }}>Users</Nav.Link>
            <Nav.Link href="/Admin/AllProducts" className="px-4" style={{ color: "#f8f9fa" }}>Stock</Nav.Link>
            <NavDropdown
              title={<span className="text-white">Categories</span>}
              id="navbarScrollingDropdown"
              className="px-4"
              style={{ '--bs-nav-link-color': 'white' } as React.CSSProperties}
            >
              {categories.map((category) => (
                <NavDropdown.Item key={category} onClick={() => filteredCategory(category)}>
                  {category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <NavDropdown
            title={
              <img
                src="https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg"
                alt="Profile"
                style={profileImageStyle}
                className="cursor-pointer"
              />
            }
            id="profile-dropdown"
            align="end"
          >
            <NavDropdown.Item href="/" onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
  );
};

export default NavBar;
