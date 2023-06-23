import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = () => {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => {
        console.log("data", res.data.data);
        setData(res.data.data);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    return data.filter((ele) => {
      return ele.first_name.toLowerCase().includes(search.toLowerCase());
    });
  };

  return (
    <div>
      <h1 className="title text-center bg-black text-white p-6 font-bold text-2xl font-serif">
        List Items
      </h1>

      <div className="searchBar m-2">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search items..."
          className="p-2 mt-2 w-full ring-2 ring-slate-400 rounded-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {handleSearch().length === 0 && (
        <div className="noItems text-center text-red-500 m-5 capitalize">
          No Items found with this name
        </div>
      )}

      <div className="items flex flex-col items-center md:flex-row ">
        {handleSearch().map((ele) => {
          return (
            <main key={ele.id} className="relative flex">
              <div className="cards p-5">
                <div className="id absolute inline w-6 -translate-y-[0.5rem] translate-x-[11rem] rounded-full bg-black text-center text-white">
                  {ele.id}
                </div>
                <div className="card rounded-lg ring-2 ring-black p-4">
                  <figure className="imgContainer">
                    <img
                      src={ele.avatar}
                      alt="img"
                      className="rounded-xl h-40 aspect-square"
                    />
                  </figure>
                </div>
                <div className="text-center mt-1 text-lg">{ele.first_name}</div>
              </div>
            </main>
          );
        })}
      </div>
    </div>
  );
}

export default App;
