import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminStatistics.module.css"; 
import AdminNavBar from "./AdminNavBar"; 

interface Product {
  brand: string;
  price: number;
  quantity: number;
}

interface BrandStatistic {
  brand: string;
  totalProducts: number;
  totalValue: number;
  totalStock: number;
  averagePrice: number;
}

const AdminStatistics: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [brandStatistics, setBrandStatistics] = useState<BrandStatistic[]>([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      const products: Product[] = response.data;
      setData(products);
      const statistics = calculateBrandStatistics(products);
      setBrandStatistics(statistics);
      console.log("Fetched all products");
    } catch (err) {
      console.error("Could not fetch data", err);
    }
  };

  const calculateBrandStatistics = (products: Product[]): BrandStatistic[] => {
    const statistics: Record<string, BrandStatistic> = {};

    products.forEach((product) => {
      if (!statistics[product.brand]) {
        statistics[product.brand] = {
          brand: product.brand,
          totalProducts: 0,
          totalValue: 0,
          totalStock: 0,
          averagePrice: 0,
        };
      }

      const brandStat = statistics[product.brand];
      brandStat.totalProducts += 1;
      brandStat.totalValue += product.price * product.quantity;
      brandStat.totalStock += product.quantity;
      brandStat.averagePrice = brandStat.totalValue / brandStat.totalStock;
    });

    return Object.values(statistics);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (<>
    <AdminNavBar />
    <div className={styles.dashboard}>
      <div>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Top Market Statistics</h1>
          <p className={styles.pageSubtitle}>
            Manage your products, users, and orders
          </p>
        </div>
        <div className={styles.controls}>
          <div className={styles.marketplaceBadge}>Products Overview</div>
          <div>
            <button className={styles.filterButton}>Last 7 Days ▼</button>
            <button className={styles.filterButton}>All Categories ▼</button>
          </div>
        </div>
        <table className={styles.marketTable}>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Average Price</th>
              <th>Total Stock</th>
              <th>Total Products</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {brandStatistics.map((brandStatistic) => (
              <tr className={styles.tableRow} key={brandStatistic.brand}>
                <td>
                  <div className={styles.brandColumn}>
                    <div className={styles.brandLogo}></div>
                    <span>{brandStatistic.brand}</span>
                  </div>
                </td>
                <td className={styles.volumeValue}>
                  ${brandStatistic.averagePrice.toFixed(2)}
                </td>
                <td className={styles.positiveStattt}>
                  {brandStatistic.totalStock}
                </td>
                <td className={styles.negativeStattt}>
                  {brandStatistic.totalProducts}
                </td>
                <td className={styles.ownersCount}>
                  ${brandStatistic.totalValue.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default AdminStatistics;
