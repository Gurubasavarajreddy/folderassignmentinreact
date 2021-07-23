import {React,useState} from 'react'
import './Home.css'

import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import FolderUi from '../../components/folderUi/index';
import randomColorGenerator from '../../helperFunctions/index'
import {
  connect
} from 'react-redux';
import {addFolder,selectFolder} from '../../redux/actions'

function Home(props){
  const {folderlist,addFolder,selectedfolder}=props;
    const[count,setCount]=useState(1)
    const[char,setChar]=useState(97)


     const handleAddTop=(level,id,color)=>{
        let obja ={
            level:level,
             id:id,
             name:`folder_${count}${String.fromCodePoint(char)}`,
             color:color,
             count,
             char,
             path:"/"+`folder_${count}${String.fromCodePoint(char)}`
        }
       addFolder([...folderlist,obja])
     }

       
     function recurFunc(arr,objId,obja) {
        let b = arr?.map((i1) => {
          if (i1.id === objId) {  
              if(Array.isArray(i1.subfolder)){
                i1.subfolder = [...i1?.subfolder,obja];
                return i1
              }else{
                i1.subfolder = [obja];
                return i1
              }
          } else {
            recurFunc(i1.subfolder,objId,obja);
            return i1
          }

        });
        return b
      }
          
    
      
     const handleAdd=(path,char,count,level,id,objId,color)=>{
        let obja ={
            level:level,
             id:id,
             name:`folder_${level}>${count}>${String.fromCodePoint(char)}`,
             color:color,
             count,
             char,
             path:path+"/"+`folder_${level}>${count}>${String.fromCodePoint(char)}`,
        }   
        addFolder([...recurFunc(folderlist,objId,obja)])
     }
  
    return(
     <>
       <main className="main">
          <h1>FolderList</h1>
          <section className="block main_right"> 
              <div>
              <CreateNewFolderIcon onClick={()=>{setChar(c=>c+1);setCount(c=>c+1);handleAddTop(1,"id" + new Date().getTime(),randomColorGenerator())}}></CreateNewFolderIcon>
               {folderlist?.map((b,i)=>{
                   return(
                       <div key={i}>
                         <FolderUi b={b} path={b.path} name={b?.name} color={b.color} objId={b?.id} handleAdd={handleAdd} level={b?.level} subfolder={b?.subfolder}/>
                       </div>
                   );
               })}
               </div>
           </section>
           <section className="block main_left_one">
             <h1>Present Working Directory</h1>
             <pre>{JSON.stringify(selectedfolder,null, '\t')}</pre>
             <div style={{border: '1px solid black',padding:"5px"}}>
               <div style={{color: 'purple'}}>path: {selectedfolder.path}</div>
               <div style={{color: 'blue'}}>folder: {selectedfolder.name}</div>
             </div>
           </section>
           <section className="block main_left">
             <pre>{JSON.stringify(folderlist,null, '\t')}</pre>
           </section>
       </main>
     </>
    );
}

const mapStateToProps = (state) => (
  {
    folderlist: state?.folderReducer.folderlist,
    selectedfolder:state?.folderReducer.selectedfolder,
})
const mapDispatchToProps = {
  addFolder,
  selectFolder
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
