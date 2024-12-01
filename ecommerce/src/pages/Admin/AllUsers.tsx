import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./AllUsers.module.css";
import AdminNavBar from "./AdminNavBar"; 

// Define the shape of a user object
interface User {
  id: number; // or string, depending on your backend
  name: string;
  email: string;
}

const AllUsers: React.FC = () => {
  const [users, setAllUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/allUsers")
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  const deleteUser = (user: User) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/admin/deleteUser/${user.id}`)
          .then(() => {
            Swal.fire(
              "Deleted!",
              `${user.name} has been deleted successfully.`,
              "success"
            );
            setRefresh(!refresh);
          })
          .catch((err) => {
            console.error(err);
            Swal.fire(
              "Error!",
              "There was an error deleting the user.",
              "error"
            );
          });
      }
    });
  };

  return (<>
    <AdminNavBar />
    <div className={styles.theme}>
      <div className={styles.allUsersInterface}>
        <div className={styles.adminCard}>
          <h2>Dashboard</h2>
          <p className={styles.welcome}>Welcome to the admin interface.</p>
          <h3 className={styles.usersTitle}>Users</h3>

          <table className={styles.table}>
            <thead className={styles.tableThead}>
              <tr>
                <th className={styles.tableTh}>ID</th>
                <th className={styles.tableTh}>Name</th>
                <th className={styles.tableTh}>Email</th>
                <th className={styles.tableTh}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={styles.tableRow}>
                  <td className={styles.tableTd}>{user.id}</td>
                  <td className={styles.tableTd}>{user.name}</td>
                  <td className={styles.tableTd}>{user.email}</td>
                  <td className={styles.tableTd}>
                    <button
                      className={`${styles.button} ${styles.deleteButton}`}
                      onClick={() => deleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default AllUsers;
