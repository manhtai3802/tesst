import axios from "axios";
import { useEffect, useState } from "react";
import Table from "./Table";

const ListStudent = () => {
  const [user, setUser] = useState();

  const getApi = () =>
    axios
      .get("http://prod.example.fafu.com.vn/employee?page=0&size=10")
      .then((res) => {
        if (res?.data) {
          setUser(res?.data?.data);
        }
      })
      .catch((err) => {});

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <Table user={user} />
    </div>
  );
};

export default ListStudent;
