import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminStatistics.module.css";
import AdminNavBar from "./AdminNavBar";

interface Brand {
  id: number;
  name: string;
  logo: string;
  verified: number;
  volume: number;
  day: string;
  owner: number;
}

const AdminStatistics: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [items, setItems] = useState<Record<number, number>>({});
  const [floorPrice, setFloorPrice] = useState<Record<number, number>>({});
  const [search, setSearch] = useState("");

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:3001/brands/allbrands");
      const brandsData: Brand[] = response.data;
      setBrands(brandsData);

      // Fetch items and floor prices for each brand
      brandsData.forEach((brand) => {
        fetchItems(brand.id);
      });
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchItems = async (brandId: number) => {
    try {
      const productResponse = await axios.get(
        `http://localhost:3001/products/${brandId}`
      );
      setItems((prev) => ({
        ...prev,
        [brandId]: productResponse.data.length,
      }));
      fetchFloorPrice(brandId);
    } catch (error) {
      console.error(`Error fetching items for brand ${brandId}:`, error);
    }
  };

  const fetchFloorPrice = async (brandId: number) => {
    try {
      const priceResponse = await axios.get(
        `http://localhost:3001/products/${brandId}`
      );
      const lowestPrice = Math.min(...priceResponse.data.map((item: any) => item.price));
      setFloorPrice((prev) => ({
        ...prev,
        [brandId]: lowestPrice,
      }));
    } catch (error) {
      console.error(`Error fetching floor price for brand ${brandId}:`, error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      <AdminNavBar search={search} setSearch={setSearch} />
      <div className={styles.dashboard}>
        <div>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Top Market Statistics</h1>
            <p className={styles.pageSubtitle}>
              Manage your products, users, and orders
            </p>
          </div>
          <div className={styles.controls}>
          </div>
          <table className={styles.marketTable}>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Volume</th>
                <th>24H%</th>
                <th>Floor Price</th>
                <th>Owners</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr className={styles.tableRow} key={brand.id}>
                  <td>
                    <div className={styles.brandColumn}>
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className={styles.brandLogo}
                      />
                      <span>{brand.name}</span>
                      {brand.verified === 1 && (
                        <span className={styles.verifiedBadge}>✔</span>
                      )}
                    </div>
                  </td>
                  <td>{brand.volume}</td>
                  <td>{brand.day}</td>
                  <td>${floorPrice[brand.id] || 0}</td>
                  <td>{brand.owner}</td>
                  <td>{items[brand.id] || 0}</td>
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
