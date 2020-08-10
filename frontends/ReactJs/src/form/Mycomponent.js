import React, {Component} from 'react';
import axios from 'axios';

class Mycomponente extends Component {

  constructor() {
    super();
    this.state = {
      show: true,
      title: '',
      url: '',
      id: '',
      tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();
    let arr = { 'title': this.state.title, 'url': this.state.url };
    console.log(arr);
    console.log(this.state);
    axios.post("http://localhost:4000/backendnode/", arr).then(response =>{
                        this.state.tasks.push(response.data);
                        this.setState({id: '', title: '', url: ''});  //Asi muta el estado react
                    }); 
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    axios.get('http://localhost:4000/backendnode/').then(response => {
        this.setState({tasks: response.data.nodejs});
    });
  }

  render() {
	  return(   
        <div className="container">
          <div className="row">

        	  <table className="table table-borderless">
    		      <thead>
    		        <tr>
                  <th>{this.props.title}</th>
                  <th>Url</th>
                  <th>Id</th>
    			      </tr>
    			    </thead>
    		      <tbody>
              { 
                this.state.tasks.map(task => {
                  return (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td><a href={task.url} target='_blank'>{task.url}</a></td>
                      <td>{task.id}</td>
                    </tr>
                    )
                })
              }
              </tbody>
          	</table>

            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Task Title" autoFocus required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="url" onChange={this.handleChange} value={this.state.url} type="url" placeholder="Task url"  required />
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Send 
                    </button>
                  </form>
                </div>
              </div>
            </div>

        </div>
      </div>       
	  )
  }
};

export default Mycomponente;