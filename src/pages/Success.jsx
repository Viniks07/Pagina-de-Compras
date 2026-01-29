import { Button, CardMedia, Container, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../pages/Success.module.css";
import { useNavigate } from "react-router-dom";
import checkoutImage from "../assets/layout_images/purchase.png";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-color", "#eceff1");

    return () => {
      document.documentElement.style.setProperty("--bg-color", "#ffffff");
    };
  }, []);

  const pedido = useSelector((state) => state.checkout.lastOrder);

  useEffect(() => {
    if (!pedido) {
      navigate("/");
    }
  }, [pedido, navigate]);

  if (!pedido) return null;

  return (
    <Container component={"main"} className={styles.main}>
      <Card component={"article"} className={styles.container} elevation={0}>
        <Typography component={"h1"} className={styles.heroTitle}>
          {pedido.nome},
        </Typography>

        <Typography component={"p"} className={styles.heroText}>
          Sua compra no valor{" "}
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pedido.total)}
          </span>
          <br></br>
          foi finalizado com sucesso
        </Typography>

        <CardMedia
          component={"img"}
          image={checkoutImage}
          alt="Compra feita com sucesso"
          className={styles.heroImage}
        ></CardMedia>

        <Button
          component={"a"}
          className={styles.heroButton}
          onClick={() => {
            navigate("/");
          }}
        >
          Iniciar nova compra
        </Button>
      </Card>
    </Container>
  );
}

export default Success;
