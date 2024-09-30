import React, { useEffect, useRef, useState } from 'react';
import { Space, Table, Button, message, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { fetchAllPersons, userEnable } from '../utils/fetchUtil';
import { confirmAction } from './ModalConfirm';
import LoadingOverlay from './LoadingOverlay'
import RolUserModal from './modalComponents/RolUserModal'

const GestionarUser = () => {
  const [dato, setDatos] = useState();
  const [isFetched, setFetched] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const getDatos = async () => {
    try {
      setFetched(false)
      await fetchAllPersons().then((response) => setDatos(response))
    } catch (error) {
      console.error("Ha ocurrido un error al traer datos")
    } finally {
      setFetched(true)
    }
  }

  useEffect(() => {
    getDatos();
  }
    , [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const usersFilter = dato;

  const handleBlockUser = async (id, enabled) => {
    try {
      confirmAction(async () => {
        await userEnable(id, enabled);
        getDatos();
      })
    } catch (error) {

    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      ...getColumnSearchProps("nombre")
    },
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
      ...getColumnSearchProps("usuario")
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion',
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.enabled ? (
            <Button onClick={() => handleBlockUser(record.id, record.enabled)} >Bloquear</Button>
          ) : (
            <Button onClick={() => handleBlockUser(record.id, record.enabled)} >Desbloquear</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="table-container">
      <h3 className="h3">Gestionar Usuarios</h3>
      <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={usersFilter} rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
      />
      <RolUserModal />
      <LoadingOverlay loading={!isFetched} />

    </div>
  );
};

export default GestionarUser;


