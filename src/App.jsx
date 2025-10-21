// @ts-nocheck
import { useEffect, useState } from "react";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(
            `Erreur HTTP: ${
              response.statusText ? response.statusText + " - " : ""
            }${response.status}`
          );
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(
          "Une erreur est survenue lors de la récupération des produits."
        );
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (error) return <p>{error}</p>;
  if (loading) return <p>Chargement...</p>;

  const addProduct = async () => {
    try {
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

      const newProduct = await response.json();
      alert(`Le produit avec l'id ${newProduct.id} a été créé`);
    } catch (error) {
      alert("Erreur lors de l'ajout du produit.");
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  const updateProductPrice = async (productId) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: 5,
        }),
      });

      alert(`Le prix du produit avec l'id ${productId} a été modifié`);
    } catch (error) {
      alert("Erreur lors de la modification du prix du produit.");
      console.error(
        "Erreur lors de la modification du prix du produit:",
        error
      );
    }
  };

  const updateCompleteProduct = async (productId) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Produit modifié",
          price: 49.9,
          description: "Description modifiée",
          image: "https://picsum.photos/400/300.webp",
          category: "electronics",
        }),
      });

      alert(`Le produit avec l'id ${productId} a été modifié`);
    } catch (error) {
      alert("Erreur lors de la modification du produit.");
      console.error("Erreur lors de la modification du produit:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "DELETE",
      });

      alert(`Le produit avec l'id ${productId} a été supprimé`);
    } catch (error) {
      alert("Erreur lors de la suppression du produit.");
      console.error("Erreur lors de la suppression du produit:", error);
    }
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
                <Card.Text className="mb-3">{product.price} €</Card.Text>
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateProductPrice(product.id)}
                  >
                    Modifier le prix du produit
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => updateCompleteProduct(product.id)}
                  >
                    Modifier le produit complet
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Supprimer le produit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
