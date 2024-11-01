import ReactTable from "@meta-dev-zone/react-table";

const ReactDataTable = ({ data, header, Menu, pagination, search }) => {
  return (
    <>
      <ReactTable
        data={data}
        TABLE_HEAD={header}
        MENU_OPTIONS={Menu}
        custom_pagination={pagination}
        custom_search={search}
        theme_config={{
          background: "white",
          color: "black",
          iconColor: "#7396CC",
        }}
        is_sticky_header={false}
        is_hide_footer_pagination={false}
        is_hide_header_pagination={false}
        is_hide_search={false}
      />
    </>
  );
};

export default ReactDataTable;
