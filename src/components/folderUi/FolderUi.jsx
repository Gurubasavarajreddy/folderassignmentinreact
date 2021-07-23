import {React,useState} from 'react'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import FolderIcon from '@material-ui/icons/Folder';
import randomColorGenerator from '../../helperFunctions/index'
import {selectFolder} from '../../redux/actions'
import {
    connect
  } from 'react-redux';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
 
function FolderUi(props){
  const[count,setCount]=useState(1)
  const[char,setChar]=useState(97)

  function recurFuncSearch(arr,objId) {
       arr?.forEach((i1) => {
     if (i1.id === objId) {  
        props.selectFolder(i1)
        return i1
     } else {
       recurFuncSearch(i1.subfolder,objId);
     }
   });
 }
  
    return(
      <>
        <div  key={props.objId} id={props.objId}  style={props?.subfolder?.length!==0?{border:"1px solid black",padding:"5px"}:{}}   className="folder_blocks center">
          <div className="folder_blocks_list">
            <div style={{padding:"3px"}}>{props.selectedfolder.id===props.objId?<FolderOpenIcon onClick={(e)=>recurFuncSearch(props.folderlist,props.objId)}/>:<FolderIcon onClick={(e)=>recurFuncSearch(props.folderlist,props.objId)}/>}<span>{props.name}</span></div>
            <CreateNewFolderIcon onClick={()=>{setChar(c=>c+1);setCount(c=>c+1);props.handleAdd(props.path,char,count,props.level+1,"id" + new Date().getTime(),props.objId,randomColorGenerator())}}></CreateNewFolderIcon>  
         </div>
          <div style={{backgroundColor:props.color}}  >
            {props?.subfolder?.map((b,i)=><div key={i}><FolderUi selectedfolder={props.selectedfolder}folderlist={props.folderlist} selectFolder={props.selectFolder}  path={b.path} objId={b.id} color={b.color} handleAdd={props.handleAdd} name={b.name} level={b.level} subfolder={b?.subfolder}/></div>)}
         </div>
        </div>
    </>
    )
}
const mapStateToProps = (state) => (
    {
      folderlist: state?.folderReducer.folderlist,
      selectedfolder:state?.folderReducer.selectedfolder,
  })
  const mapDispatchToProps = {
    selectFolder
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FolderUi);
  