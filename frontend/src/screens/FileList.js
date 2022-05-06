import React, { useState, useEffect } from 'react';
import '../App.css';
import { getSingleFiles, getMultipleFiles } from '../data/api';
import ReactPaginate from "react-paginate";


const FileList = () => {
    const [singleFiles, setSingleFiles] = useState([]);
    const [multipleFiles, setMultipleFiles] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;


    const getSingleFileslist = async () => {
        try {
            const fileslist = await getSingleFiles();
            setSingleFiles(fileslist);
        } catch (error) {
            console.log(error);
        }
    }



    const getMultipleFilesList = async () => {
        try {
            const fileslist = await getMultipleFiles();
            setMultipleFiles(fileslist);
            console.log(multipleFiles);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSingleFileslist();
        getMultipleFilesList();
    }, []);

  

    const displayList = singleFiles
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((file, index) => {
      return (
        <div className="user"><table>
         <tr>
             <td> <h4>{file.fileName}{file.createdAt}</h4></td> 
             <td> <h4 className='h4class'><img src={`http://localhost:8080/${file.filePath}`}  height="85px" width="85px"  alt="img" /></h4></td>
          {/* <h3>{user.email}</h3> */}
          </tr>
          </table>
        </div>
      );
    });

    const displayList2 = multipleFiles
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((element, index) =>
        <div key={element._id}>
            <h6 className="text-danger font-weight-bold">{element._id}</h6>
            <div className="row">
              {element.files.map((file, index) =>
                              <div className="user"><table>
                <tr>
                    <td> <h4>{file.fileName}{file.createdAt}</h4></td> 
                    <td> <h4 className='h4class'><img src={`http://localhost:8080/${file.filePath}`}  height="85px" width="85px"  alt="img" /></h4></td>
                 </tr>
                 </table>
{                 console.log("length...",element.files)
}
               </div>
               )} 
               
              </div>
        </div>
      )
    //   console.log("displayList",displayList2)

   
    const pageCount = Math.ceil(singleFiles.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
        <>

            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-6">
                        <h2 className="text-success font-weight-bold">Image List</h2>
                        <div className="row">
                            {/* {singleFiles.map((file, index) =>
                                <div className="col-6">
                                    <div className="card mb-2 border-0 p-0">
                                        <table boredr="1">
                                            <tr>
                                                <td>{file.fileName}{file.createdAt} </td>
                                                <td width="200"><img src={`http://localhost:8080/${file.filePath}`} height="75" className="card-img-top img-responsive" alt="img" /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            )} */}
                            {displayList} <br/>

                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                                                        {displayList2} <br/>

                             {/* {displayList1} <br/> */}


                        </div>
                    </div>
                    {/* <div className="col-6">
               <h4 className="text-success font-weight-bold">Multiple Files List</h4>
               {multipleFiles.map((element, index) =>
                  <div key={element._id}>
                      <h6 className="text-danger font-weight-bold">{element.title}</h6>
                      <div className="row">
                        {element.files.map((file, index) =>
                          <div className="col-6">
                              <div className="card mb-2 border-0 p-0">
                                <img src={`http://localhost:8080/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
                                </div>
                            </div>
                         )}
                        </div>
                  </div>
                )}
             </div> */}
                </div>
            </div>
        </>
    );
}


export default FileList;



