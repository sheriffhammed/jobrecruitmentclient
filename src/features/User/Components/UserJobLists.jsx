import Sidebar from "../../Sidebar/Sidebar";
const UserJobLists = ({userId, contents, handleChange}) => {
  
  return (
   <div class="row justify-content-center">
      <div class="col-2">
         <Sidebar handleChange={handleChange}/>
      </div>
      <div class="col-8">
        <div class="list-group">
          {contents}
        </div>
      </div>
    </div>
  );
};

export default UserJobLists;
