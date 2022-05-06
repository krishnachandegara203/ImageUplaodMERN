import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import FileUploadScreen from './screens/FileUploadScreen';
import FileList from './screens/FileList';
import {getSingleFiles, getMultipleFiles} from './data/api';

function App() {
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

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
  return (
    <>
         
           
           <Router>
             <Routes>
             <Route exact path='/' element={ <FileUploadScreen  />}>
                    
                  </Route>
                 <Route exact path='/filelist' element={<FileList />}>
                     
                 </Route>
             </Routes>
                 
                
          </Router>
          
    </>
  );
}

export default App;
