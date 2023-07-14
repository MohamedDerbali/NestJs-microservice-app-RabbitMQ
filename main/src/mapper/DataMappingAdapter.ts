import { Product } from 'src/products/product.entity';
import { DataMappingAdapterInterface } from './DataMappingAdapterInterface';

export class DataMappingAdapter implements DataMappingAdapterInterface {
  mapColumn(columnName: string): string {
    return columnName;
  }

  map(columnNames: string[], data: any): Partial<Product> {
    const productData: Partial<Product> = {};

    for (const columnName of columnNames) {
      const mappedColumnName = this.mapColumn(columnName);

      if (mappedColumnName !== 'id') {
        productData[mappedColumnName] = data[columnName];
      }
    }

    return productData;
  }
}
