const {calcularTotal} = require('./carrinho');

describe('Suite de testes do carrinho de compras', () => {

    test('CT-01: Deve conceder frete gratis para compras de exatamente R$ 100,00', () => {
        const itens = [{ preco: 100, quantidade: 1 }];
        expect(calcularTotal(itens, null)).toBe(100);
    });
    test('CT-02: deve aplicar 10% de desconto para o cupom PROMO10', () => {
        const itens = [{ preco: 50, quantidade: 1 }];
        //subtotal: 50 \ desconto: 10% (5) = 45 \ frete: 15 \ total: 60
        expect(calcularTotal(itens, "PROMO10")).toBe(60);
    });
    test('CT-03: deve lançar erro para quantidade negativa ou zero', () => {
        const itens = [{ preco: 10, quantidade: -2 }];
        expect(() => calcularTotal(itens, null)).toThrow("Carrinho inválido");
    });
    test('CT-04: deve arredondar o total para duas casas decimais', () => {
        const itens = [{ preco: 33.333, quantidade: 1 }];
        //subtotal: 33.333 \ desconto: 0 \ frete: 15 \ total: 48.333 -> arredondado para 48.33
        expect(calcularTotal(itens, null)).toBe(48.33);
    });
    test('CT-05: deve lançar erro para carrinho vazio', () => {
        expect(() => calcularTotal([], null)).toThrow("Carrinho inválido");
    });
    test('CT-06: deve cobrar frete para compras abaixo de R$ 100,00', () => {
        const itens = [{ preco: 80, quantidade: 1 }];
        expect(calcularTotal(itens, null)).toBe(95);
    });
});