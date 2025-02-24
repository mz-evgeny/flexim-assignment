import "src/App.css";
import { useGetListSuppliersQuery } from "./services/dictionaries";
import { useLazyGetPaginatedListProductsQuery } from "src/services/products";

function App() {
  const { data } = useGetListSuppliersQuery({});
  const [trigger, { data: products }] = useLazyGetPaginatedListProductsQuery();

  console.log(data);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => trigger({ searchTerm: "Product 1" })}>
          count is{" "}
        </button>
      </div>
    </>
  );
}

export default App;
