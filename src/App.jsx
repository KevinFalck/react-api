// @ts-nocheck
import { useEffect, useState } from "react";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Nouveau produit",
        price: 29.99,
        description: "Un super produit ajouté via API",
        image: "https://picsum.photos/400/300.webp",
        category: "electronics",
      }),
    });
    alert(`Le produit avec l'id ${(await response.json()).id} a été créé`);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Produits</h1>
      <Button variant="primary" className="mb-4" onClick={addProduct}>
        Ajouter un produit
      </Button>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} alt={product.title} />
              <Card.Body>
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text className="text-muted mb-2">
                  {product.description}
                </Card.Text>
                <Card.Text className="mb-0">{product.price} €</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
