import React, { useState, useEffect } from "react";
// import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
// import prisma from "../lib/prisma";
// import { options } from "./api/auth/[...nextauth]";
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

const Dashboard = () =>
  //   {
  //   url,
  //   pages,
  //   count,
  // }: {
  //   url: any;
  //   pages: any;
  //   count: any;
  // }
  {
    // const { data, status } = useSession();

    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState([]);
    const [nameOptions, setnameOptions] = useState([]);
    const [filterVal, setFilterVal] = useState("");
    // console.log(urls, count, pages);

    // if (status === "loading")
    //   return <div className={styles.centerScreen}>Loading...</div>;

    // if (!data) return null;

    // console.log(data);
    const [originalUrl, setOriginalUrl] = useState("");
    const [pages, setPages] = useState(1);

    const fetchdata = async (page: Number) => {
      fetch("/api/create-api-key/key?page=all")
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 404) return;
          setnameOptions(data.data);
        });
    };
    useEffect(() => {
      setLoading(true);
      setOriginalUrl(window.location.origin);
      fetch(`/api/get-urls?page=${1}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setUrls(data.data);
          setPages(data.pages);
          setLoading(false);
        });

      fetchdata(1);
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // setLoading(true);
      setFilterVal(e.target.value);
      fetch(`/api/get-urls?page=${1}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          name: e.target.value,
        },

        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          // setLoading(false);
          setUrls(data.data);
          setPages(data.pages);
        });
      // console.log(e.target.value);
    };

    if (loading)
      return (
        <div
          className="flex items-center justify-center p-3 text-white text-sm bg-white"
          style={{
            minHeight: "85.6vh",
          }}
        >
          <div className="flex items-center justify-center ml-2">
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      );

    return (
      <div
        style={{
          fontFamily: "Montserrat",
        }}
        className="flex items-center justify-center text-[#37517E] flex-col w-full min-h-[85.6vh] bg-white"
      >
        <h1 className="text-4xl mb-8 uppercase font-bold mt-8">Created Urls</h1>

        <div className="flex items-center justify-center">
          <div className="my-4 mr-3">
            <Link href={"/keys"}>
              <a className="bg-[#37517E] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                API Keys
              </a>
            </Link>
          </div>

          <div className="my-4">
            <select
              onChange={onChange}
              value={filterVal}
              className="bg-[#37517E] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
              <option value="all">All</option>
              {nameOptions.map((name: { name: string }) => {
                return (
                  <option key={name.name} value={name.name}>
                    {name.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="rounded-lg shadow-2xl overflow-x-auto w-9/12 mb-6">
          <table className="min-w-full" id="table_to_export">
            <>
              <thead className="bg-[#37517E] text-white font-bold text-sm">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 font-bold text-left uppercase"
                  >
                    Url
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-bold text-left uppercase"
                  >
                    Short Url
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-bold text-left uppercase"
                  >
                    Clicks
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-bold text-left uppercase"
                  >
                    Name
                  </th>
                  {/* <th
                  scope="col"
                  className="px-6 py-3 font-bold text-left uppercase"
                >
                  Edit
                </th> */}
                  <th className="px-6 py-3 font-bold text-left uppercase">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className=" text-white">
                {urls?.map((url: any) => (
                  <tr key={url.id}>
                    <td className="px-6 py-4 text-sm text-[#37517E] cursor-pointer font-semibold whitespace-nowrap">
                      <Link href={url.url}>
                        <a target="_blank">
                          {url.url.length > 30
                            ? url.url.slice(0, 30) + "..."
                            : url.url}
                        </a>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#37517E] cursor-pointer font-semibold whitespace-nowrap">
                      <Link href={`${originalUrl}/${url.slug}`}>
                        <a target="_blank">
                          {`${originalUrl}/${url.slug}`.length > 30
                            ? `${originalUrl}/${url.slug}`.slice(0, 30) + "..."
                            : `${originalUrl}/${url.slug}`}
                        </a>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-[#37517E] font-semibold text-sm whitespace-nowrap">
                      {url.clicks}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#37517E] font-semibold whitespace-nowrap">
                      {url.userName ? url.userName : "Anonymous"}
                    </td>
                    {/* <td className="px-6 py-4 text-sm whitespace-nowrap">yes</td> */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <DeleteButton id={url.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          </table>
        </div>

        {urls?.length > 0 && (
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
                fetch(`/api/get-urls?page=${data.selected + 1}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },

                  credentials: "include",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setUrls(data.data);
                  });
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

// export const getServerSideProps = async (context: any) => {
//   const session = await unstable_getServerSession(
//     context.req,
//     context.res,
//     options
//   );

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   const take = 10;

//   const urls = await prisma.url.findMany({
//     where: {
//       userId: session?.user?.id,
//     },
//     take: take,
//   });

//   const count = await prisma.url.count({
//     where: {
//       userId: session?.user?.id,
//     },
//   });

//   return {
//     props: {
//       url: urls,
//       pages: Math.ceil(count / take),
//       count,
//     },
//   };
// };

export default Dashboard;
