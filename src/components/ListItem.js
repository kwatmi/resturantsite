import React from 'react'
import StarRatings from './react-star-ratings';
import pic from '../assets/knifeAndFork2.png'
import markerPin from '../assets/markerPin2.png'
import markerPinHover from '../assets/markerPinHoverPRP2.png'
// import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';


const google = window.google
var d = new Date().getDay()-1%6;

var  number=0;

// starts using npm star ratitng 
var halfStar =  <StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={0.5}
name='rating'
/>; 
var oneStar =<StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={1}
name='rating'/>; 

var oneAndStars =<StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={1.5}
name='rating'/>; 
var twoStars =<StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={2}
name='rating'/>; 

var twoAndStars=<StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={2.5}
name='rating'/>; 

var threeStars =<StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={3}
name='rating'/>; 

var threeAndStars =<StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={3.5}
name='rating'/>;


var fourStars =<StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={4}
name='rating'/>;

var fourAndStars =<StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={4.5}
name='rating'/>;

var fiveStars =<StarRatings
rating={this.state.rating}
starRatedColor="blue"
changeRating={this.changeRating}
numberOfStars={5}
name='rating'/>;



var stars = [halfStar,oneStar,oneAndStars,twoStars,twoAndStars,threeStars,threeAndStars,fourStars,fourAndStars,fiveStars]
// var that = this

class ListItem extends React.Component {
  constructor(props){
    super(props)
    this.checkForDeetz = this.checkForDeetz.bind(this)
    this.handleDetails = this.handleDetails.bind(this)
    this.click = this.click.bind(this)
    this.getDeetz = this.getDeetz.bind(this)
    this.addItem = this.addItem.bind(this)
    this.state = {
      isExpanded: false,
      numStars:0,
      details:{},
      fromStored: false,
      newToStorage: true
    }
  }
  addItem = (id, details) => {
    var array = this.props.storedDetails;
    array.forEach(item => {
      item.id==id ? this.setState({newToStorage:false }): this.setState({newToStorage:true})
    })
    var that = this
    setTimeout(function(){
      if (that.state.newToStorage){
    var newItem = {id:id,details:details};
    array.push(newItem);
    console.log('new push')}
    that.props.handleStoredDetails(array)
    },100)
    // console.log(array)
    // console.log(array)
    // console.log('ID: ' + id)
    // console.log(details)
  }

  handleDetails = (deetz) => {
    console.log(deetz)
    this.setState({details:deetz})
  }
  test = (thing, thing2) => {
    console.log('TEST ID: ' + thing);
    console.log(thing2)
  }

  checkForDeetz = (id, map) => {
    this.props.storedDetails.forEach(place => {
      if (place.id===id){
        this.setState({details: place.details, fromStored: true})
        console.log('from stored')
      } else {return}
    })
    var that = this
    setTimeout(function(){
      if(!that.state.fromStored){
        that.getDeetz(id,map)
      }
    },300)
    
    // IF FROM STORED IS NOT TRUE this.getDeetz()
    
  }

  getDeetz = (id,map) => {
    var that = this
    var request = {
      placeId: id,
      fields: ['name','formatted_phone_number', 'review', 'opening_hours', 'website']
    }
    var service = new google.maps.places.PlacesService(map)
    console.log('from API')
    service.getDetails(request, callback);
    function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      that.setState({details:place})
      that.addItem(id, place)
      // console.log(id)
      // console.log(that.state.details)
    } else {
      console.log(status)}
    }
  }
  
  
  click = (map) => {
    const passId = this.props.place.place_id
    const myId = this.props.place.id
    const myIdB = this.props.place.id+'B'
    var thisOne = document.getElementById(myId)
    // thisOne.classList.toggle('itemWrapper')
    thisOne.classList.toggle('itemExpanded')
    thisOne.classList.toggle('itemWrapper')
    this.checkForDeetz(passId,this.props.map)
    console.log('passID: '+ passId)
    if (this.state.isExpanded){
      this.setState({isExpanded:false})
        var expandedData = document.getElementById(myIdB)
        expandedData.classList.add('hidden')
  
    }else {
     this.setState({isExpanded:true})
     setTimeout(function(){
      console.log(myIdB)
      var expandedData = document.getElementById(myIdB)
      expandedData.classList.remove('hidden')
    },200)

    }
  }

  stopBounce = (marker) => {
    marker.setAnimation(null)
  }

  enter = () => {
    for(let i=0; i<this.props.markers.length;i++){
      if(this.props.markers[i].id===this._reactInternalFiber.key){
        var marker = this.props.markers[i];
        // var contentString = `<p style='color: blueviolet'>${marker.name}</p>`
        marker.setIcon(markerPinHover);
        marker.setAnimation(google.maps.Animation.BOUNCE)
        const myId = this.props.place.id
        var thisOne = document.getElementById(myId)
        thisOne.classList.toggle('zoom')
        setTimeout(this.stopBounce.bind(null, marker), 600);
      }
    }
  }

  leave = () => {
    for(let i=0; i<this.props.markers.length;i++){
      if(this.props.markers[i].id===this._reactInternalFiber.key){
        var marker = this.props.markers[i];
        marker.setIcon(markerPin);
        const myId = this.props.place.id
        var thisOne = document.getElementById(myId)
        thisOne.classList.toggle('zoom')
      }
    }
  }

  setStars = (i) => {
    if(i<=0.5){
      number=0
    }else if (i<=1){
      number=1
    }else if (i<=1.5){
      number=2
    }else if (i<=2){
      number=3
    }else if (i<=2.5){
      number=4
    }else if (i<=3){
      number=5
    }else if (i<=3.5){
      number=6
    }else if (i<=4){
      number=7
    }else if (i<=4.5){
      number=8
    }else if (i<=5){
      number=9
    } else {
      number=10
    }
    return number
  }


  componentDidMount(){
    this.setStars(this.props.place.rating)
    var numStars = number
    this.setState({numStars})
    console.log(this.props.place.photos)
    // if(d==6){e=0} else {e=d+1}
    // console.log('e = '+e)
    // console.log('g = '+g)
    console.log('d = '+d)
    // var array = this.props.storedDetails;
    // array.push('hai')
    // console.log(array)
  }

  render() {
    if(!this.state.isExpanded){return (
      <div id={this.props.place.id} onMouseEnter={this.enter} onMouseLeave={this.leave} onClick={this.click} className='itemWrapper'>
              <div className="detailsInnerWrap">
                <img className='itemImage'src={pic} alt="" srcSet=""/>
                <div className="itemDetails">
                  <h5 className='itemName'>{this.props.place.name}</h5>
                  <p className='itemLoc'>{this.props.place.vicinity}</p>
                  {/* <p className='itemOpen'>{place.opening_hours.open_now ? 'open now!' : 'closed'}</p> */}
                  {this.props.place.opening_hours ? <p className='itemOpen'>{this.props.place.opening_hours.open_now?'open now!' : 'closed'}</p> : null}
                </div>
              </div>
            </div>
    )}
    else {return (
      <div id={this.props.place.id} onMouseEnter={this.enter} onMouseLeave={this.leave} onClick={this.click} className='itemWrapper'>
          <div className="detailsInnerWrapCol">
            <div className="itemDetails">
              <h5 className='itemName'>{this.props.place.name}</h5>
              <p className='itemLoc'>{this.props.place.vicinity}</p>
              <p className='itemLoc'>{this.state.details.formatted_phone_number}</p>
              {/* <p className='itemOpen'>{place.opening_hours.open_now ? 'open now!' : 'closed'}</p> */}
              {/* {this.props.place.opening_hours ? <p className='itemOpen'>{this.props.place.opening_hours.open_now?'open now!' : 'closed'}</p> : null} */}
            </div>
            <img className='itemImageSm'src={pic} alt="" srcSet=""/>
          </div >
          <div className='hidden mid' id={this.props.place.id+'B'}>
            <p className='openHoursList'>average user rating:</p>
            <img className='starsIcon' src={stars[this.state.numStars]} alt="" srcSet=""/>
            {this.state.details.reviews ? 
            <div>
            <p className='itemUsername'><a href={this.state.details.reviews[0].author_url}>{this.state.details.reviews[0].author_name}</a> said:</p>
            <p className='reviewText'>"{this.state.details.reviews[0]<=50 ? this.state.details.reviews[0]: this.state.details.reviews[0].text.substring(0,50)+'...'}"</p>
              <a href='#' className="itemSite">more user reviews</a>
            </div>
            : null}
                {this.state.details.opening_hours ? 
                <div className="openingTimes">
                  <strong>Opening Hours</strong>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[d]}</p> 
                  {/* <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[1]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[2]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[3]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[4]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[5]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[6]}</p>  */}
                </div>
                : null}
                <div className="siteDiv">
                  <a target='_blank' href={this.state.details.website}className='itemSite'>visit website</a>
                </div>
          </div>
        </div>
      )}
    }
  }


export default ListItem