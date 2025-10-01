import type { Schema, Struct } from '@strapi/strapi';

export interface OrderItemOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_order_item_order_items';
  info: {
    displayName: 'OrderItem';
  };
  attributes: {
    category: Schema.Attribute.String;
    isMainComponent: Schema.Attribute.Boolean;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer;
    totalPrice: Schema.Attribute.Decimal;
    unitPrice: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order-item.order-item': OrderItemOrderItem;
    }
  }
}
