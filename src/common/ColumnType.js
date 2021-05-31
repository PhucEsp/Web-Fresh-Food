
export const columnsFruit = [
    { id: 'id', label: 'ID #', minWidth: 100 },
    { id: 'name', label: 'Tên\u00a0Sản Phẩm', minWidth: 170, align: 'center', },
    {
      id: 'price',
      label: 'Giá',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'dvt',
      label: 'Đơn Vị Tính',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'quanty',
      label: 'Số Lượng',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
        id: 'des',
        label: 'Mô Tả',
        // minWidth: 170,
        maxWidth: 400,
        align: 'center',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'edit',
        label: 'Chỉnh Sửa',
        maxWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'delete',
        label: 'Xóa',
        maxWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
      },
  ];

  export const columnsUser = [
    { id: 'id', label: 'ID #', minWidth: 100 },
    { id: 'name', label: 'Họ \u00a0Tên', minWidth: 190, align: 'center', },
    {
      id: 'taikhoan',
      label: 'Tài Khoản',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'diachi',
      label: 'Địa Chỉ',
      minWidth: 250,
      align: 'center',
    },
    {
      id: 'sdt',
      label: 'Số Điện Thoại',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
        id: 'email',
        label: 'Email',
        // minWidth: 170,
        maxWidth: 250,
        align: 'center',
      },
      {
        id: 'delete',
        label: 'Xóa',
        maxWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
      },
  ];

  export const columnAdmin = [
    { id: 'id', label: 'ID #', minWidth: 100 },
    { id: 'name', label: 'Họ \u00a0Tên', minWidth: 190, align: 'center', },
    {
      id: 'taikhoan',
      label: 'Tài Khoản',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'diachi',
      label: 'Địa Chỉ',
      minWidth: 250,
      align: 'center',
    },
      {
        id: 'edit',
        label: 'Chỉnh Sửa',
        maxWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'delete',
        label: 'Xóa',
        maxWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
      },
  ];


  export const columnsOrder = [
    { id: 'madh', label: 'ID #', maxWidth: 100 },
    // { id: 'manv', label: 'Mã Nhân Viên', maxWidth: 150, align: 'center', },
    {
      id: 'ngay',
      label: 'Ngày',
      maxWidth: 170,
      align: 'center',
    },
    {
      id: 'hoten',
      label: 'Khách Hàng',
      minWidth: 150,
      align: 'center',
    },
    {
      id: 'diachi',
      label: 'Địa Chỉ',
      maxWidth: 320,
      align: 'center',
    },
    {
      id: 'sdt',
      label: 'SĐT',
      minWidth: 90,
      align: 'center',
    },
    {
      id: 'mail',
      label: 'Email',
      maxWidth: 250,
      align: 'center',
    },
    {
      id: 'tongtien',
      label: 'Tổng',
      maxWidth: 200,
      align: 'center',
    },
    {
      id: 'trangthai',
      label: 'Trạng Thái',
      maxWidth: 150,
      align: 'center',
    },
    {
      id: 'ctdh',
      label: 'Chi Tiết',
      maxWidth: 100,
      align: 'center',
    },
  ];