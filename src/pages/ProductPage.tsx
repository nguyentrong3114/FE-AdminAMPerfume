import {
  Table,
  Button,
  Space,
  Input,
  Card,
  Modal,
  Form,
  Select,
  InputNumber,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import ProductService from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import type { ProductListResponse, Product } from "@/types/Product";

export default function Products() {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading } = useQuery<ProductListResponse>({
    queryKey: ["products", pagination.current, pagination.pageSize, searchText],
    queryFn: () =>
      ProductService.getProduct(
        pagination.current,
        pagination.pageSize,
        searchText
      ),
    keepPreviousData: true,
    staleTime: 2000,
  });

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Số biến thể",
      dataIndex: "variants",
      key: "variants",
      render: (variants: Product["variants"]) => variants.length,
      sorter: (a: Product, b: Product) => a.variants.length - b.variants.length,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Sao",
      dataIndex: "star",
      key: "star",
      sorter: (a: Product, b: Product) => a.star - b.star,
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link">Sửa</Button>
          <Button type="link" danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPagination((prev) => ({ ...prev, current: 1 }));
            }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Thêm sản phẩm mới
          </Button>
        </div>

        <Table
          dataSource={data?.items || []}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: data?.totalItems || 0,
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
          }}
        />
      </Card>

      <Modal
        title="Thêm sản phẩm mới"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Tồn kho"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng tồn kho" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select>
              <Select.Option value="Nước hoa nam">Nước hoa nam</Select.Option>
              <Select.Option value="Nước hoa nữ">Nước hoa nữ</Select.Option>
              <Select.Option value="Unisex">Unisex</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Select.Option value="In Stock">In Stock</Select.Option>
              <Select.Option value="Out of Stock">Out of Stock</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
