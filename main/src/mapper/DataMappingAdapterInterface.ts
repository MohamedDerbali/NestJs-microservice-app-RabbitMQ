import { Product } from "src/products/product.entity";

export interface DataMappingAdapterInterface {
    map(columnNames: string[], data: any): Partial<Product>;
}