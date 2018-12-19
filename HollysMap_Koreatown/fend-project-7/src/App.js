import React, { Component } from 'react';
import './App.css';
import Map from './component/map.js';
import SquareAPI from './API/';
import SideBar from './component/sidebar.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      //sidebarOpen: false,
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
     
    }; //this.toggleSideBar = this.toggleSideBar.bind(this);  
  }

  //handleClose() {
//    this.setState({ showModal: false });
//  }
//  handleShow() {
//    this.setState({ showModal: true });
//  }
//  toggleSideBar(){
//    this.setState(state => ({ sidebarOpen: !state.sidebarOpen}));
//  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({markers: Object.assign(this.state.markers, markers)
    });

  }
  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
        this.setState({venues: Object.assign(this.state.venues, newVenue)});
      
  });
  };  

  handleListItemClick = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  };
      
  
  componentDidMount() {
    SquareAPI.search({
      near: "Koreatown, Los Angeles",
      query: "korean bbq",
      limit: 8
    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({venues, center, markers});
   });   
  }
  render() {
    return (
      <div className="App">
        <SideBar {...this.state} handleListItemClick={this.handleListItemClick} />
        <Map {...this.state}
        handleMarkerClick={this.handleMarkerClick}/>
      </div>
    );
  }
}

export default App;
