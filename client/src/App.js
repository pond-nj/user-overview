import './App.css';
import React from 'react';

// Note: Webpage is not responsive design

function App() {
  const [data, setData] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const [idToDelete, setIDToDelete] = React.useState(-1);
  const url = "http://localhost:3001/api/users";
  const DEBUG = 0;

  // load data from nodeJS server
  React.useEffect(()=>{
    fetch( url ).then( res => { return res.json()} )
    .then( received => {
      setData(received.data)
      setLoaded(true)
    }).catch( err => {console.log(err)})
  }, [])

  // delete user from nodeJS server
  const deleteUser = (user_id) => {
    setData( data.filter( (_, i)=>{ return user_id !== data[i].id} ))
    fetch( url + `/${user_id}`, { method: 'DELETE',}
    ).then(
      res => { if(DEBUG==1) console.log(res); return res.json()}
    ).then(
      json => { if(DEBUG==1) console.log(json) }
    ).catch( err => {console.log(err) })
  }

  // delete => yes / no button
  const ConfirmDelete = ({user}) => {
    if(idToDelete !== user.id )return(<button className='btn btn-danger' onClick={()=>{setIDToDelete(user.id)}}>delete</button>)
    else return(<>
        <div className='mb-3'>Confirmed?</div>
        <div className='d-flex flex-row justify-content-around'>
          <button className='btn btn-danger' onClick={()=>{deleteUser(user.id)}}>Yes</button>
          <button className='btn btn-primary' onClick={()=>{setIDToDelete(-1)}}>No</button>
        </div>
      </>
    )
  }

  // single row of user
  const UserRow = ({data}) => {
    return data.map( (user, index)=>{
      return (
      <tr key={user.id} className="row-block">
          <th scope="row">{index+1}</th>
          <td>{user.title.charAt(0).toUpperCase()}{user.title.slice(1,)}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td><img className='row-6' src={user.picture} style={{"width":"10vw"}}/></td>
          <td><ConfirmDelete user={user}/></td>
      </tr>
      )})
  }

  // table of users
  const UserTable = ({data}) => {
    if (data && data.length == 0){ return(<div className='h3 pt-5' style={{color:"#282c34"}}>all data is deleted...</div>) }
    else return(
    <table className='table'>
      <thead>
        <tr>
          <th scope="col" width="5%">#</th>
          <th scope="col" width="10%">Title</th>
          <th scope="col" width="20%">First</th>
          <th scope="col" width="20%">Last</th>
          <th scope="col" width="20%">Picture</th>
          <th scope="col" width="15%">Action</th>
        </tr>
      </thead>
      <tbody>
        <UserRow data={data}/>
      </tbody>
    </table>)
  }
  
  // render this
  return (
    <div className="App">
      <header className="App-header">
        {/* title */}
        <div className="container m-2 h3 text-left pb-2 pt-4">
          User Data
        </div>

        {/* table */}
        <div className="container" style={{"backgroundColor": "#ffffff","minHeight":"80vh"}}>
          {loaded? <UserTable data={data}/> : <h3 className='pt-3' style={{color:"#282c34"}}>loading...</h3>}
        </div>
      </header>
    </div>
  );
}

export default App;
