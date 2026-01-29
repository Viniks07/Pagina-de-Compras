import {
  Container,
  Typography,
  Grid,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { reduxForm, Field } from "redux-form";
import { reduxFormField } from "../components/ReduxForm";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import productsDataBase from "../utils/ProductsDataBase";
import ProductCard from "../components/ProductCard";
import styles from "../pages/Products.module.css";
import { formHelperText } from "../components/FormHelperText";
import { toast } from "react-toastify";


// Validações de formulario
const validate = (values) => {
  const errors = {};

  if (!values.nome) {
    errors.nome = "O nome é obrigatório";
  }

  if (!values.email) {
    errors.email = "O e-mail é obrigatório";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "E-mail inválido";
  }

  if (!values.sexo) {
    errors.sexo = "Selecione o sexo";
  }

  return errors;
};

function Products({ handleSubmit }) {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalValue = productsDataBase.reduce((acc, product) => {
    const quantity = cart[product.id] || 0;
    return acc + product.price * quantity;
  }, 0);

  // Função de finalização de compra
  const onSubmit = (values) => {
    if (totalValue === 0) {
      toast.error("Adicione ao menos um produto para finalizar a compra!");
      return;
    }
    try {
      // Recupera de localStorage o valor do ultimo ID de pedido
      const lastOrderIndex = localStorage.getItem("last-order-index") || "0";

      const newId = Number(lastOrderIndex) + 1;
      
      const itemsComprados = productsDataBase
      .filter((product) => cart[product.id] > 0)
      .map((product) => ({
        product_id: product.id,
        name: product.name,
        price: product.price.toFixed(2),
        quantity: cart[product.id],
      }));
      
      // Salva todas as informações importantes do pedio
      const pedidoCompleto = {
        id_pedido: `PEDIDO-${newId}`,
        nome: values.nome,
        email: values.email,
        sexo: values.sexo,
        items: itemsComprados,
        total: String(totalValue.toFixed(2)),
        data: new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      // Salva os pedidos no LocalStorage
      localStorage.setItem(`PEDIDO-${newId}`, JSON.stringify(pedidoCompleto));
      
      // Salva o ID do ultimo lançamento
      localStorage.setItem("last-order-index", String(newId));

      // Envia as informações pra pagina de finalização e limpa o carrinho
      dispatch({ type: "SET_FINAL_ORDER", payload: pedidoCompleto });
      dispatch({ type: "CLEAR_CART" });

      toast.success("Pedido realizado com sucesso!");

      navigate("/success");
    } catch {
      toast.error("Ocorreu um erro ao processar o pedido");
    }
  };

  return (
    <>
      <Container component={"main"} className={styles.mainContainer}>
        <Container component={"header"} className={styles.headerContainer}>
          <Typography component={"h1"} className={styles.headerTitle}>
            Produtos
          </Typography>
        </Container>
        <Grid
          component={"section"}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3,1fr)",
              md: "repeat(4,1fr)",
            },
            gap: 2,
          }}
        >
          {productsDataBase.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
        <Container component={"section"} className={styles.formContainer}>
          <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Box
              component={"fieldset"}
              sx={{ border: "none", p: 0, m: 0, display: "contents" }}
            >
              <Typography component={"legend"} className={styles.clientData}>
                Dados do Cliente
              </Typography>
              <Grid
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(3,1fr)",
                    sm: "repeat(4,1fr)",
                    md: "repeat(12,1fr)",
                  },
                  gap: 2,
                }}
                className={styles.inputContainer}
              >
                <Grid
                  sx={{
                    gridColumn: {
                      xs: "span 3",
                      sm: "span 2",
                      md: "span 5",
                    },
                  }}
                >
                  <Field
                    label="Nome"
                    name="nome"
                    component={reduxFormField}
                    placeholder="Digite seu nome"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={styles.formInput}
                  />
                </Grid>

                <Grid
                  sx={{
                    gridColumn: {
                      xs: "span 3",
                      sm: "span 2",
                      md: "span 5",
                    },
                  }}
                >
                  <Field
                    label="Email"
                    name="email"
                    component={reduxFormField}
                    placeholder="Digite seu Email"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={styles.formInput}
                  />
                </Grid>

                <Grid
                  sx={{
                    gridColumn: {
                      xs: "span 3",
                      sm: "span 1",
                      md: "span 2",
                    },
                  }}
                >
                  <Field
                    name="sexo"
                    label="Sexo"
                    component={formHelperText}
                    className={styles.selectContainer}
                  >
                    <MenuItem value="" disabled>
                      <span>Selecione</span>
                    </MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                  </Field>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography component={"p"} className={styles.totalText}>
                Total:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalValue)}
              </Typography>
              <Button type="submit" className={styles.submitButton}>
                Finalizar compra
              </Button>
            </Box>
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default reduxForm({
  form: "checkout",
  validate,
})(Products);
