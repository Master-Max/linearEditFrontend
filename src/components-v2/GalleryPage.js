import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../assets/css/Gallery.css';

class GalleryPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      projects: null,
    }
  }

  componentDidMount(){
    //console.log(this.props.user)
    //if(true){
      //fetch(`http://localhost:4000/api/v1/users/${this.props.user.id}/projects`)
      fetch(`http://localhost:4000/api/v1/projects`)
      .then(r=>r.json())
      .then(projects=>this.setState({projects}))
    //}
  }

  renderMovies = () => {
    if(this.state.projects){
      const movies = []
      this.state.projects.forEach((p) => {
        if(p.exported_url){
          movies.push(<video src={p.exported_url} width={480} height={320} controls/>)
        }
      })
      return(
        <>
          {movies}
        </>
      )
    }else{
      return(
        <>
          <p>Nothing Here...</p>
          <p>oh no</p>
        </>
      )
    }
  }

  render(){
    return (
      <div className="gallery">
        <h2>Gallery</h2>
        {this.renderMovies()}
      </div>
    )
  }

}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(GalleryPage);
