export type CartItemType = {
  productId: number;
  name: string;
  price: number; // sell_price al momento de agregar al carrito
  image: string; // primera URL de imagen ya parseada (o "" si el producto no tiene)
  quantity: number;
};
