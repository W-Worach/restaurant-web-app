import React, { useState, useEffect } from "react";
import { getTables, getInfrastructure } from "@/services/TablesService";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
  },
};

const tableDetailsStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "300px",
    height: "200px",
  },
};

const TableSelectorWithModalWithAvailability = ({ onTableSelect }) => {
  const [tables, setTables] = useState([]);
  const [infrastructure, setInfrastructure] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableDetails, setTableDetails] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Modal.setAppElement("#__next");
        const tablesData = await getTables();
        const infraData = await getInfrastructure();
        setTables(tablesData);
        setInfrastructure(infraData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleTableSelect = (table) => {
    if (onTableSelect) {
      onTableSelect(table.id);
    }
    closeModal();
    closeDetailsModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openDetailsModal = (table) => {
    setTableDetails(table);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
      >
        Show Tables
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 text-lg font-bold text-gray-800 p-2 hover:text-red-500"
          style={{ cursor: "pointer" }}
        >
          ×
        </button>
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${infrastructure.numberOfColumns}, 1fr)`,
            gridTemplateRows: `repeat(${infrastructure.numberOfRows}, 1fr)`,
            marginTop: "30px",
          }}
        >
          {Array.from({ length: infrastructure.numberOfRows }).map(
            (_, rowIndex) =>
              Array.from({ length: infrastructure.numberOfColumns }).map(
                (_, colIndex) => {
                  const table = tables.find(
                    (t) => t.gridColumn === colIndex && t.gridRow === rowIndex
                  );
                  const backgroundColor =
                    (rowIndex + colIndex) % 2 === 0 ? "white" : "lightgray";

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => table && openDetailsModal(table)}
                      style={{
                        gridColumnStart: colIndex + 1,
                        gridRowStart: rowIndex + 1,
                        border: "1px solid black",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: table
                          ? table.isAvailable
                            ? "lightgreen"
                            : "red"
                          : backgroundColor,
                        cursor: table ? "pointer" : "default",
                      }}
                    >
                      {table ? (
                        <>
                          <span>{`Table ${table.id}`}</span>
                          <span>{`${table.numberOfSeats} seats`}</span>
                        </>
                      ) : (
                        <span style={{ visibility: "hidden" }}>Empty</span>
                      )}
                    </div>
                  );
                }
              )
          )}
        </div>
      </Modal>
      <Modal
        isOpen={detailsModalOpen}
        onRequestClose={closeDetailsModal}
        style={tableDetailsStyles}
      >
        <button
          onClick={closeDetailsModal}
          className="absolute top-0 right-0 text-lg font-bold text-gray-800 p-2 hover:text-red-500"
          style={{ cursor: "pointer" }}
        >
          ×
        </button>
        {tableDetails && (
          <div className="flex flex-col items-center">
            <h2>{`Table ${tableDetails.id}`}</h2>
            <p>{`Seats: ${tableDetails.numberOfSeats}`}</p>
            <p>{tableDetails.isAvailable ? "Available" : "Unavailable"}</p>
            {tableDetails.isAvailable && (
              <button
                onClick={() => handleTableSelect(tableDetails)}
                className="mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
              >
                Choose This Table
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

const TableSelectorWithModal = ({ onTableSelect }) => {
  const [tables, setTables] = useState([]);
  const [infrastructure, setInfrastructure] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableDetails, setTableDetails] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Modal.setAppElement("#__next");
        const tablesData = await getTables();
        const infraData = await getInfrastructure();
        setTables(tablesData);
        setInfrastructure(infraData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleTableSelect = (table) => {
    if (onTableSelect) {
      onTableSelect(table.id);
    }
    closeModal();
    closeDetailsModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openDetailsModal = (table) => {
    setTableDetails(table);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Show Tables
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 text-lg font-bold text-gray-800 p-2 hover:text-red-500"
          style={{ cursor: "pointer" }}
        >
          ×
        </button>
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${infrastructure.numberOfColumns}, 1fr)`,
            gridTemplateRows: `repeat(${infrastructure.numberOfRows}, 1fr)`,
            marginTop: "30px",
          }}
        >
          {Array.from({ length: infrastructure.numberOfRows }).map(
            (_, rowIndex) =>
              Array.from({ length: infrastructure.numberOfColumns }).map(
                (_, colIndex) => {
                  const table = tables.find(
                    (t) => t.gridColumn === colIndex && t.gridRow === rowIndex
                  );
                  const backgroundColor =
                    (rowIndex + colIndex) % 2 === 0 ? "white" : "lightgray";

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => table && openDetailsModal(table)}
                      style={{
                        gridColumnStart: colIndex + 1,
                        gridRowStart: rowIndex + 1,
                        border: "1px solid black",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: table
                          ? table.isAvailable
                            ? "lightgreen"
                            : "lightgreen"
                          : backgroundColor,
                        cursor: table ? "pointer" : "default",
                      }}
                    >
                      {table ? (
                        <>
                          <span>{`Table ${table.id}`}</span>
                          <span>{`${table.numberOfSeats} seats`}</span>
                        </>
                      ) : (
                        <span style={{ visibility: "hidden" }}>
                          No table here
                        </span>
                      )}
                    </div>
                  );
                }
              )
          )}
        </div>
      </Modal>
      <Modal
        isOpen={detailsModalOpen}
        onRequestClose={closeDetailsModal}
        style={tableDetailsStyles}
      >
        <button
          onClick={closeDetailsModal}
          className="absolute top-0 right-0 text-lg font-bold text-gray-800 p-2 hover:text-red-500"
          style={{ cursor: "pointer" }}
        >
          ×
        </button>
        {tableDetails && (
          <div className="flex flex-col items-center">
            <h2>{`Table ${tableDetails.id}`}</h2>
            <p>{`Seats: ${tableDetails.numberOfSeats}`}</p>
            <button
              onClick={() => handleTableSelect(tableDetails)}
              className="mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
            >
              Choose This Table
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export { TableSelectorWithModalWithAvailability, TableSelectorWithModal };
