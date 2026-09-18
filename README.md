# 🛒 Teste de Carrinho de Compras

Projeto desenvolvido para testar a função `calcularTotal()`, responsável por calcular o valor final de uma compra em um sistema de e-commerce.

O projeto utiliza **Node.js** e **Jest** para realizar testes automatizados, além de testes manuais utilizando a abordagem de **Caixa-Preta**.

## 📌 Objetivo

Validar se o cálculo do total da compra funciona corretamente, considerando:

* Cálculo do subtotal;
* Validação de preços e quantidades;
* Aplicação do cupom `PROMO10`;
* Regra de frete grátis;
* Arredondamento do valor final;
* Tratamento de carrinho vazio ou inválido.

Essas regras fazem parte do módulo de Checkout/Carrinho de Compras do sistema de e-commerce.

## 💻 Tecnologias utilizadas

* **JavaScript**
* **Node.js**
* **Jest 30.5.2**
* **Visual Studio Code**

O projeto está configurado como **CommonJS** e possui o Jest como dependência de desenvolvimento.

## 📂 Estrutura do projeto

```text
teste_carrinho/
│
├── carrinho.js
├── carrinho.test.js
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

### `carrinho.js`

Contém a função principal `calcularTotal(itens, cupom)`, responsável pelo cálculo do valor final do carrinho.

A função realiza validações, calcula o subtotal, aplica o desconto, calcula o frete e arredonda o resultado final.

### `carrinho.test.js`

Contém os **testes automatizados utilizando Jest**.

Foram criados seis casos de teste:

* CT-01 — Frete grátis para exatamente R$ 100,00;
* CT-02 — Aplicação de 10% de desconto;
* CT-03 — Validação de quantidade negativa ou zero;
* CT-04 — Arredondamento para duas casas decimais;
* CT-05 — Validação de carrinho vazio;
* CT-06 — Cobrança de frete para compras abaixo de R$ 100,00.

### `index.js`

Executa os mesmos cenários de forma **manual**, exibindo no terminal se cada caso passou ou falhou.

## 📋 Regras de negócio

### 1. Subtotal

O subtotal é calculado multiplicando o preço pela quantidade de cada item.

```text
subtotal = preço × quantidade
```

### 2. Validação

O carrinho é considerado inválido quando:

* Está vazio;
* A quantidade é menor ou igual a zero;
* O preço é negativo.

Nessas situações, a função retorna o erro:

```text
Carrinho inválido
```

Essas regras estão definidas no plano de testes do projeto.

### 3. Cupom PROMO10

Quando o cupom `PROMO10` é utilizado, é aplicado um desconto de **10% sobre o subtotal**.

### 4. Frete

A regra de frete é:

| Subtotal                      |    Frete |
| ----------------------------- | -------: |
| Menor que R$ 100,00           | R$ 15,00 |
| Igual ou superior a R$ 100,00 |   Grátis |

### 5. Arredondamento

O valor final deve possuir **duas casas decimais**, seguindo a regra definida para valores monetários.

## 🧪 Testes

Para executar os testes automatizados, utilize:

```bash
npm test
```

O comando está configurado no `package.json` para executar o Jest.

## 🔎 Testes realizados

### CT-01 — Frete grátis na borda

**Entrada:**

```javascript
[{ preco: 100, quantidade: 1 }]
```

**Resultado esperado:**

```text
100
```

O objetivo é verificar a regra de frete grátis para exatamente R$ 100,00.

### CT-02 — Cupom de 10%

**Entrada:**

```javascript
[{ preco: 50, quantidade: 1 }]
```

Cupom:

```text
PROMO10
```

**Resultado esperado:**

```text
60
```

O subtotal é R$ 50,00, o desconto é R$ 5,00 e o frete é R$ 15,00.

### CT-03 — Quantidade inválida

**Entrada:**

```javascript
[{ preco: 10, quantidade: -2 }]
```

**Resultado esperado:**

```text
Carrinho inválido
```

### CT-04 — Arredondamento

**Entrada:**

```javascript
[{ preco: 33.333, quantidade: 1 }]
```

**Resultado esperado:**

```text
48.33
```

### CT-05 — Carrinho vazio

**Entrada:**

```javascript
[]
```

**Resultado esperado:**

```text
Carrinho inválido
```

### CT-06 — Frete para compras abaixo de R$ 100

**Entrada:**

```javascript
[{ preco: 80, quantidade: 1 }]
```

**Resultado esperado:**

```text
95
```

O valor é R$ 80,00 + R$ 15,00 de frete.

## 🛠️ Bugs corrigidos

Durante o desenvolvimento foram identificados e corrigidos quatro problemas:

1. **Validação de entrada:** preços negativos e quantidades inválidas não eram tratados.
2. **Cupom:** o desconto era calculado como R$ 10 fixos em vez de 10%.
3. **Frete:** compras de exatamente R$ 100,00 recebiam cobrança de frete.
4. **Arredondamento:** o resultado não era limitado a duas casas decimais.

Após as correções, os testes foram estruturados para verificar essas regras.

## 🎯 Conclusão

O projeto demonstra a aplicação de **testes de software** em uma função de cálculo de carrinho de compras, utilizando testes automatizados com Jest e testes manuais de Caixa-Preta.

Os casos de teste verificam tanto situações normais quanto situações de limite e entradas inválidas, permitindo identificar possíveis falhas no funcionamento da função.
