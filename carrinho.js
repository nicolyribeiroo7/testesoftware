function calcularTotal(itens, cupom) {

    // Cria uma variável para armazenar o valor total dos produtos
    let subtotal = 0;


    // Verifica se "itens" é realmente uma lista (array)
    // e se o carrinho não está vazio
    if (!Array.isArray(itens) || itens.length === 0) {
        throw new Error("Carrinho inválido");
    }


    // Percorre todos os produtos que estão dentro do carrinho
    for (let i = 0; i < itens.length; i++) {

        /*
         * BUG 1 — CORRIGIDO:
         *
         * Antes, o código não verificava se a quantidade era menor
         * ou igual a zero ou se o preço era negativo.
         *
         * Agora:
         * - quantidade <= 0 → carrinho inválido
         * - preço < 0 → carrinho inválido
         */
        if (itens[i].quantidade <= 0 || itens[i].preco < 0) {
            throw new Error("Carrinho inválido");
        }


        // Calcula o valor de cada produto:
        // preço × quantidade
        //
        // Exemplo:
        // preço = R$ 20
        // quantidade = 3
        // 20 × 3 = R$ 60
        subtotal += itens[i].preco * itens[i].quantidade;
    }


    // Cria a variável que irá armazenar o valor do desconto
    let desconto = 0;


    /*
     * Verifica se o cliente possui o cupom "PROMO10"
     */
    if (cupom === "PROMO10") {

        /*
         * BUG 2 — CORRIGIDO:
         *
         * Antes:
         * desconto = 10;
         *
         * Isso dava um desconto fixo de R$ 10,00.
         *
         * O cupom PROMO10 deve dar 10% de desconto.
         *
         * Para calcular 10%:
         * subtotal × 0.10
         *
         * Exemplo:
         * subtotal = R$ 200
         * 200 × 0.10 = R$ 20 de desconto
         */
        desconto = subtotal * 0.10;
    }


    // Define o valor padrão do frete como R$ 15,00
    let frete = 15;


    /*
     * BUG 3 — CORRIGIDO:
     *
     * Antes estava:
     *
     * if (subtotal > 100)
     *
     * O problema é que uma compra de exatamente R$ 100
     * ainda pagaria frete.
     *
     * Agora usamos >= (maior ou igual).
     *
     * Assim:
     * - R$ 99,99 → paga R$ 15 de frete
     * - R$ 100,00 → frete grátis
     * - R$ 150,00 → frete grátis
     */
    if (subtotal >= 100) {
        frete = 0;
    }


    /*
     * Calcula o valor final da compra.
     *
     * Fórmula:
     *
     * total = subtotal - desconto + frete
     *
     * Exemplo:
     * subtotal = R$ 100
     * desconto = R$ 10
     * frete = R$ 0
     *
     * total = 100 - 10 + 0
     * total = R$ 90
     */
    let total = subtotal - desconto + frete;


    /*
     * BUG 4 — CORRIGIDO:
     *
     * O resultado de cálculos com números decimais pode gerar
     * muitas casas decimais.
     *
     * toFixed(2) deixa o valor com exatamente 2 casas decimais.
     *
     * Exemplo:
     * 89.999999999 → "90.00"
     *
     * Como toFixed() retorna uma STRING, usamos Number()
     * para transformar novamente em número.
     */
    return Number(total.toFixed(2));
}


// Exporta a função para que ela possa ser utilizada em outros arquivos,
// como arquivos de teste.
module.exports = { calcularTotal };