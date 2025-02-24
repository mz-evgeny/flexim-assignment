import { useEffect, useState } from "react";
import "src/App.css";
import { useGetListSuppliersQuery } from "src/services/dictionaries";
import { useLazyGetProductsQuery } from "src/services/products";
import type { TableColumnsType, GetProp, TableProps } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import { Table, Input } from "antd";
import { Product, Supplier } from "src/types";
import { PAGINATION_LIMIT } from "shared";

const { Search } = Input;

type Item = Omit<Product, "supplierId"> & { supplier: Supplier["name"] };

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface params {
  pagination?: TablePaginationConfig;
  sortOrder?: SorterResult<Item>["order"];
  sortField?: SorterResult<Item>["field"];
  searchTerm?: string;
}

const columns: TableColumnsType<Item> = [
  {
    title: "sku",
    dataIndex: "sku",
    sorter: true,
  },
  {
    title: "name",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "description",
    dataIndex: "description",
    sorter: true,
  },
  {
    title: "supplier",
    dataIndex: "supplier",
    sorter: true,
  },
  {
    title: "manufacturingDate",
    dataIndex: "manufacturingDate",
    sorter: true,
  },
];

function App() {
  const { data: suppliers } = useGetListSuppliersQuery({});
  const [trigger, { data: products, isFetching }] = useLazyGetProductsQuery();

  const [params, setParams] = useState<params>({
    pagination: {
      current: 1,
      pageSize: PAGINATION_LIMIT,
    },
  });

  useEffect(() => {
    (async () => {
      const { data } = await trigger({
        ...(params.pagination?.current && {
          page: params.pagination?.current.toString(),
        }),
        ...(params.pagination?.pageSize && {
          limit: params.pagination?.pageSize.toString(),
        }),
        ...(params.sortField && { sortField: params.sortField.toString() }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
        ...(params.searchTerm && { searchTerm: params.searchTerm }),
      });
      setParams((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, total: data?.total },
      }));
    })();
  }, [
    params.pagination?.current,
    params.pagination?.pageSize,
    params?.sortOrder,
    params?.sortField,
    params?.searchTerm,
  ]);

  const supplierIdToName = suppliers?.reduce<
    Record<Supplier["_id"], Supplier["name"]>
  >((acc, item) => {
    acc[item._id] = item.name;

    return acc;
  }, {});

  const data = products?.data.map((item) => ({
    ...item,
    supplier: supplierIdToName?.[item.supplierId] ?? "",
  }));

  const handleTableChange: TableProps<Item>["onChange"] = (
    pagination,
    _filter,
    sorter
  ) => {
    setParams((prev) => ({
      ...prev,
      pagination,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    }));
  };

  return (
    <>
      <Search
        placeholder="search by sku or name"
        allowClear
        loading={isFetching}
        onChange={({ target }) => {
          setParams((prev) => ({ ...prev, searchTerm: target.value }));
        }}
      />
      <Table
        style={{ paddingTop: "16px" }}
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id}
        pagination={{ ...params.pagination, showSizeChanger: true }}
        loading={isFetching}
        onChange={handleTableChange}
      />
    </>
  );
}

export default App;
