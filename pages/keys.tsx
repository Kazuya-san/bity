import React, { useState, useEffect } from "react";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import prisma from "../lib/prisma";
import { options } from "./api/auth/[...nextauth]";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

const DeleteButton = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={() => {
        setLoading(true);
        fetch(`/api/create-url/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            router.reload();
          })
          .catch((err) => console.log(err));
      }}
      className="bg-red-500 flex items-center justify-center hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Delete
      {loading && (
        <div className="flex items-center justify-center ml-2">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-100"></div>
          </div>
        </div>
      )}
    </button>
  );
};

const Keys = () => {
  // const { data, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState([]);
  const [pages, setPages] = useState(1);

  const [name, setName] = useState("");

  const fetchdata = async (page: Number) => {
    fetch("/api/create-api-key/key?page=" + page)
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 404) return alert("No keys found");
        setKeys(data.data);
        setPages(data.pages);
      });
  };
  useEffect(() => {
    fetchdata(1);
  }, []);
  return (
    <div
      style={{
        fontFamily: "Montserrat",
      }}
      className="flex items-center justify-center text-white flex-col w-full min-h-[85.6vh] bg-slate-900"
    >
      <h1 className="text-4xl mb-8 uppercase font-bold mt-8">Created Keys</h1>

      <div className="flex items-center justify-center w-full mb-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (name.length <= 0)
              return alert("Please enter a name for the key");
            setLoading(true);
            fetch("/api/create-api-key/key", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                setLoading(false);
                fetchdata(1);
                setName("");
                // setKeys((prev) => [data, ...prev]);
              })
              .catch((err) => console.log(err));
          }}
        >
          <div className="flex items-center justify-center w-full">
            <input
              type="text"
              placeholder="Enter Name for the key"
              className="w-9/12 px-4 text-black py-2 rounded-lg shadow-2xl border border-gray-800 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-500 flex items-center justify-center hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Create
              {loading && (
                <div className="flex items-center justify-center ml-2">
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-100"></div>
                  </div>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-lg shadow-2xl border border-gray-800 overflow-x-auto w-9/12 mb-6">
        <table className="min-w-full" id="table_to_export">
          <>
            <thead className="bg-slate-800 font-bold text-sm">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-left uppercase"
                >
                  Key
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-left uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-left uppercase"
                >
                  valid
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 font-bold text-left uppercase"
                >
                  Edit
                </th> */}
                {/* <th className="px-6 py-3 font-bold text-left uppercase">
                  Delete
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y text-white divide-gray-800">
              {keys.map((key: any) => (
                <tr key={key.id}>
                  <td className="px-6 py-4 text-sm text-blue-100 hover:text-blue-200 cursor-pointer font-medium whitespace-nowrap">
                    {key.key}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-100 hover:text-blue-200 cursor-pointer font-medium whitespace-nowrap">
                    {key.name}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button
                      className="bg-orange-500 flex items-center justify-center hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ml-4"
                      onClick={() => {
                        fetch("/api/create-api-key/" + key.id, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },

                          body: JSON.stringify({
                            valid: !key.valid,
                          }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            fetchdata(1);
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      {key.valid ? "Disable" : "Enable"}
                    </button>
                  </td>
                  {/* <td className="px-6 py-4 text-sm whitespace-nowrap">yes</td> */}
                  {/* <td st className="px-6 py-4 text-sm whitespace-nowrap">
                    <DeleteButton id={url.id} />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </>
        </table>
      </div>

      {keys.length > 0 && (
        <div className="flex items-center justify-center mt-4 mb-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => {
              fetchdata(data.selected + 1);
            }}
            //border of red
            //   className="border-[#355070] border-2 rounded-full flex justify-center items-center"
            containerClassName="flex justify-center items-center flex-wrap"
            pageClassName="mt-1 rounded-md border-[#355070] border text-center text-white h-10 flex items-center justify-center w-10 mr-1"
            pageLinkClassName="text-[#355070] w-full h-full flex items-center justify-center"
            activeClassName="bg-[#355070] text-[#fff]"
            activeLinkClassName="text-[#fff] link"
            nextLinkClassName="w-full h-full flex items-center justify-center"
            previousLinkClassName="w-full h-full flex items-center justify-center"
            breakLinkClassName="mr-1 rounded-md mt-1 text-white bg-[#355070] text-[#fff] flex items-center justify-center w-10 h-10"
            previousClassName="rounded-md mt-1 text-white bg-[#355070] text-[#fff] flex items-center justify-center  w-24 h-10 mr-2"
            nextClassName="ml-1 rounded-md mt-1 text-white bg-[#355070] text-[#fff] flex items-center justify-center w-24 h-10 mr-2"
            disabledClassName="rounded-md mt-1 text-white py-2 px-4 w-24 mr-2 opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default Keys;
