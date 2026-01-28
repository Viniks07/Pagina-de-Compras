import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import addIcon from "../assets/layout_images/baseline-add-24px.svg";
import removeIcon from "../assets/layout_images/baseline-remove-24px.svg";

function ProductCard({ product: { id, name, price, img } }) {
  const [tempQuantity, setTempQuantity] = useState(0);
  const dispatch = useDispatch();
  const handleAdd = () => setTempQuantity((prev) => prev + 1);
  const handleRemove = () =>
    setTempQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleConfirmation = () => {
    if (tempQuantity > 0) {
      dispatch({
        type: "UPDATE_CART_ITEM",
        payload: {
          productId: id,
          quantity: tempQuantity,
        },
      });
      setTempQuantity(0);
    }
  };

  return (
    <Card component={"article"} elevation={0} className={styles.cardContainer}>
      <CardMedia component={"img"} image={img} alt={name} width={"100%"} />
      <CardContent className={styles.cardContent}>
        <Typography component={"h2"} className={styles.productName}>
          {name}
        </Typography>

        <Typography component={"p"} className={styles.productPrice}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </Typography>

        <Typography component={"p"} className={styles.productDescription}>
          Em até 12x de{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price / 12)}
        </Typography>

        <Typography component={"p"} className={styles.productDescription}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price * 0.9)}{" "}
          à vista (10% de desconto)
        </Typography>

        <Box className={styles.interactiveSection}>
          <div className={styles.counterContainer}>
            <Button
              variant="outlined"
              className={styles.counterButton}
              onClick={handleRemove}
            >
              {" "}
              <img
                src={removeIcon}
                alt="Botão de remover"
                className={styles.counterImage}
              />
            </Button>
            <TextField
              value={tempQuantity}
              className={styles.counterInput}
            ></TextField>
            <Button
              variant="outlined"
              className={styles.counterButton}
              onClick={handleAdd}
            >
              {" "}
              <img
                src={addIcon}
                alt="Botão de adicionar"
                className={styles.counterImage}
              />
            </Button>
          </div>
          <Button
            variant="contained"
            fullWidth
            className={styles.addButton}
            onClick={handleConfirmation}
          >
            Adicionar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
